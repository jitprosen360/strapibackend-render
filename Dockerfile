# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /opt/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Strapi application files to the container
COPY . .

# Expose the port that Strapi will run on (change this if needed)
EXPOSE 1337

# Set environment variables (optional, adjust according to your needs)
ENV NODE_ENV=production
ENV DATABASE_CLIENT=mysql
ENV DATABASE_HOST=127.0.0.1
ENV DATABASE_PORT=3306
ENV DATABASE_NAME=strapimysql
ENV DATABASE_USERNAME=jit
ENV DATABASE_PASSWORD=jitprosen360@3

# Run the Strapi application
CMD ["npm", "start"]