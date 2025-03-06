from django.shortcuts import render
from .models import Task
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer
import logging

logger = logging.getLogger(__name__)
# Recibe una solicitud POST con los datos del usuario
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Recibe una solicitud POST con username y password, valida los datos usando LoginSerializer y luego autentica al usuario
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return Response({'id': user.id, 'username': user.username, 'email': user.email})
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Devuelve todas las tareas en formato JSON
def tasks(request):
    logger.info("Se llamó a tasks para mostrar todas las tareas con request %s", request)
    tasks = Task.objects.all().values()  # Trae todas las tareas en formato diccionario
    print(f'listas de tareas: {list(tasks)}')
    return JsonResponse({"tasks": list(tasks)})

# Convierte un objeto Task en un diccionario
def model_to_dict(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "date": task.date,
        "completed": task.completed
    }

# Recibe una solicitud POST con los datos de una tarea, crea la tarea y la devuelve en formato JSON
@csrf_exempt
def add_task(request):
    logger.info("Se llamó a add_task para agregar una nueva tarea con request %s", request)
    data = json.loads(request.body)
    task = Task.objects.create(
        title=data["title"],
        description=data.get("description", ""),
        date=data["date"],
        completed=data.get("completed", False)
    )

    task_dicc = model_to_dict(task)
    print(f'agregando tarea: {task_dicc}')

    return JsonResponse({"task": task_dicc})

# Recibe una solicitud POST con el id de una tarea, la elimina y devuelve un código de estado 204
@csrf_exempt
def delete_task(request):
    logger.info("Se llamó a delete_task para eliminar tareas con request %s", request)
    data = json.loads(request.body)
    task = Task.objects.get(id=data["id"])
    print(f'eliminando tarea: {model_to_dict(task)}')
    task.delete()
    return HttpResponse(status=204)

# Recibe una solicitud POST con los datos de una tarea, actualiza la tarea y la devuelve en formato JSON
@csrf_exempt
def update_task(request):
    logger.info("Se llamó a update_task para actualizar una tarea con request %s", request)
    data = json.loads(request.body)
    task = Task.objects.get(id=data["id"])
    task.title = data["title"]
    task.description = data.get("description", "")
    task.date = data["date"]
    task.completed = data.get("completed", False)
    task_dicc = model_to_dict(task)
    print(f'actualizando tarea: {task_dicc}')
    task.save()
    return JsonResponse({"task": task_dicc})