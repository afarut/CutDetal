from rest_framework import serializers
from .models import Material, Range, Order, Detail


class RangeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Range
		fields = "__all__"


class MaterialSerializer(serializers.ModelSerializer):
	class Meta:
		model = Material
		read_only_fields = ("ranges",)
		fields = (
			"id",
			"name",
			"weight",
			"ranges"
			)

		depth=1




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
			)
		depth=1


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