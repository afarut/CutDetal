from django.test import TestCase, Client
from django.urls import reverse
from ..models import Detail, Order, Material
import json

class CoreTests(TestCase):

    def setUp(self):
        self.client = Client()

        self.material = Material.objects.create(
            name="steel", 
            weight=500.0, 
            price_by_square_meter=700.0
        )

        self.order = Order.objects.create(
            username="username_example",
            email="example@gmail.com",
            phone_number="899999999",
            status=0,
            is_individual=True,
        )

        self.detail = Detail.objects.create(
            name = "example",
            material = self.material,
            width = 350.5,
            height = 240.3,
            dxf_file = "../../static/1.dxf",
            svg_file = "svg_example",
            length = 0.5,
            order = self.order,
            count = 5,
            price = 60
        )
        # Здесь вы можете создать тестовые данные для использования в тестах
        # Например:
        # self.material = Material.objects.create(name="Test Material")
        # ...

    def test_dxf_view_post_normal(self):
        f = open("./static/base64example.txt", 'r')
        response = self.client.post(reverse('core:dxf_view'), {'base64file': f.read()}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_dxf_view_post_string(self):
        f = "134324rewwrwr"
        response = self.client.post(reverse('core:dxf_view'), {'base64file': f}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_dxf_view_post_integer(self):
        f = 114324
        response = self.client.post(reverse('core:dxf_view'), {'base64file': f}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_detail_list_create_view(self):
        response = self.client.get(reverse('core:detail'))
        self.assertEqual(response.status_code, 200)
        # Создание детали
        # response = self.client.post(reverse('core:detail'), {'field': 'value'}, format='json')
        # self.assertEqual(response.status_code, 201)

    def test_order_list_create_view(self):
        response = self.client.get(reverse('core:order'))
        self.assertEqual(response.status_code, 200)
        # Создание заказа
        # response = self.client.post(reverse('core:order'), {'field': 'value'}, format='json')
        # self.assertEqual(response.status_code, 201)

    def test_material_get_edit_delete_view(self):
        # Предполагается, что у вас есть созданный объект Material с id=1
        response = self.client.get(reverse('core:materials_edit_create_delete', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 200)
        # Редактирование
        # response = self.client.put(reverse('core:materials_edit_create_delete', kwargs={'pk': 1}), {'field': 'new_value'}, content_type='application/json')
        # self.assertEqual(response.status_code, 200)
        # Удаление
        # response = self.client.delete(reverse('core:materials_edit_create_delete', kwargs={'pk': 1}))
        # self.assertEqual(response.status_code, 204)

    def test_material_list_create_view(self):
        response = self.client.get(reverse('core:material'))
        self.assertEqual(response.status_code, 200)
        # Создание материала
        # response = self.client.post(reverse('core:material'), {'field': 'value'}, format='json')
        # self.assertEqual(response.status_code, 201)

    def test_user_get_view(self):
        response = self.client.get(reverse('core:user'))
        self.assertEqual(response.status_code, 200)
        # Дополнительные проверки на основе ответа

# Дополнительные тесты для других представлений

    





