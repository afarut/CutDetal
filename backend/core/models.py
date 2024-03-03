from django.db import models


class Material(models.Model):
	name = models.CharField(max_length=30)
	weight = models.FloatField()

	def __str__(self):
		return self.name


class Range(models.Model):
	start = models.FloatField()
	stop = models.FloatField()
	price = models.FloatField()
	material = models.ForeignKey(Material, on_delete=models.CASCADE)

	def __str__(self):
		return f"{self.start} - {self.stop} by {self.price}"


#class Detail(models.Model):
#	material = models.ForeignKey(Material, on_delete=models.CASCADE)
#	width = models.FloatField()
#	height = models.FloatField()
#	dxf_file = models.FileField(upload_to="dxf")
#	swg_file = models.FileField(upload_to="swg")
#	srtab = models.FloatField()
#	srlength = models.FloatField()
#
#	def get_price(self):
#		pass
