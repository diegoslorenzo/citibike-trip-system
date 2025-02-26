# Use Node.js as base
FROM node:23.6.1

# Define working directory
WORKDIR /app

# COPY package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# COPY the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Usage of the serve package to serve the static files
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]
