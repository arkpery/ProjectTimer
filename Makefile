all: init prod

init:
	cp .env.sample .env
	cp .env.sample .env.dev
	cp .env.sample .env.prod
	sed -i -E -e "s/ENV=.*/ENV=dev/g" .env
	sed -i -E -e "s/ENV=.*/ENV=dev/g" .env.dev
	sed -i -E -e "s/ENV=.*/ENV=prod/g" .env.prod
	rm .env-E
	rm .env.dev-E
	rm .env.prod-E

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
