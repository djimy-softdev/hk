root_dir ?= $(shell cd ./ && pwd)
current_dir := $(root_dir)

.PHONY: frontend backend

gcp_region := asia-east1
# oci_registry := $(gcp_region)-docker.pkg.dev
gcp_project := house-marketplace-412211
repo_name := house-marketplace
oci_repository_url := registry.digitalocean.com/house-marketplace

docker-oci-login:
	doctl registry login

image_tag ?= $(shell git rev-parse --short=7 HEAD)
short_image_tag := $(shell  echo $(image_tag) | cut -c 1-7)

frontend_image := $(oci_repository_url)/frontend:$(short_image_tag)
backend_image := $(oci_repository_url)/backend:$(short_image_tag)

frontend-build:
	docker build --platform linux/amd64 -t $(frontend_image) -f frontend/Dockerfile frontend

frontend-push: docker-oci-login
	docker push $(frontend_image)

frontend-run-prod:
	docker run -it --env-file frontend/.env.prod -p 3000:3000 $(frontend_image)

backend-build:
	docker build --platform linux/amd64 -t $(backend_image) -f backend/Dockerfile backend

backend-push: docker-oci-login
	docker push $(backend_image)

backend: backend-build backend-push

backend-run-prod:
	docker run -it --env-file backend/.env.prod $(backend_image) bash

build: frontend-build backend-build

push: docker-oci-login backend-push frontend-push

build-and-push: build push

network_name := house_marketplace_network
network:
	@docker network inspect $(network_name) >/dev/null 2>&1 || docker network create $(network_name)

v_docker_compose := docker compose -f $(current_dir)/docker-compose.yaml -p hk
up: network
	$(v_docker_compose) up -d --remove-orphans
down:
	$(v_docker_compose) down

logs:
	$(v_docker_compose) logs -f

ps:
	$(v_docker_compose) ps

enter-backend:
	$(v_docker_compose) exec backend bash

enter-frontend:
	$(v_docker_compose) exec frontend ash

cleanup:
	$(v_docker_compose) down -v --remove-orphans
	cd backend && make xdown
	docker volume rm house-marketplace_db

backend-exec:
	$(v_docker_compose) exec backend $(cmd)

make xup:
	cd backend && make xup

migrate:
	$(v_docker_compose) exec backend bundle exec rails db:migrate

seed:
	$(v_docker_compose) exec backend bash -c "bundle exec rails urhouse:scrape && bundle exec rails db:seed"

setup: xup up migrate seed


frontend:
	cd frontend && yarn && yarn dev