# nodejs 20.0.5
# install
  - Run "npm install"
# build the worker to bundler "bim-fragment"
  - Run "npm run build"
  - ( see rollup.config.mjs for more detail)
# Development
  - Run "npm run dev" (ignore uploads folder)  
# Production
  - docker version 24.0.2
  - check id 
    - Bash : Run "whoami"
    - Sh   : Run "id"
    ```
    change your id in Dockerfile :

    RUN addgroup -g <yourid> appgroup
    RUN adduser -D -u <yourid> appuser -G appgroup
    ```
  - build image
    - Run "docker build -t fragment-server:v1 ."
  - run image
    - Run "docker run -d --name fragment-server -p 3000:3000 fragment-server:v1"