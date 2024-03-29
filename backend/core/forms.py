from django import forms
from django.contrib.postgres.forms import SimpleArrayField


class UploadFileForm(forms.Form):
    base64file = forms.CharField()
    namefile = forms.TextInput() 

class DxfConfirmForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput()) 
    email = forms.EmailField()
    phone_number = forms.CharField(widget=forms.TextInput())
    is_individual = forms.NullBooleanField()
    details = SimpleArrayField(forms.JSONField(max_length=100))
    comment = forms.CharField(widget=forms.TextInput(), required=False)