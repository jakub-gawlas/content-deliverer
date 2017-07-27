FROM node:8.2.1-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock /app/
RUN yarn

# Copy app sources
COPY src/ /app/src/

# Set env vars
ENV APP_DATA_FILE_PATH /data/data.json
ENV APP_RESOURCES_DIR_PATH /data/resources

EXPOSE 3000

CMD ["npm", "start"]
