from django import forms
import json
from django.shortcuts import render
from django.http import JsonResponse
from .import utils 
from .import forms
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import DetailSerializer, OrderCreateSerializer, MaterialSerializer, MaterialEditSerialazer
from .models import Detail, Order, Material
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticatedOrReadOnly


@csrf_exempt
def dxf_view(request):

    if request.method == "POST":
        form = forms.UploadFileForm(json.loads(request.body.decode()), request.FILES)
        result = utils.calc_dxf(form.data["base64file"], "name img from frontend")
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
	serializer_class = DetailSerializer
	queryset = Detail.objects.all()


class OrderApiView(CreateAPIView, ListAPIView):
	serializer_class = OrderCreateSerializer
	queryset = Order.objects.all()


class MaterialGetEditDeleteApiView(RetrieveUpdateDestroyAPIView):
	serializer_class = MaterialEditSerialazer
	queryset = Material.objects.all()


class MaterialApiview(CreateAPIView, ListAPIView):
	serializer_class = MaterialSerializer
	queryset = Material.objects.all()
	permission_classes = [IsAuthenticatedOrReadOnly]



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
