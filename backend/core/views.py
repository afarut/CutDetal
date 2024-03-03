from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import DetailSerializer, OrderCreateSerializer, MaterialSerializer, MaterialEditSerialazer
from .models import Detail, Order, Material
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from django.http import JsonResponse


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