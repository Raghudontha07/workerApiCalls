
include .env

# The release agent just runs 'make' and expects a built docker image from it.
default: build

dc-build:
	docker-compose build app

# ---------- Development ----------
start: dc-build
	docker-compose run -e NODE_ENV=development --service-ports --entrypoint=npm app run start

# ---------- Testing ----------
test: dc-build
	docker-compose run -e NODE_ENV=test --entrypoint=npm app run test

watch-test: dc-build
	docker-compose run -e NODE_ENV=test --entrypoint=npm app run test-watch

coverage: dc-build
	docker-compose run -e NODE_ENV=test --entrypoint=npm app run coverage


# ---------- Release Agent ----------
#Server statup: createApp should create an express app
build:
	docker build -t $(DOCKER_REG)$(SERVICE_NAME) .


# ---------- Build Agent ----------
build-agent:
	- docker-compose down
	docker-compose -f docker-compose-ba.yml build app
	docker-compose -f docker-compose-ba.yml run --name=$(SERVICE_NAME) --entrypoint=npm -e NODE_ENV=test app run coverage-build-agent
	docker cp $(SERVICE_NAME):/code/test-results .
	docker cp $(SERVICE_NAME):/code/coverage .
	docker-compose down

lint:
	docker build -t $(SERVICE_NAME)-lint .

	docker run --rm $(SERVICE_NAME)-lint run lint
