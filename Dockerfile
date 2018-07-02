# Builds a Docker to deliver SSR
FROM andersnormal/fluffy:latest

# create app directory
WORKDIR /usr/src/app

# support (npm@5+)
COPY package*.json ./

# install
RUN npm install --only production

# assets
COPY . .

# run on 8080
EXPOSE 80

CMD ["/start.sh", "--bundle", "public/vue-ssr-server-bundle.json", "--manifest", "public/vue-ssr-client-manifest.json", "--template", "public/index.html" ]
