from django.db import models

from .constants import VERBOSE_STATUS_TYPE


class MaterialGroup(models.Model):
    name = models.CharField(max_length=255)
    cut_type = models.CharField(max_length=255)

    def __str__(self):
        return self.name

def get_default_group_id():
    # Ensure the default group exists and return its ID
    group, created = MaterialGroup.objects.get_or_create(
        name='Default Group', cut_type='Default Cut Type'
    )
    return group.id

class Material(models.Model):
    group = models.ForeignKey(MaterialGroup, related_name='materials', on_delete=models.CASCADE, default=get_default_group_id)
    name = models.CharField(max_length=255)
    thickness = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price_d = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price_v = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name

class Thickness(models.Model):
    value = models.FloatField()


class Range(models.Model):
    start = models.FloatField()
    finish = models.FloatField()
    price = models.FloatField()
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name="ranges")
    thick = models.ForeignKey(Thickness, on_delete=models.CASCADE, related_name="ranges", null=True)

    def __str__(self):
        return f"{self.start} - {self.stop} by {self.price}"


class Order(models.Model):
    username = models.CharField(max_length=70)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    status = models.PositiveSmallIntegerField(choices=VERBOSE_STATUS_TYPE, default=0)
    is_individual = models.BooleanField(null=True, blank=True)
    date = models.DateTimeField(auto_now=True)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.username}:{self.date}"


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
    date = models.DateTimeField(auto_now=True)
    price = models.IntegerField(null=True, blank=True)
    incut = models.PositiveIntegerField(default=0)

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
