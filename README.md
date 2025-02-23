# 🚀 Invera ToDo-List Challenge (Python/Django Jr-SSr)

¡Te presento mi solucion al desafío ToDo-List! 🎉

Esta aplicación permite a los usuarios gestionar su lista de tareas de manera sencilla y eficiente, utilizando Python y Django en el backend, y React en el frontend. A continuación, encontrarás las instrucciones para levantar la aplicación y detalles sobre su funcionamiento.

## 🛠️ Instrucciones de Instalación

En el directorio raiz ejecuta:

1. docker-compose build --no-cache

Luego, ejecuta:

2. docker-compose up

## 📋 Funcionalidades principales

Esta aplicación permite al usuario realizar las siguientes acciones:

- Autenticarse: Los usuarios pueden registrarse e iniciar sesión para gestionar sus tareas.
- Crear tareas: Los usuarios pueden agregar nuevas tareas a su lista.
- Eliminar tareas: Los usuarios pueden eliminar tareas que ya no necesiten.
- Marcar tareas como completadas: Los usuarios pueden marcar las tareas que han finalizado.
- Ver tareas: Los usuarios pueden ver todas las tareas que han creado, con la posibilidad de filtrarlas por fecha o contenido.
- Filtrar tareas: Los usuarios pueden buscar tareas por la fecha de creación o por palabras clave dentro de la tarea.

## 🧑‍💻 Estructura del Proyecto

Este proyecto está compuesto por dos partes principales:

### Backend (Django)

- API: Toda la lógica de la aplicación está disponible a través de una API RESTful utilizando Django REST Framework.
- Modelos: Se han creado modelos para gestionar las tareas y los usuarios.
- Autenticación: Utiliza el sistema de autenticación integrado de Django para registrar, iniciar sesión y gestionar sesiones de usuario.

### Frontend (React)

- UI: La interfaz de usuario está construida utilizando React.
- Comunicación con la API: El frontend interactúa con la API Django para realizar acciones como la creación, eliminación y actualización de tareas.
- Estado de la aplicación: Se maneja utilizando el hook useState y se hace uso de axios para realizar solicitudes HTTP a la API.

## 🎯 Objetivos y Evaluación

Durante el desarrollo del proyecto, se evaluaron los siguientes aspectos:

- Desarrollo con Python/Django y React: La aplicación utiliza Django para el backend y React para el frontend.
- Uso de librerías estándar: Se usaron librerías y paquetes estándar como django-rest-framework para la API y fetch para las solicitudes HTTP.
- Arquitectura y calidad del código: El código está organizado de forma modular y fácil de mantener.
- Manejo de logs: Se implementaron logs para registrar actividades relevantes en el sistema.
- Docker: La solución está completamente dockerizada, lo que facilita la ejecución en cualquier entorno.

## 🧑‍💼 Tecnologías Utilizadas

### Backend:

- Python
- Django
- Django REST Framework para la creación de la API
- SQLite (puedes cambiarla por PostgreSQL si lo deseas)

### Frontend:

- React para la creación de la interfaz de usuario
- Fetch para las solicitudes HTTP
- Material-UI (o cualquier otra librería de tu elección para el diseño)

## Docker para la contenedorización
