FROM node:12.14.0

WORKDIR /usr/app/frontend

#Copia os arquivos para o docker
COPY package*.json ./

#Instala as dependências
RUN npm install

COPY . .

EXPOSE 3331

CMD [ "npm","start" ]