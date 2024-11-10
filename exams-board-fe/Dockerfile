FROM node:20

WORKDIR /usr/src/app


COPY . .

RUN npm install


EXPOSE 3002

ENV PORT=3002

CMD ["npm", "run", "dev"]

