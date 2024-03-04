from django import forms


class UploadFileForm(forms.Form):
    base64file = forms.CharField() 