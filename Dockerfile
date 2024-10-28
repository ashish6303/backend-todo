# Use the specified Node.js version
FROM node:20.6.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files from the local directory to the working directory in the container
COPY . .

# Expose the port your application listens on
EXPOSE 8000

# Start the application using main.js inside the src folder
CMD ["node", "src/main.js"]
