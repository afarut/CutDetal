from rest_framework import serializers
from .models import Material, Order, Detail, Range, DXFSize
from .utils import create_image


class DXFSizeSerialazer(serializers.ModelSerializer):
    class Meta:
        model = DXFSize
        fields = "__all__"


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

class DetailSaveSerialazer(serializers.ModelSerializer):
    svg_file = serializers.CharField()
    dxf_file = serializers.CharField()
    name = serializers.CharField()
    material_id = serializers.IntegerField()
    width = serializers.FloatField()
    height = serializers.FloatField()
    length = serializers.FloatField()
    count = serializers.IntegerField()
    price = serializers.IntegerField()

    class Meta:
        model = Detail
        fields = (
            "id",
            "svg_file",
            "dxf_file",
            "name",
            "material_id",
            "width",
            "height",
            "length",
            "count",
            "price",
            )


    def create(self, cd):
        image = create_image(cd["dxf_file"].replace("data:application/octet-stream;base64,", ""), "dxf")
        cd["dxf_file"] = image
        return Detail.objects.create(
            name=cd["name"],
            material_id=cd["material_id"],
            width=cd["width"],
            height=cd["height"],
            dxf_file=cd["dxf_file"],
            svg_file=cd["svg_file"],
            length=cd["length"],
            count=cd["count"],
            price=cd["price"]
        )

    def update(self, instance, validated_data):
        image = create_image(validated_data["dxf_file"].replace("data:application/octet-stream;base64,", ""), "dxf")
        validated_data["dxf_file"] = image
        instance.name = validated_data.get("name", instance.name)
        instance.material_id = validated_data.get("material_id", instance.material_id)
        instance.width = validated_data.get("width", instance.width)
        instance.height = validated_data.get("height", instance.height)
        instance.dxf_file = validated_data.get("dxf_file", instance.dxf_file)
        instance.svg_file = validated_data.get("svg_file", instance.svg_file)
        instance.length = validated_data.get("length", instance.length)
        instance.count = validated_data.get("count", instance.count)
        instance.price = validated_data.get("price", instance.price)
        instance.save()
        return instance


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
            #"name": {'write_only': True},
            "length": {'write_only': True},
            "width": {'write_only': True},
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
