from django.test import TestCase
from ..models import Material,Range,Order,Detail


class MaterialModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Material.objects.create(
            name="aluminium", 
            weight=100.0, 
            price_by_square_meter=200.4
        )

    def test_name_max_length_material(self):
        material = Material.objects.get(id=1)
        max_length = material._meta.get_field("name").max_length
        self.assertEquals(max_length, 30)

    def test_weight_material_more_0(self):
        material = Material.objects.get(id=1)
        self.assertGreater(material.weight, 0.0)

    def test_price_material_more_0(self):
        material = Material.objects.get(id=1)
        self.assertGreater(material.price_by_square_meter, 0.0)


class RangeModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        material1 = Material.objects.create(
            name="aluminium", 
            weight=100.0, 
            price_by_square_meter=200.4
        )

        Range.objects.create(
            start=1, 
            stop=5, 
            price=10.5, 
            material=material1
        )

    def test_start_less_stop_range(self):
        range = Range.objects.get(id=1)
        self.assertLess(range.start, range.stop)

    def test_price_range_more_0(self):
        range = Range.objects.get(id=1)
        self.assertGreater(range.price, 0.0)


class OrderModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Order.objects.create(
            username="username_example",
            email="example@gmail.com",
            phone_number="899999999",
            status=0,
            is_individual=True,
        )

    def test_username_max_lenght_order(self):
        order = Order.objects.get(id=1)
        username_max_length = order._meta.get_field("username").max_length
        self.assertEquals(username_max_length, 70)

    def test_phone_number_max_lenght_order(self):
        order = Order.objects.get(id=1)
        phone_number_max_length = order._meta.get_field("phone_number").max_length
        self.assertEquals(phone_number_max_length, 20)


class DetailModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):

        material2 = Material.objects.create(
            name="aluminium",
            weight=100.0,
            price_by_square_meter=200.4
        )    

        order2 = Order.objects.create(
            username="username_example",
            email="example@gmail.com",
            phone_number="899999999",
            status=0,
            is_individual=True,
        )

        Detail.objects.create(
            name = "example",
            material = material2,
            width = 350.5,
            height = 240.3,
            dxf_file = "../../static/1.dxf",
            svg_file = "svg_example",
            length = 0.5,
            order = order2,
            count = 5,
            price = 60
        )

    def test_name_max_lenght_detail(self):
        detail = Detail.objects.get(id=1)
        name_max_length = detail._meta.get_field("name").max_length
        self.assertEquals(name_max_length, 70)

    def test_width_detail_more_0(self):
        detail = Detail.objects.get(id=1)
        self.assertGreater(detail.width, 0.0)

    def test_height_detail_more_0(self):
        detail = Detail.objects.get(id=1)
        self.assertGreater(detail.height, 0.0)

    def test_length_detail_more_0(self):
        detail = Detail.objects.get(id=1)
        self.assertGreater(detail.length, 0.0)

    def test_price_detail_more_0(self):
        detail = Detail.objects.get(id=1)
        self.assertGreater(detail.price, 0.0)

    def test_count_detail_more_0(self):
        detail = Detail.objects.get(id=1)
        self.assertGreater(detail.count, 0.0)

