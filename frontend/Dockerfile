# pull official base image
FROM node:latest as build

# set work directory
WORKDIR /frontend

RUN npm config rm proxy
RUN npm config rm https-proxy

RUN npm install -g npm@10.5.0

RUN npm config set registry https://registry.npmjs.org/

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=prod

# add app
COPY . ./

RUN npm run build

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d 


COPY --from=build /frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]