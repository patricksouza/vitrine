FROM node:alpine

WORKDIR /usr/app/backend

#Copia os arquivos para o docker
COPY package*.json ./
#Instala as dependências
RUN npm install

COPY . .

RUN ls

EXPOSE 3333

CMD [ "npm","start" ]
