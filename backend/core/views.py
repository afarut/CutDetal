from django.shortcuts import render
from django.http import JsonResponse
from .import utils 





def dxf_view(request):
    
    imgfromfrontend = ""

    base64_coded_img = utils.dxf_to_base64(imgfromfrontend)


    result = utils.calc_dxf(base64_coded_img, "name img from frontend")

    print(request)

    if result['success']:
        return JsonResponse({
            "status": "success",
            "total_length": result["total_length"],
            "image": result["image"], 
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
    
