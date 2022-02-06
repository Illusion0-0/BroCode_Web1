#Step 1: Build Stage
FROM node:12.22.10-alpine AS build-stage

#Setting Environment Variables
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Step 2: Getting ready for Production
FROM nginx:1.21.6-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]