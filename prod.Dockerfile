# Build environment.
FROM node:14-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Get environment variables from the build.
ARG REACT_APP_API_HOST
ARG REACT_APP_API_DOMAIN
ARG REACT_APP_API_PROTOCOL
ARG REACT_APP_WWW_DOMAIN
ARG REACT_APP_WWW_PROTOCOL

# Set environment variables in this image when built.
# Apply environment variables with the build.
RUN REACT_APP_API_HOST=${REACT_APP_API_HOST} \
  REACT_APP_API_DOMAIN=${REACT_APP_API_DOMAIN} \
  REACT_APP_API_PROTOCOL=${REACT_APP_API_PROTOCOL} \
  REACT_APP_WWW_DOMAIN=${REACT_APP_WWW_DOMAIN} \
  REACT_APP_WWW_PROTOCOL=${REACT_APP_WWW_PROTOCOL}

# Verify environment variables work.
RUN echo "$REACT_APP_API_HOST"
RUN echo "$REACT_APP_API_DOMAIN"
RUN echo "$REACT_APP_API_PROTOCOL"
RUN echo "$REACT_APP_WWW_DOMAIN"
RUN echo "$REACT_APP_WWW_PROTOCOL"

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 1000000

# Copy source code.
COPY . .

# Build production instance.
RUN yarn build

# Copy into minimalist Nginx server.
# # SPECIAL THANKS: https://rsbh.dev/blog/dockerize-react-app
FROM nginx:1.19-alpine AS server
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

### BUILD
# docker build -f prod.Dockerfile -t rodolfossp/cps-frontend:prod-latest --platform linux/amd64 --build-arg REACT_APP_API_HOST=https://cpsdata.ca --build-arg REACT_APP_API_DOMAIN=cpsdata.ca --build-arg REACT_APP_API_PROTOCOL=https --build-arg REACT_APP_WWW_DOMAIN=cpsapp.ca --build-arg REACT_APP_WWW_PROTOCOL=https .

### TAG
# docker tag rodolfossp/cps-frontend:prod-latest rodolfossp/cps-frontend:prod-latest

### UPLOAD
# docker push rodolfossp/cps-frontend:prod-latest
