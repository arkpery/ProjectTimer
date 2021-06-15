all: init prod

init:
	docker run -ti -v `pwd`:/home/node/app -w /home/node/app node cp .env.sample .env
	docker run -ti -v `pwd`:/home/node/app -w /home/node/app node cp .env.sample .env.dev
	docker run -ti -v `pwd`:/home/node/app -w /home/node/app node cp .env.sample .env.prod
	docker run -ti -v `pwd`:/home/node/app -w /home/node/app node sed -E -e "s/ENV=.*/ENV=dev/g" -i .env
	docker run -ti -v `pwd`:/home/node/app -w /home/node/app node sed -E -e "s/ENV=.*/ENV=dev/g" -i .env.dev
	docker run -ti -v `pwd`:/home/node/app -w /home/node/app node sed -E -e "s/ENV=.*/ENV=prod/g" -i .env.prod

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
