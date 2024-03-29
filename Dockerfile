FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app
CMD ["npm", "start"]
