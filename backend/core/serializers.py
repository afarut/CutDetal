from rest_framework import serializers
from .models import Material, Order, Detail, Range


class RangeSerialazer(serializers.ModelSerializer):
	class Meta:
		model = Range
		fields = (
			"id",
			"start",
			"stop",
			"price",
			"material"
			)


class MaterialSerializer(serializers.ModelSerializer):
	class Meta:
		model = Material
		read_only_fields = ("ranges",)
		fields = (
			"id",
			"name",
			"weight",
			"ranges",
			"price_by_square_meter",
			)
		depth = 1
		


class OrderCreateSerializer(serializers.ModelSerializer):
	#detail_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Detail.objects.all())

	class Meta:
		model = Order
		fields = (
			"id",
			"status",
			"is_individual",
			"phone_number",
			"email",
			"username",
			"details",
			"date",
			)
		#depth=1


class OrderCroppedSerialazer(serializers.ModelSerializer):
	class Meta:
		model = Order
		fields = (
			"id",
			"phone_number",
			"username",
			"is_individual",
			"email",
			"date",
			)


class DetailWithOrderStatus(serializers.ModelSerializer):
	order_status = serializers.ReadOnlyField(source='order.status', allow_null=True, default=0)
	order = OrderCroppedSerialazer(read_only=True)
	material_data = MaterialSerializer(read_only=True, source="material")

	class Meta:
		model = Detail
		fields = (
			"material",
			"length",
			"svg_file",
			"dxf_file",
			"height",
			"width",
			"name",
			"id",
			"order",
			"count",
			"order_status",
			"date",
			"price",
			"material_data",
			)
		extra_kwargs = {
			"length": {'write_only': True},
			"width": {'write_only': True},
			"name": {'write_only': True},
			"width": {'write_only': True},
			"height": {'write_only': True},
			"material": {"write_only": True},
			"date": {'read_only': True},
			"material_data": {'read_only': True},
		}
		#depth = 1


class DetailSerializer(serializers.ModelSerializer):
	material = MaterialSerializer()
	class Meta:
		model = Detail
		fields = (
			"material",
			"length",
			"svg_file",
			"dxf_file",
			"height",
			"width",
			"name",
			"id"
			)
		depth = 1


class MaterialEditSerialazer(serializers.ModelSerializer):
	class Meta:
		model = Material
		fields = "__all__"