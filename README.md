READ ME

Author: César Mendes

Description: API de rotas de voo

	GET /
	GET /flights
	GET /flight?code=...
	GET /flight?code=...&location=...
	where
	code = origin_airport
	location = destination_airport

Requisitos:

	Docker
	Docker logged account
	Terminal unix

1 - Setup:

	1.1 - Download/Unzip project to a folder
	1.2 - Open UNIX terminal in project folder
	1.3 - Follow the section 2 instructions


2 - Docker Commands:

2.1 - Build web app and respective dependencies:
	
	docker build -t "node_app" .                # don't forget the " . " at the end 


2.2 - pull mysql image from docker hub:

	docker pull mysql


2.3 - Run mysql with default (user-password) MYSQL5.7 AUTH 

	docker run -p 3307:3306 --name mysql-container -e MYSQL_ROOT_PASSWORD=root -d mysql --default-authentication-plugin=mysql_native_password


2.4 - Connect to db by terminal
	
	docker exec -i mysql-container /usr/bin/mysql -u root --password=root -e "create database docker_flights"


2.5 - Insert data into db

	cat backup.sql | docker exec -i mysql-container /usr/bin/mysql -u root --password=root docker_flights


2.6 - Run node app and link with db
	
	docker run --name flights-api -p 49160:8080 --link mysql-container:db "node_app"

DONE.

RUN IN localhost:49160/

3 - Technology used

3.1 - Node.js with express.js to improve application rounting.

3.2 - Mysql as database with a dataset coming from: 
	
	https://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236

3.3 - Docker to easily deploy and build both app and db, this setup is a bit more complex because the node.js app and mysql db are deployed in 2 different docker containers, which increases modularity and security from the application.



