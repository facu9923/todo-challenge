# Usa una imagen de Python
FROM python:3.10

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos al contenedor
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente
COPY . .

# Expone el puerto 8000
EXPOSE 8000

# Comando para correr Django con migraciones
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
