from django.urls import path
from core import views

app_name = "core"

urlpatterns = [
    path('dxf/', views.dxf_view, name='dxf_view')
]