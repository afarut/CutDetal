from django.db import models
from .constants import VERBOSE_STATUS_TYPE


class Material(models.Model):
	name = models.CharField(max_length=30)
	weight = models.FloatField()

	def __str__(self):
		return self.name


class Range(models.Model):
	start = models.FloatField()
	stop = models.FloatField()
	price = models.FloatField()
	material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name="ranges")

	def __str__(self):
		return f"{self.start} - {self.stop} by {self.price}"


class Order(models.Model):
	username = models.CharField(max_length=70)
	email = models.EmailField()
	phone_number = models.CharField(max_length=20)
	status = models.PositiveSmallIntegerField(choices=VERBOSE_STATUS_TYPE, default=0)
	is_individual = models.BooleanField(default=True)


class Detail(models.Model):
	name = models.CharField(max_length=70)
	material = models.ForeignKey(Material, on_delete=models.CASCADE)
	width = models.FloatField()
	height = models.FloatField()
	dxf_file = models.FileField(upload_to="dxf")
	svg_file = models.FileField(upload_to="svg")
	length = models.FloatField()
	order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True, related_name="details")

	def get_price(self):
		pass