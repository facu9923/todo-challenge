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
from django.contrib.auth.models import User
# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    
def tasks(request):
    tasks = Task.objects.all().values()  # Trae todas las tareas en formato diccionario
    return JsonResponse({"tasks": list(tasks)})

def model_to_dict(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "date": task.date,
        "completed": task.completed
    }

@csrf_exempt
def add_task(request):
    data = json.loads(request.body)
    task = Task.objects.create(
        title=data["title"],
        description=data.get("description", ""),
        date=data["date"],
        completed=data.get("completed", False)
    )
    return JsonResponse({"task": model_to_dict(task)})

@csrf_exempt
def delete_task(request):
    data = json.loads(request.body)
    task = Task.objects.get(id=data["id"])
    task.delete()
    return HttpResponse(status=204)

@csrf_exempt
def update_task(request):
    data = json.loads(request.body)
    task = Task.objects.get(id=data["id"])
    task.title = data["title"]
    task.description = data.get("description", "")
    task.date = data["date"]
    task.completed = data.get("completed", False)
    task.save()
    return JsonResponse({"task": model_to_dict(task)})