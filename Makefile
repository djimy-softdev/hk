root_dir ?= $(shell cd ./ && pwd)
current_dir := $(root_dir)

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

frontend: frontend-build frontend-push

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

env ?= develop
service_name := house-marketplace-$(env)
deploy:
	gcloud run services update $(service_name) --image=$(oci_image) --region=$(gcp_region) --quiet
