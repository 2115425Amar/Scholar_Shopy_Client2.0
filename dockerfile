# Step 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . . 
RUN npm run build

# Step 2: Serve using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Remove default nginx config and copy your own
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
