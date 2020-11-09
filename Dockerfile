
# Development
FROM node:12 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --only=development

COPY . .

# Production
FROM node:12 as production

# Set necessary environment variables.
ARG DOCKER_ENV
ENV NODE_ENV=${DOCKER_ENV}

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH

# Create the working directory, including the node_modules folder for the sake of assigning ownership in the next command
RUN mkdir -p /usr/src/app/node_modules

# Change ownership of the working directory to the node:node user:group
# This ensures that npm install can be executed successfully with the correct permissions
RUN chown -R $user:$user /usr/src/app

# Set the user to use when running this image
# Non previlage mode for better security (this user comes with official NodeJS image).
USER $user

# Set the default working directory for the app
# It is a best practice to use the /usr/src/app directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json
# Copying this separately prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
RUN npm config set unsafe-perm true

# Install dependencies.
RUN npm i -g @nestjs/cli
RUN yarn --only=production
COPY . .
RUN ls -l
RUN yarn build
# Necessary to run before adding application code to leverage Docker cache
RUN yarn cache clean --force
# RUN mv node_modules ../

# Display directory structure
RUN ls -l

# Install PM2
RUN npm install -g pm2
COPY process.yml .
CMD ["pm2-runtime", "--format","process.yml"]
