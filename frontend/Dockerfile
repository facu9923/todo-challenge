FROM node:18

WORKDIR /app

# Copiamos solo los archivos de configuración primero
COPY package*.json ./

RUN npm install

# Copiamos el resto de los archivos
COPY . .

EXPOSE 3000

# Iniciar el servidor de desarrollo
CMD ["npx", "vite"]
