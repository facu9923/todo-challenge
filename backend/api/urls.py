from django.urls import path
from . import views
from .views import RegisterView, LoginView
urlpatterns = [
    path('', views.tasks, name='tasks'),
    path('add-task', views.add_task, name='add-task'),
    path('delete-task', views.delete_task, name='delete-task'),
    path('update-task', views.update_task, name='update-task'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]