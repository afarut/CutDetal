import base64
import json
import logging
import requests


from django.conf import settings
from requests import Session
from requests.auth import HTTPBasicAuth
from zeep import Client
from zeep.transports import Transport

def dxf_to_base64(dxf_file_path):
    """
    Функция для конвертации содержимого файла DXF в строку Base64.

    Аргументы:
    dxf_file_path (str): Путь к файлу DXF.

    Возвращает:
    str: Строка, содержащая содержимое файла DXF, закодированное в Base64.
    """

    try:
        # Открываем файл в бинарном режиме
        with open(dxf_file_path, 'rb') as file:
            file_content = file.read()  # Читаем содержимое файла

        # Кодируем содержимое файла в Base64
        encoded_content = base64.b64encode(file_content)

        # Декодируем байты в строку и возвращаем результат
        return encoded_content.decode('utf-8')

    except FileNotFoundError:
        print(f"Файл не найден: {dxf_file_path}")
        return None
    except Exception as e:
        print(f"Произошла ошибка: {e}")
        return None


def calc_dxf(file_content_base64, name_file, sr_min=0.01, sr_corner=0, login=settings.LOGIN, password=settings.PASSWORD):
    # Создаем сессию с аутентификацией
    session = Session()
    session.auth = HTTPBasicAuth(login, password)
    logging.info('Сессия создана')

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

    logging.error('Запрос создан')

    try:
        # print(f"Response: {response}")
        if response.SRResult is None:
            success = True
            error_message = ''
            logging.error('Ошибок в расчёте не выявлено')
        else:
            success = False
            error_message = response.SRResult
            logging.error(f'Ошибка в расчёте: {error_message}')

        logging.error('Вычисляем общую длину реза')
        total_length = sum([entity.SRLength for entity in response.SRTab.SREntity])
        logging.error(f'Общая длина реза {total_length}')
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

base64_string = dxf_to_base64("C:/work_space/api_work/static/Тахацу 1.DXF")

print(calc_dxf(base64_string, "1"))