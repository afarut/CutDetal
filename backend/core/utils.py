from django.conf import settings
from requests import Session
from requests.auth import HTTPBasicAuth
from zeep import Client
from zeep.transports import Transport
import io
from django.core.files.images import ImageFile
import base64
import xml.etree.ElementTree as ET
from xml.dom import minidom
import aiohttp
from django.core.exceptions import ObjectDoesNotExist

def calc_dxf(
    file_content_base64,
    name_file,
    sr_min=0.01,
    sr_corner=0,
    login=settings.LOGIN,
    password=settings.PASSWORD,
):
    # Создаем сессию с аутентификацией
    session = Session()
    session.auth = HTTPBasicAuth(login, password)

    # WSDL URL от 1C сервера
    wsdl = "http://sr.sk18.ru:8088/CalcServer/ws/SRInterface.1cws?wsdl"

    # Создаем клиента SOAP с использованием WSDL и сессии с аутентификацией
    client = Client(wsdl=wsdl, transport=Transport(session=session))

    response = client.service.CalcDXF(
        FileDXF=file_content_base64,
        NameFile=name_file,
        SRMin=sr_min,
        SRCorner=sr_corner,
        Login=login,
        Password=password,
        Text=0,
    )

    try:

        if response.SRResult is None:
            success = True
            error_message = ""
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
            "image_name": name_file,
            "incut": len(response.SRTab.SREntity),
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
            "version": "",
        }


async def ping_web_service(login=settings.LOGIN, password=settings.PASSWORD):
    session = Session()
    session.auth = HTTPBasicAuth(login, password)

    # WSDL URL от 1C сервера
    wsdl = "http://sr.sk18.ru:8088/CalcServer/ws/SRInterface.1cws?wsdl"

    timeout = aiohttp.ClientTimeout(total=12)

    async with aiohttp.ClientSession(timeout=timeout) as session:
        async with session.get(
            wsdl, auth=aiohttp.BasicAuth(login, password)
        ) as response:
            if response.status == 200:
                return {"status": True}
            else:
                return {"status": False}


async def get_materials(login=settings.LOGIN, password=settings.PASSWORD):
    session = Session()
    session.auth = HTTPBasicAuth(login, password)

    # WSDL URL от 1C сервера
    wsdl = "http://sr.sk18.ru:8088/CalcServer/ws/SRInterface.1cws?wsdl"

    client = Client(wsdl=wsdl, transport=Transport(session=session))

    response = client.service.GetPrice(Login=login, Password=password)
    def xml_to_dict(element):
        node = {}
        # Add attributes
        node.update(element.attrib)
        # Add child elements
        for child in element:
            child_name = child.tag
            child_node = xml_to_dict(child)
            if child_name not in node:
                node[child_name] = child_node
            else:
                if not isinstance(node[child_name], list):
                    node[child_name] = [node[child_name]]
                node[child_name].append(child_node)
        return node

    # Parse the XML response
    root = ET.fromstring(response)
    
    # Convert the root XML element to a dictionary
    data_dict = xml_to_dict(root)
    
    return data_dict

def create_order_xml_string(order_header, calculation_table):
    # Root element
    root = ET.Element("OrderData")

    # Order Header
    order_header_el = ET.SubElement(root, "OrderHeader")
    for key, value in order_header.items():
        ET.SubElement(order_header_el, key).text = str(value)

    # Calculation Table
    calculation_table_el = ET.SubElement(root, "CalculationTable")
    for row in calculation_table:
        item_el = ET.SubElement(calculation_table_el, "Item")
        for key, value in row.items():
            ET.SubElement(item_el, key).text = str(value)

    # Convert the created XML tree to a string
    rough_string = ET.tostring(root, "utf-8")
    reparsed = minidom.parseString(rough_string)
    xml_string = reparsed.toprettyxml(indent="  ")
    print(xml_string)
    return xml_string


def XML_to_1C(xml_base64file, login=settings.LOGIN, password=settings.PASSWORD):
    # Создаем сессию с аутентификацией
    session = Session()
    session.auth = HTTPBasicAuth(login, password)

    # WSDL URL от 1C сервера
    wsdl = "http://sr.sk18.ru:8088/CalcServer/ws/SRInterface.1cws?wsdl"

    # Создаем клиента SOAP с использованием WSDL и сессии с аутентификацией
    client = Client(wsdl=wsdl, transport=Transport(session=session))

    response = client.service.CreateOrder(
        Order=xml_base64file, Login=login, Password=password
    )

    return response


def xml_to_base64(xml_file):
    bytes_data = xml_file.encode("utf-8")
    # Encode the binary data to Base64
    base64_encoded_data = base64.b64encode(bytes_data)

    # Convert the Base64 encoded bytes to a string
    xml_base64file = base64_encoded_data.decode("utf-8")

    return xml_base64file


def create_image(image_bytes, ext):
    # print(type(base64.b64decode(image_bytes).decode('latin-1')))
    image = ImageFile(
        io.BytesIO(base64.b64decode(image_bytes).decode("latin-1").encode()),
        name=f"foo.{ext}",
    )
    return image
