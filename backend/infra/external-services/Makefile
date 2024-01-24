#=================== EXTERNAL SERVICES (REDIS, PG, ES, CLICKHOUSE) ===================#
root_dir ?= $(shell cd ./.. && pwd)
x_current_dir := $(root_dir)/infra/external-services

x_docker_compose := docker compose -f $(x_current_dir)/docker-compose.ext.yaml -p house-marketplace

network_name := house_marketplace_network
network:
	@docker network inspect $(network_name) >/dev/null 2>&1 || docker network create $(network_name)

xup: network
	$(x_docker_compose) up -d --remove-orphans

xdown:
	$(x_docker_compose) down

xps:
	$(x_docker_compose) ps

xlogs:
	$(x_docker_compose) logs -f

db-enter:
	$(x_docker_compose) exec db ash

db-logs:
	$(x_docker_compose) logs -f db