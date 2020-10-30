BUILD_DIR=build/
DOCKER_CONTAINER_BIND_PORT=3002

default: 

install_dependencies: 
	yarn install

run: install_dependencies
	node index.js

build_docker: 
	docker build --rm -f Dockerfile -t mehranunicef/devcon-users-api:$(shell git rev-parse HEAD) .

run_docker: build_docker
	docker run --rm -p $(DOCKER_CONTAINER_BIND_PORT):80 -t mehranunicef/devcon-users-api:$(shell git rev-parse HEAD)

clean:
	rm -rf $(BUILD_DIR)