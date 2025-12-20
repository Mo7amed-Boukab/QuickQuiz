FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install --no-save @rollup/rollup-linux-x64-musl@4.53.5 lightningcss-linux-x64-musl@1.30.2 @tailwindcss/oxide-linux-x64-musl@4.1.18

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
