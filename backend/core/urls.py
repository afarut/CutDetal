from django.urls import path
from core import views

app_name = "core"

urlpatterns = [
    path('dxf/', views.dxf_view, name='dxf_view'),
    path("detail/<int:pk>/", views.DetailUpdateAPIView.as_view(), name="update_detail"),
    path("detail/save/", views.DetailSave.as_view(), name="detail_save"),
    path("detail/", views.DetailApiView.as_view(), name="detail"),
    path("order/", views.OrderApiView.as_view(), name="order"),
    path("material/<int:pk>/", views.MaterialGetEditDeleteApiView.as_view(), name="materials_edit_create_delete"),
    path("material/", views.MaterialApiview.as_view(), name="material"),
    path("material/with_paggination/", views.MaterialApiviewWithPaggination.as_view(), name="material_with_paggination"),
    path("user/", views.UserGet.as_view(), name="user"),
    path("range/", views.RangesApiview.as_view(), name="ranges"),
    path("range/<int:pk>/", views.RangeGetEditDeleteApiView.as_view(), name="ranges_edit_get_delete"),
    path("get/size/", views.DXFSizeGetApiView.as_view(), name="size_global"),
    path("set/size/<int:size>/", views.DXFSizeUpdateApiView.as_view(), name="size_global"),
] 
