FROM node:20

WORKDIR /app

# Copiamos solo los archivos de configuración primero
COPY package*.json ./

# Instalamos las dependencias necesarias y limpiamos la caché
RUN npm install -g npm@latest && \
    npm install @rollup/rollup-linux-x64-gnu && \
    npm ci

# Copia el resto de los archivos
COPY . .

EXPOSE 3000

# Iniciar el servidor de desarrollo
CMD ["npx", "vite"]