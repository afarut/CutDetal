from django.contrib import admin

from .models import Material, MaterialGroup, Range, Detail, Order, DXFSize


# Register your models here.
admin.site.register(Material)
admin.site.register(Range)
admin.site.register(Detail)
admin.site.register(Order)
admin.site.register(DXFSize)
admin.site.register(MaterialGroup)

