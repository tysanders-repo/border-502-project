# Step 1: Use Node.js as the base image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Install pnpm globally
RUN npm install -g pnpm

# Step 4: Copy `package.json` and `pnpm-lock.yaml` for installing dependencies
COPY package.json pnpm-lock.yaml ./

# Step 5: Install dependencies including dev dependencies
RUN pnpm install

# Step 6: Copy the entire project to the container
COPY . .

# Step 7: Expose port 3000 (Next.js default dev server port)
EXPOSE 3000

# Step 8: Start Next.js in development mode with hot-reloading
CMD ["pnpm", "dev"]
