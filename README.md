# Trucking

## Requirements
* Nodejs >= 12 version
* npm
* yarn
* Ruby 2.6.8
* Rails 5.2.6
* postgreSQL
* Docker engine

## To run app with docker
Clone the app
```
git clone https://github.com/Rails-course/trucking.git
```
Set up .env file (based on .env.examle) \
Build docker container
```
docker-compose build
```
Run docker container
- before running docker container make sure all used ports in docker-compose.yml are free on your system
```
Docker-compose up -d
```
Set up database
```
Docker-compose exec web rails db:setup
```
## Now you good to go, check localhost:3000
