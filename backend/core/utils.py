from django.conf import settings
from requests import Session
from requests.auth import HTTPBasicAuth
from zeep import Client
from zeep.transports import Transport
import io
from django.core.files.images import ImageFile
import base64


def calc_dxf(file_content_base64, name_file, sr_min=0.01, sr_corner=0, login=settings.LOGIN, password=settings.PASSWORD):
    # Создаем сессию с аутентификацией
    session = Session()
    session.auth = HTTPBasicAuth(login, password)

    # WSDL URL от 1C сервера
    wsdl = 'http://sr.sk18.ru:8088/CalcServer/ws/SRInterface.1cws?wsdl'

    # Создаем клиента SOAP с использованием WSDL и сессии с аутентификацией
    client = Client(wsdl=wsdl, transport=Transport(session=session))

    response = client.service.CalcDXF(
        FileDXF=file_content_base64,
        NameFile=name_file,
        SRMin=sr_min,
        SRCorner=sr_corner,
        Login=login,
        Password=password
    )


    try:
        # print(f"Response: {response}")
        if response.SRResult is None:
            success = True
            error_message = ''
        else:
            success = False
            error_message = response.SRResult

        total_length = sum([entity.SRLength for entity in response.SRTab.SREntity])
        # Подготавливаем данные для JSON-ответа
        result = {
            "success": success,
            "error_message": error_message,
            "total_length": total_length,
            "image": response.SRImage if success else None,
            "size_x": response.SRSizeX,
            "size_y": response.SRSizeY,
            "version": response.SRVersion,
            "image_name": name_file
        }

        return result
    except Exception as e:
        return {
            "success": False,
            "error_message": str(e),
            "total_length": 0,
            "image": None,
            "size_x": 0,
            "size_y": 0,
            "version": ''
        }


def create_image(image_bytes, ext):
    #print(type(base64.b64decode(image_bytes).decode('latin-1')))
    image = ImageFile(io.BytesIO(base64.b64decode(image_bytes).decode('latin-1').encode()), name=f'foo.{ext}')
    return image