# Build stage
FROM node:22-alpine AS build
ARG VITE_API_URL=http://localhost:5000/api
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

