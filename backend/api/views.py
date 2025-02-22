from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.
def tasks(request):
    to_response = {
        "tasks": [
            {
                "id": 1,
                "title": "Task 1",
                "description": "Description 1",
                "completed": False
            },
            {
                "id": 2,
                "title": "Task 2",
                "description": "Description 2",
                "completed": False
            }
        ]
    }
    return JsonResponse(to_response)