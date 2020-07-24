build_docker:
	docker build --rm -f Dockerfile -t mehranunicef/mongo-db:$(shell git rev-parse HEAD) .
run_docker: build_docker
	docker run -d -p 27017:27017 --name mongodb mehranunicef/mongo-db:$(shell git rev-parse HEAD)