# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock (if available) into the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files into the container
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Set the environment variable for production mode
ENV NODE_ENV=production

# Start the application using the Next.js start script
CMD ["yarn", "start", "-p", "3000"]
