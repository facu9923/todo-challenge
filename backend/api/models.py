from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)  # Ahora es opcional
    date = models.DateTimeField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
