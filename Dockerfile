# Stage 1
FROM node:alpine
WORKDIR '/app'
EXPOSE 4030

# Install the latest version of angular client
# Install of the dependecies from package.json file.
RUN npm install -g @angular/cli@latest
COPY package.json .
RUN npm install
COPY . .

# running the application using ng serve
# specify the alocated IP address for the application in this case
# specify the port for the application.
# The values shown below should much values in docker compose.
CMD ng serve --host 172.18.0.5 --port 4030
