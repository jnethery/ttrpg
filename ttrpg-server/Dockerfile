# Installs Node.js image
FROM node:20.16-alpine3.19

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

#Install dependencies
RUN npm install

# Copies everything in the src directory to WORKDIR/src
COPY ./src ./src

# Expose the debugger port
EXPOSE 9229

# Start the server with the debugger
CMD ["npm", "run", "dev"]
