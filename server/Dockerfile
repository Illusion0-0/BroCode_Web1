FROM node:12.22.10-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN addgroup app && adduser -S -G app app
RUN chown -R app:app /app
USER app

EXPOSE 3002

CMD ["npm", "start"]

