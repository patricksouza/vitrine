FROM node:alpine

WORKDIR /usr/app/frontend

#Copia os arquivos para o docker
COPY package*.json ./

COPY public/index.html ./public

#Instala as dependências
RUN npm install

COPY . .

EXPOSE 3333

CMD [ "npm","start" ]