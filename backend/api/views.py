from django.shortcuts import render
from .models import Task
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
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