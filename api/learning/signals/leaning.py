"""Integracion viaje del emprendedor. """
from api.learning.models import ApprovedCourse
from api.users.models import User

def validate_corfo(sender, instance, **kwargs):
    user = User.objects.get(user=instance.student)
    user.approved_courses.add(instance)    

    # Data
    dataValidate = {
        "institucion": "3094",
        "rut": instance.user.identification_number,
        "contenido": instance.course.code_travelcorfo,
        "nombreContenido": instance.course.title,
        "codigoCertificacion": instance.code_travel,
        "correo": instance.user.email,
        "evaluacion": instance.calification
    }

    dataJson = json.dumps(dataValidate)
    

    # GET TOKEN
    urlToken = "https://apitest.corfo.cl:9101/api/oauth/token"
    payloadFormx='scope=resource.READ&client_id=5d652985-93b7-407c-9365-05d7d83e629d&client_secret=a6fa2019-0b05-4145-8d73-20478cd4f52b&grant_type=client_credentials'
    headersGetToken = {
    'Accept-Charset': 'utf-8',
    'Content-Type': 'application/x-www-form-urlencoded',    
    }

    response_token = requests.request("POST", urlToken, headers=headersGetToken, data=payloadFormx, verify=False)

    data = response_token.json()
    token = data['access_token']
    

    urlValidate = "https://apitest.corfo.cl:9101/OAG/API_WS_MOOC/Validate"
    headersValidate = {
        'Authorization': 'Bearer {}'.format(token),
        'Content-Type': 'application/json'
    }

    if(response_token.status_code==200):
        response = requests.request("POST", urlValidate, headers=headersValidate, data=dataJson, verify=False)
        print(response.text)
