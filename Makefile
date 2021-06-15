all: init prod

init:
	cp .env.sample .env
	cp .env.sample .env.dev
	cp .env.sample .env.prod
	sed -E -e "s/ENV=.*/ENV=dev/g" -i .env
	sed -E -e "s/ENV=.*/ENV=dev/g" -i .env.dev
	sed -E -e "s/ENV=.*/ENV=prod/g" -i .env.prod

dev: 
	docker-compose --env-file .env.dev  up --build 

prod: 
	docker-compose --env-file .env.prod up --build

shutdown:
	docker-compose stop

clear:
	rm .env
	rm .env.dev
	rm .env.prod
	docker-compose down
