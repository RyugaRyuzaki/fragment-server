FROM node:20-alpine
#nodejs 18
RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
#copy package.json and package-lock.json
RUN npm install 
#install node_modules
COPY . .
#copy again with caching that means when you change source files docker just looking at package.json
# check id
RUN addgroup -g 197121 appgroup
RUN adduser -D -u 197609 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser


CMD ["npm","run","start:pm2"]

# EXPOSE 3000
