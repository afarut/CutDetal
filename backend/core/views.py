from types import NoneType
from django import forms
import json
from django.core import serializers
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .import utils 
from .import forms
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

from .serializers import DetailSerializer, MaterialGroupSerializer, OrderCreateSerializer, MaterialSerializer, MaterialEditSerialazer, DetailWithOrderStatus, RangeSerialazer, DetailSaveSerialazer, DXFSizeSerialazer
from .models import Detail, MaterialGroup, Order, Material, Range, DXFSize

from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, RetrieveAPIView
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import authentication_classes, permission_classes
from .permissions import CreateOnly, EditOnly, IsAuthAndSuperAdminOnly, ReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from .filters import ExcludeDetailFilter, DetailFilter
import asyncio
from django.db.utils import IntegrityError
from asgiref.sync import sync_to_async
from django.utils.decorators import method_decorator

@authentication_classes([])
@permission_classes([])
@csrf_exempt
def dxf_view(request):
    if request.method == "POST":
        form = forms.UploadFileForm(json.loads(request.body.decode()), request.FILES)
        result = utils.calc_dxf(form.data["base64file"], form.data["namefile"])
        if result['success']:
            new_detail = Detail.objects.create(
                name = result["image_name"],
                material = None,
                width = result["size_x"],
                height =  result["size_y"],
                dxf_file = utils.create_image(form.data["base64file"].replace("data:application/octet-stream;base64,", ""), "dxf"),
                svg_file = result["image"].decode(), 
                length = result["total_length"],
                count = None,
                price = None,
                incut = result["incut"],
                )
            return JsonResponse({
                "id": new_detail.id,
                "status": "success",
                "total_length": result["total_length"],
                "image": result["image"].decode(), 
                "size_x": result["size_x"],
                "size_y": result["size_y"],
                "version": result["version"],
                "image_name": result["image_name"],
                "incut": result["incut"],
            })
        else:
            return JsonResponse({
                "status": "error",
                "error_message": result["error_message"]
            })
    return JsonResponse({
        "status": "error",
        "error_message": "Метод не разрешен"
    })

@authentication_classes([])
@permission_classes([])
@csrf_exempt
def dxf_get(request):
    if request.method == "GET":
        ids = request.GET.getlist('ids[]')
        
        if not ids:
            return JsonResponse({
                "status": "error",
                "error_message": "нет id"
            })

        details = Detail.objects.filter(pk__in=ids)

        response_data = []
        for detail in details:
            response_data.append({
                "id": detail.id,
                "status": "success",
                "total_length": detail.length,
                "image": detail.svg_file, 
                "size_x": detail.width,
                "size_y": detail.height,
                "image_name": detail.name,
                "incut": detail.incut,
            })

        return JsonResponse(response_data, safe=False)

    return JsonResponse({
        "status": "error",
        "error_message": "Метод не разрешен"
    })

@authentication_classes([])
@permission_classes([])
@csrf_exempt
def dxf_confirm(request):
    if request.method == "POST":
        data = json.loads(request.body.decode())
        
        # Create a form instance and populate it with data from the request
        form = forms.DxfConfirmForm(data)

        # Check if the form is valid
        if form.is_valid():
            # Extract cleaned data from the form
            username = form.cleaned_data["username"]
            email = form.cleaned_data["email"]
            phone_number = form.cleaned_data["phone_number"]
            is_individual = form.cleaned_data["is_individual"]
            details = form.cleaned_data["details"]
            comment = form.cleaned_data["comment"]

            # Create a new order
            order = Order.objects.create(
                username=username,
                email=email,
                phone_number=phone_number,
                is_individual=is_individual,
                comment=comment
            )
            
            print(order)

            # массивы для XML
            order_header = {
                "Name": username,
                "Phone": phone_number,
                "Email": email,
                "ClientType": is_individual,
                "Comment": comment
            }
            calculation_table = []

            # Process details
            for detail in details:
                # Assuming each detail is a dictionary with required keys
                detail_id = detail.get("detail_id")
                material_id = detail.get("material_id")
                price = detail.get("price")
                quantity = detail.get("count")
                material_daval = detail.get("daval")
                try:
                    material_obj = Material.objects.get(id=material_id)
                    # Retrieve the detail object from the database
                    detail_obj = Detail.objects.get(id=detail_id)

                    # Update detail object with material, price, and quantity
                    detail_obj.material = material_obj
                    detail_obj.price = price
                    detail_obj.count = quantity
                    detail_obj.save()
                    calculation_table.append({"FileName": detail_obj.name,
                                              "DXFLink": detail_obj.dxf_file, 
                                              "MaterialName": material_obj.name, 
                                              "Price": price, 
                                              "Quantity": quantity,
                                              "MaterialDaval": material_daval})

                    # Associate detail with the order
                    order.details.add(detail_obj)

                except Detail.DoesNotExist:
                    # Handle if detail with provided ID doesn't exist
                    pass
                

            xml_file = utils.create_order_xml_string(order_header, calculation_table)
            xml_base64file = utils.xml_to_base64(xml_file) 
            res = utils.XML_to_1C(xml_base64file)

            return JsonResponse({"status": res, "order_id": order.id})

        else:
            # Return validation errors if the form is not valid
            return JsonResponse({"status": "error", "errors": form.errors})

    # Return error response if the request method is not POST
    return JsonResponse({"status": "error", "error_message": "Метод не разрешен"})

@authentication_classes([])
@permission_classes([])
@csrf_exempt
async def ping(request):
    if request.method == "GET":
        try:
            result = await asyncio.wait_for(utils.ping_web_service(), timeout=12)
            return JsonResponse(result)
        except asyncio.TimeoutError:
            return JsonResponse({"status": False})
        

@authentication_classes([])
@permission_classes([])
@csrf_exempt
async def get_materials_view(request):
    if request.method == "GET":
        try:
            result = await asyncio.wait_for(utils.get_materials(), timeout=12)
            return JsonResponse(result)
        except asyncio.TimeoutError:
            return JsonResponse({"status": False})
        
@authentication_classes([])
@permission_classes([])
@csrf_exempt
async def update_materials(request):
    try:
        try:
            await asyncio.wait_for(utils.ping_web_service(), timeout=12)
        except asyncio.TimeoutError:
            return JsonResponse({"status": False, "error": "Ping timeout"})

        await sync_to_async(Material.objects.all().delete)()
        await sync_to_async(MaterialGroup.objects.all().delete)()

        data = await asyncio.wait_for(utils.get_materials(), timeout=12)

        await sync_to_async(create_materials_from_data)(data)

        return JsonResponse({"status": True})

    except asyncio.TimeoutError:
        return JsonResponse({"status": False, "error": "Fetch timeout"})
    except IntegrityError as e:
        return JsonResponse({"status": False, "error": str(e)})
    except Exception as e:
        return JsonResponse({"status": False, "error": str(e)})

# @method_decorator(csrf_exempt, name='dispatch')
# class UpdateMaterialsView(View):
#     serializer_class = DetailSaveSerialazer
#     queryset = Detail.objects.all()
#     permission_classes = [IsAuthAndSuperAdminOnly|ReadOnly]

#     async def post(self, request):
#         # if not request.user.is_authenticated or not request.user.is_superuser:
#         #     return JsonResponse({"status": False, "error": "Permission denied"}, status=403)

#         try:
#             try:
#                 await asyncio.wait_for(utils.ping_web_service(), timeout=12)
#             except asyncio.TimeoutError:
#                 return JsonResponse({"status": False, "error": "Ping timeout"})

#             await sync_to_async(Material.objects.all().delete)()
#             await sync_to_async(MaterialGroup.objects.all().delete)()

#             data = await asyncio.wait_for(utils.get_materials(), timeout=12)

#             await sync_to_async(create_materials_from_data)(data)

#             return JsonResponse({"status": True})

#         except asyncio.TimeoutError:
#             return JsonResponse({"status": False, "error": "Fetch timeout"})
#         except IntegrityError as e:
#             return JsonResponse({"status": False, "error": str(e)})
#         except Exception as e:
#             return JsonResponse({"status": False, "error": str(e)})

def create_materials_from_data(data):
    with transaction.atomic():
        for group_data in data.get("Group", []):
            group_name = group_data.get("Name")
            cut_type = group_data.get("CutType")
            group = MaterialGroup.objects.create(name=group_name, cut_type=cut_type)

            materials_data = group_data.get("Material", [])
            if isinstance(materials_data, dict):
                materials_data = [materials_data]

            for material_data in materials_data:
                material = Material.objects.create(
                    name=material_data.get("Name"),
                    thickness=material_data.get("Thickness"),
                    weight=material_data.get("Weight"),
                    price=material_data.get("Price"),
                    price_d=material_data.get("PriceD"),
                    price_v=material_data.get("PriceV"),
                )

                ranges_data = material_data.get("Range", [])
                for range_data in ranges_data:
                    range_instance = Range.objects.create(
                        start=range_data.get("Start"),
                        finish=range_data.get("Finish"),
                        price=range_data.get("Price"),
                        material=material
                    )
                    material.ranges.add(range_instance)

                group.materials.add(material)

class DetailExcludeApiView(ListAPIView):
    serializer_class = DetailWithOrderStatus
    queryset = Detail.objects.all()
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = ExcludeDetailFilter

class MaterialGroupApiView(ListAPIView):
    serializer_class = MaterialGroupSerializer
    queryset = MaterialGroup.objects.all()
    permission_classes = []
    pagination_class = None


class DetailApiView(ListAPIView):
    serializer_class = DetailWithOrderStatus
    queryset = Detail.objects.all()
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = DetailFilter


class DetailSave(CreateAPIView):
    serializer_class = DetailSaveSerialazer
    queryset = Detail.objects.all()
    permission_classes = []


class DetailUpdateAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = DetailSaveSerialazer
    queryset = Detail.objects.all()
    permission_classes = []
    

class OrderApiView(CreateAPIView, ListAPIView):
    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all()
    permission_classes = [CreateOnly|IsAuthenticated]



class MaterialGetEditDeleteApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = MaterialEditSerialazer
    queryset = Material.objects.all()
    permission_classes = [IsAuthAndSuperAdminOnly|ReadOnly]


class MaterialApiview(CreateAPIView, ListAPIView):
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()
    permission_classes = [IsAuthAndSuperAdminOnly|ReadOnly]
    pagination_class = None


class MaterialApiviewWithPaggination(ListAPIView): # To fix
    serializer_class = MaterialSerializer
    queryset = Material.objects.all().order_by('id')
    permission_classes = [IsAuthenticatedOrReadOnly]


class RangesApiview(CreateAPIView, ListAPIView):
    serializer_class = RangeSerialazer
    queryset = Range.objects.all()
    permission_classes = [IsAuthAndSuperAdminOnly|ReadOnly]


class RangeGetEditDeleteApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = RangeSerialazer
    queryset = Range.objects.all()
    permission_classes = [IsAuthAndSuperAdminOnly|ReadOnly]


class DeleteDetailFromOrder(APIView):
    serializer_class = DetailSerializer
    def delete(self, request, pk):
        result = True
        error = ""
        try:
            detail = Detail.objects.get(pk=pk)
        except Detail.DoesNotExist:
            error = "DoesNotExist"
            result = False
        detail.order = None
        detail.save()
        return JsonResponse({"result": result, "error": error})


class UserGet(APIView):
    def get(self, request):
        return JsonResponse({"isAdmin": request.user.is_staff, "isSuperAdmin": request.user.is_superuser})


class DXFSizeGetApiView(APIView):
    permission_classes = []
    def get(self, request):
        return JsonResponse({"size": DXFSize().get().size})


class DXFSizeUpdateApiView(APIView):
    permission_classes = [IsAuthAndSuperAdminOnly]
    def get(self, request, size):
        inst = DXFSize().get()
        inst.size = size
        inst.save()
        return JsonResponse({"size": DXFSize().get().size})
