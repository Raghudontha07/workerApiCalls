FROM node:14

# Create app directory
WORKDIR /code

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN echo "[npm] installing" && \ 
npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# ENV NODE_ENV production
# RUN npm run build

EXPOSE 3002
CMD [ "node", "./" ]