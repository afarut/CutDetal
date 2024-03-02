from django.db import models


class Range(models.Model):
	start = models.FloatField()
	stop = models.FloatField()
	price = models.FloatField()

	def __str__(self):
		return f"{self.start} - {self.stop} by {self.price}"


class Material(models.Model):
	name = models.CharField(max_length=30)
	weight = models.FloatField()

	def __str__(self):
		return self.name


class MaterialRange(Range):
	material = models.ForeignKey(Material, on_delete=models.CASCADE)

