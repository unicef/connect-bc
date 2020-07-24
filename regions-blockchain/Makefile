BUILD_DIR=build/
DOCKER_CONTAINER_BIND_PORT=3003

default:

install_dependencies: 
	npm install

run: install_dependencies
	node server.js

build_docker: build
	docker build --rm -f Dockerfile -t mehranunicef/devcon-regions-blockchain:$(shell git rev-parse HEAD) .

run_docker: build_docker
	docker run --rm -p $(DOCKER_CONTAINER_BIND_PORT):80 -t mehranunicef/devcon-regions-blockchain:$(shell git rev-parse HEAD)

clean:
	rm -rf $(BUILD_DIR)