BUILD_DIR=build/
DOCKER_CONTAINER_BIND_PORT=3000

default:

install_dependencies: 
	yarn install

run: install_dependencies
	yarn start

build: install_dependencies
	yarn build

build_docker: build
	docker build --rm -f Dockerfile -t mehranunicef/devcon-client:$(shell git rev-parse HEAD) .

run_docker: build_docker
	docker run --rm -p $(DOCKER_CONTAINER_BIND_PORT):80 -t mehranunicef/devcon-client:$(shell git rev-parse HEAD)

clean:
	rm -rf $(BUILD_DIR)