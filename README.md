# Uber Eats Project

A web application that allows users to browse restaurants, view menus, and place orders, with additional functionality for restaurant owners to manage orders. Built using Django for the backend and React for the frontend.

This lab2 is continuation to lab1 project. The current repository covers the concept of dockers , kubernetes and kafka messaging services based on the lab1 project already developed.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [New Tech Stack](#new-tech-stack)
- [Steps](#steps)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Git Management](#git-management)
  
## Project Overview

This project is a clone of the Uber Eats application, designed to allow users to explore restaurants and place orders, while restaurant owners manage menu items and orders ( with order updates ) . The project includes two primary user flows:

- **User Flow**: For User login/signup , browsing, ordering, marking favorite restaurants and viewing order history.
- **Restaurant Owner Flow**: For managing orders ( and status ) as well as  updating restaurant information.

## Features

### User Side
- Login / Signup
- Restaurant browsing and menu viewing.
- Add dishes to cart and place orders.
- Order history with detailed order tracking.
- Favorite Restaurant selection.

### Restaurant Owner Side
- Restaurant dashboard with Profile Management and Order Management.
- In Order Management :
- View and manage customer orders by status.
- Update order delivery status.
- View customer profiles for each order.
- In Profile Management :
- Update restaurant details and dishes details along with their images.
- View the list of added dishes.
- Edit Dishes after adding the dishes.

## New Tech Stack
The current repository focused on dockerization , kubernetes setup and kafka messaging services between order and restaurants.

### Prerequisites : 
- Check requirements.txt file 

### Steps

1. Build frontend:
   cd uber-eats-frontend
   docker buildx build --no-cache -t <docker image with tag > .
Ex:
   docker buildx build --no-cache -t charishmatamarana/uber_eats_backend-frontend:latest .
2. Build backend:
   cd uber_eats_backend
   docker buildx build --file restaurants.Dockerfile --no-cache -t charishmatamarana/uber_eats_backend-restaurants:latest .
   docker buildx build --file order.Dockerfile --no-cache -t charishmatamarana/uber_eats_backend-order:latest .
   docker buildx build --file customers.Dockerfile --no-cache -t charishmatamarana/uber_eats_backend-customers:latest .
3. After building all images, do a push in docker app.
4. For config of nginx : kubectl create configmap nginx-config --from-file=nginx.conf
5. Now run for all yaml files: (run mysql, zookeper, kafka before backend and make sure those are in running status before starting backend)
   kubectl apply -f <yaml file of deployment>
   kubectl apply -f <yaml file of service>
6. After all pods are in running state :
   kubectl port-forward svc/frontend-service 8080:80 &
   kubectl port-forward service/backend-service 8000:80 &
7. To get kafka logs of consumers for order and order_update topic :
   kubectl exec -it <backendpodname> -c restaurants -- bash   
   root@backend-deployment-f9f6b868b-5znm8:/app# tail -f /var/log/kafka_consumer.log 

### Usage

Local Development: Access the frontend at http://localhost:8080 to run the application

### Screenshots
For Screenshots check the Screenshots file.

### Git Management
1. Fork the repository.
2. Create your feature branch: git checkout -b feature/feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature/feature-name.
5. Open a pull request.

Note: The above commands and settings given is done on Mac , some may change while running on windows. Check accordingly.



