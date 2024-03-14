from django.db import models
from .constants import VERBOSE_STATUS_TYPE


class Material(models.Model):
    name = models.CharField(max_length=30)
    weight = models.FloatField()
    price_by_square_meter = models.FloatField()

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
    is_individual = models.BooleanField(null=True, blank=True)
    date = models.DateField(auto_now=True)


class Detail(models.Model):
    name = models.CharField(max_length=70)
    material = models.ForeignKey(Material, on_delete=models.CASCADE, null=True, blank=True)
    width = models.FloatField()
    height = models.FloatField()
    dxf_file = models.FileField(upload_to="dxf")
    svg_file = models.TextField()
    length = models.FloatField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True, related_name="details")
    count = models.PositiveIntegerField(null=True, blank=True)
    date = models.DateField(auto_now=True)
    price = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class DXFSize(models.Model):
    size = models.PositiveIntegerField(default=1000)

    def save(self, *args, **kwargs):
        self.__class__.objects.exclude(id=self.id).delete()
        super(DXFSize, self).save(*args, **kwargs)

    def get(self):
        if not self.__class__.objects.exists():
        	instance = self.__class__.objects.create(size=1000)
        	instance.save()
        else:
        	instance = self.__class__.objects.first()
        return instance