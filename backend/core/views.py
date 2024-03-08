from django import forms
import json
from django.shortcuts import render
from django.http import JsonResponse
from .import utils 
from .import forms
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import DetailSerializer, OrderCreateSerializer, MaterialSerializer, MaterialEditSerialazer, DetailWithOrderStatus, RangeSerialazer, DetailSaveSerialazer
from .models import Detail, Order, Material, Range
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import authentication_classes, permission_classes
from .permissions import CreateOnly, EditOnly


@authentication_classes([])
@permission_classes([])
@csrf_exempt
def dxf_view(request):

    if request.method == "POST":
        form = forms.UploadFileForm(json.loads(request.body.decode()), request.FILES)
        result = utils.calc_dxf(form.data["base64file"], form.data["namefile"])
        if result['success']:
            return JsonResponse({
                "status": "success",
                "total_length": result["total_length"],
                "image": result["image"].decode(), 
                "size_x": result["size_x"],
                "size_y": result["size_y"],
                "version": result["version"],
                "image_name": result["image_name"]
            })
        else:
            return JsonResponse({
                "status": "error",
                "error_message": result["error_message"]
            })
    
class DetailApiView(CreateAPIView, ListAPIView):
    serializer_class = DetailWithOrderStatus
    queryset = Detail.objects.all()
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ["order__status"]


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


class MaterialApiview(CreateAPIView, ListAPIView):
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class RangesApiview(CreateAPIView, ListAPIView):
    serializer_class = RangeSerialazer
    queryset = Range.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class RangeGetEditDeleteApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = RangeSerialazer
    queryset = Range.objects.all()



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
