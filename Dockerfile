# Stage 1: Build the React app
FROM node:20-alpine AS build-stage
WORKDIR /app

# Accept the API Key as a secret argument from Google Cloud
ARG GEMINI_API_KEY

# Create the .env.local file so Vite includes the key in the build
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

# Install dependencies and build the site
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
# Copy the built files from Stage 1 to the Nginx folder
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy our custom Nginx config (created below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
