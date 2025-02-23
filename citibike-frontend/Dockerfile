# Usar Node.js como base
FROM node:23.6.1

# Definir directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Usar un servidor web ligero para servir React
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]
