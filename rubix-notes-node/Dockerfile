# Stage 1 - Build App
FROM node:8.15 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build
# Stage 2 - Prod Build
FROM nginx:1.15.9-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]