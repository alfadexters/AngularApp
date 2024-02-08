FROM node:10-alpine as build-step 
RUN mkdir -appA
WORKDIR /appA
COPY package.json /appA
RUN npm install
COPY . /appA
RUN npm run build --prod
#Segunda etapa
FROM nginx:1.17.1-alpine
COPY --from=build-step /appA/dist/ProyectoA /usr/share//nginx/html