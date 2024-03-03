from django.contrib import admin
from .models import Material, Range, Detail, Order

# Register your models here.
admin.site.register(Material)
admin.site.register(Range)
admin.site.register(Detail)
admin.site.register(Order)