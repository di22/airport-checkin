# Define node version
FROM node:18.14.1-alpine
# Define container directory
WORKDIR /usr/src/app
# Copy package*.json for npm install
COPY package*.json ./
# Run npm clean install, prod dependencies only
RUN npm ci --only=production
# Copy all files
COPY . .
# Expose port 8080 for server
EXPOSE 3000
# Run "node server/run.js"
CMD ["node", "server/run.js"]