from django.test import TestCase
from .models import Material

class EventsTestCase(TestCase):
    def test_nazvanie(self):
    	name = "test_namawddddst_namawddddst_namawddddst_naawddddddddddddddddddddddddddddddddddddmawdddddddddddddddde"
    	mat = Material.objects.create(name=name, weight=1, price_by_square_meter=2)
    	print(mat.name, "*")
    	self.assertEqual(mat.name, name)