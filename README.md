## Node.js/TypeScript/MongoDB Base Backend

This is a base project which helps any node.js developer or startup to setup a base for user/role/permission management, testing, dockerization and CI/CD.
This is built with Express.js framework, TypeScript, MongoDB database, and tested with Jest and Postman. 
This is usually a first and difficult step for any startup and this project will get you up and running immediately.

### Technologies and Resources

- Node.js
- Express.js
- TypeScript
- MongoDB
- Postman
- Jest
- Docker/Docker Compose
- Git

### Setup

1. Download and Install your variant of MongoDB from [here](https://www.mongodb.com/try/download/compass).
2. Open the app and create a database called *nodebase*. 

3. Install Node.js. Download your variant from [here](https://nodejs.org/en/download/)

- After install, open git bash or a terminal and type the command below to see if you get the help page

```
npm -h
```

4. Clone this repository

```
git clone https://github.com/scneba/node_typescript_base.git
```

5. open git bash on the root folder and run

```
npm install
```

6. Make a copy of the .env.example and rename it to .env
7. Update the connection string on line 2 to include your mongodb connection string

```
MONGO_URL="mongodb://localhost:27017/nodebase"
```

8. Run `npm run dev` on the root folder to start the project. 

10. Install postman and create an account. Download from [here](https://www.postman.com/downloads/).

## Development

### File structure

**--postman** \
**--files.json** postman collections. \
**--src** all source code should be added in here. \
**--controllers** MVC controllers - all core logic for endpoint control is added here. \
&nbsp;&nbsp;&nbsp;**--errors.js** All error contants. Any errors reported in this service should be here. \
&nbsp;&nbsp;&nbsp;**--service.js** All the logic for the sub controller should be added here. \
&nbsp;&nbsp;&nbsp;**--service.test.js** All tests for this controller should be added here. See the documentation for jest testing [here](https://jestjs.io/docs/getting-started). \
**--data** all database access methods are added here. \
**--migrations** All Sequelize migrations are added here. See the docs [here](n. \
**--models** All database models for Sequelize
**--routes** All routes contained in the repo.
**--seeders** All Sequelize seeds see [here]s(https://sequelize.org/master/manual/migrations.html#running-seeds) for the docs. \
**--services** All access to external services are added here, cross platform requests. \
**--utils** Any reusable javascript code \
**--app.js** entry point of application. \
**--migrate.js** service to run migrations when user first runs app. \
**--storage** storage for sessions

### Run Seeds
- Update the connection string on line 19, src/seeder/seeder.ts to your mongodb connection string. 
- Run this command in the root folder to run the seeds on the database
```
npx tsnd src\seeder\seeder.ts
```


### Testing

Ideally, all core logic in controllers should be tested. To test particular sub controller/file, use the testPathPattern eg.

```
npm test -- --testPathPattern "registering/"
```

This will run all tests in the registering/ path.

### Postman

Import the collection at Postman/nodebase.postman_collection.json into postman.
Update the domain variable in postman
![image](./images/postman.jpg)

- Start project with ts-node

```
npm run dev
```

- Run postman collection and make sure all tests pass
  ![image](./images/postman_all_tests.jpg)

Congratulations, you are ready to start development with this base project.
