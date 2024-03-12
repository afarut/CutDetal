from django_filters import FilterSet, filters
from .models import Detail
from .constants import VERBOSE_STATUS_TYPE_FOR_FILTER


class ExcludeDetailFilter(FilterSet):
    order_status = filters.ChoiceFilter(choices=VERBOSE_STATUS_TYPE_FOR_FILTER, method='filter_order_status')

    def filter_order_status(self, queryset, name, value):
    	print(value)
    	if int(value) < 0:
    		return queryset.exclude(order=None)
    	return queryset.exclude(order__status=value)

    class Meta:
        model = Detail
        fields = ['order_status']


class DetailFilter(FilterSet):
    order_status = filters.ChoiceFilter(choices=VERBOSE_STATUS_TYPE_FOR_FILTER, method='filter_order_status')

    def filter_order_status(self, queryset, name, value):
    	print(value)
    	if int(value) < 0:
    		return queryset.filter(order=None)
    	return queryset.filter(order__status=value)

    class Meta:
        model = Detail
        fields = ['order_status']