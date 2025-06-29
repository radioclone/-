
# Simple Dockerfile for serving static HTML app
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g serve
CMD ["serve", "app", "-l", "3000"]
