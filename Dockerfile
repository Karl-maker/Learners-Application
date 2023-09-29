# Use a Node.js image for the "dependencies" stage
FROM node:19-alpine AS dependencies

# Set the working directory
WORKDIR /app

# Copy only the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Create a development stage
FROM node:19-alpine AS dev

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=development

# Copy dependencies from the "dependencies" stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Run the development command with Yarn
CMD ["yarn", "dev"]

# Create a production stage
FROM node:19-alpine AS production

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy dependencies from the "dependencies" stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Build the application using Yarn
RUN yarn build

# Run the production command with Yarn
CMD ["yarn", "start"]
