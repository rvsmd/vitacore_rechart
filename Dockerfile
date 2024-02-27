# build stage
FROM node:16.20.0-alpine as installer
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

FROM installer as build
RUN npm run build

FROM nginx:1.24.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
