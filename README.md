# Task-Manager

The goal of this project is to implement a task management application. To achieve that, I've implemented a back-end [`Spring Boot`](https://docs.spring.io/spring-boot/index.html) service and a frontend [React](https://react.dev/) application. I will also be using [`JWT Authentication`](https://en.wikipedia.org/wiki/JSON_Web_Token) to secure both applications.

## Prerequisites

- [`Node.js v20.15+`](https://nodejs.org/en/download)
- [`Npm v10.7+`](https://www.npmjs.com/package/npm?activeTab=readme)
- [`Java v17+`](https://www.oracle.com/java/technologies/downloads/#java21)
- [`MySQL Community Server v8.4.4 (LTS)`](https://dev.mysql.com/downloads/mysql/)
- [`Apache Maven 3.9.9`](https://maven.apache.org/download.cgi)

## Application

- ### Backend

  The `Spring Boot` service exposes a few endpoints in order to allow for the creation, retrieval and deletion of tasks. In addition, there are a few endpoints which allow for user registration and login.

  Most of the service's endpoints can be accessed if a valid JWT access token is provided in the header of the request.

  This service stores data in a `MySQL` database and has the following endpoints:

  | Endpoint                                  | Secured | Roles  | Description             |
    |-------------------------------------------|---------|--------|-------------------------|
  | `POST /login {"username","password"}`     | No      |        | Used to log in a user   |
  | `POST /register {"username","password"}`  | No      |        | Used to register a user |
  | `GET /tasks`                              | Yes     | `USER` | Fetches all tasks       |
  | `POST /tasks {"title","description"}`     | Yes     | `USER` | Creates a new task      |
  | `PUT /tasks/{id} {"title","description"}` | Yes     | `USER` | Updates a specific task |
  | `DELETE /tasks/{id}`                      | Yes     | `USER` | Deletes a specific task |



- ### Frontend

  A `React` frontend application where a user can create, update or delete tasks.

  In order to access the application, a `user` must log in using their `username` and `password`.  A JWT token is generated when the `user` logs in and is used for all further requests that user makes to the backend.

  The frontend application uses `Bootstrap` and `Material-UI` for its styling and components.

## Setup

1. After installing the MySQL server, create a new user and a new schema (e.g. task_app). You can also use [`MySQL Workbench`](https://dev.mysql.com/downloads/workbench/) to perform those tasks.
2. Fill in your schema details and user credentials in `application.properties`
3. Using the terminal go to the root of the project's directory and run ``` npm install ```. That should install all the project's dependencies and build the spring boot application.
4. Using the terminal go to the `/frontend` directory and run ```npm install``` to install all the dependencies for the React application.
5. On the same path and using the terminal try running ```yarn --version``` if the command is not recognised run ```npm install --global yarn```
6. On the same path and using the terminal run ```yarn start``` to build and start the React app.
7. If your React app is not running on http://localhost:3000 you might need to update the CrossOrigin annotation on `AuthController.java` & `TaskController.java` to match your app's URL.
8. To start the backend spring boot service go back to the project's root directory using the terminal and run ```mvn spring-boot:run```, which should make the service available on http://localhost:8080.
9. If the spring service doesn't start on that port or the URL differs you will need to amend the `proxy` config entry in `/frontend/package.json`

Running the spring boot service should automatically create 2 db tables, `tasks` and `users`.