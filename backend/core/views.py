from django import forms
import json
from django.shortcuts import render
from django.http import JsonResponse
from .import utils 
from .import forms
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def dxf_view(request):

    if request.method == "POST":
        form = forms.UploadFileForm(json.loads(request.body.decode()), request.FILES)
        result = utils.calc_dxf(form.data["base64file"], "name img from frontend")
        if result['success']:
            return JsonResponse({
                "status": "success",
                "total_length": result["total_length"],
                "image": result["image"].decode(), 
                "size_x": result["size_x"],
                "size_y": result["size_y"],
                "version": result["version"],
                "image_name": result["image_name"]
            })
        else:
            return JsonResponse({
                "status": "error",
                "error_message": result["error_message"]
            })
    
