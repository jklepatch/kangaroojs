# Kangaroojs

Simple skeleton for MVC express apps (nodejs)

Main features:
* Modular design
* Ships with user accounts, login system and an admin
* Fully tested
* Uses [Express](https://expressjs.com) for web-framework
* Uses [Sequelize](http://docs.sequelizejs.com) for ORM
* Uses [Handlebars](http://handlebarsjs.com) for view engine
* Uses [Bootstrap](http://getbootstrap.com) for css framework

The usual workflow when developing an MVC project involves first to focus on a specific feature, then to work iteratively on relevant controller, view and test files. It requires a lot of back and forth between these files. However, many MVC frameworks organize their files functionally, i.e all view, controller and test files are located in view, controller and test folders. As the project gets bigger and bigger, those seemingly innocuous switching efforts between functional folders ends up adding a lot of time and mental overhead. 

To solve this problem, I have created this MVC framework, where the first unit of organization is the module (think feature). Inside each module are controllers, views and tests, optionally grouped by user-permissions level.

## Getting Started

1. Create a project folder
```
mkdir yourproject
cd yourproject
```

2. Create mysql database
```
mysql -u[YOUR ROOT_USER] -p[YOUR ROOT_PASSWORD]
mysql> CREATE DATABASE [YOUR DB_NAME]
```

3. Clone the repo & install dependencies
```
git clone https://github.com/jklepatch/kangaroojs.git
npm install
```

4. Setup env variables in project folder
Rename `.env-sample` to `.env`
```
mv .env-sample .env
```

Replace placeholders in `.env` with your own configuration
.env
```
NODE_ENV=[development|test|staging|production]
DB_HOST=[YOUR DB_HOST]
DB_NAME=[YOUR DB_NAME]
DB_USERNAME=[YOUR DB_USERNAME]
DB_PASSWORD=[YOUR DB_PASSWORD]
```

5. Setup environment-specific configurations
```
| -- /config
     | -- default.js
     | -- development.js
     | -- test.js
     | -- staging.js
     | -- production.js
```

## Prerequisites

* [Mysql v5.6](https://dev.mysql.com/doc/refman/5.6/en/mysql-nutshell.html)
* [Nodejs v6.10.2 (LTS)](https://nodejs.org/en/)
* [Mocha v3.4.1](https://mochajs.org) - `npm install -g mocha`
* [Sequelize-cli v2.7.0](http://docs.sequelizejs.com) - `npm install -g sequelize-cli`

## Folders Organisation
### Overview
```
| -- /apps
     | -- /web 
          | -- /modules  
          | -- /models
| -- /db
| -- /config
| -- .env.sample
``` 

### Apps
```
| -- /apps
     | -- /web 
          | -- /modules   
          | -- /models
```
Each subfolder of `/apps` represents one process of your app. By default there is one process, `web`.  Other can be added, like `cron` for example. For `/modules` and `/models` folders, please see their respective sections below.

### Modules
```
| -- /modules
     | -- user
          | -- routes.js          -> loads routes of this module
          | -- /admin             -> admin-specific routes, views and tests
               | -- routes.js
               | ------view-edit.js
               | ------view-delete.js
               | ------test-routes.js
          | ----public/           -> not logged-in routes, views and tests
               | -- view-index.js
               | -- routes.js
               | -- test-routes.js
```
Inside the `/apps/web/modules` folder live your modules. Modules are Views and Controllers (~routes)(The VC of MVC). Models are outside of modules because very often they need to be shared between modules. Inside each module, files are optionally grouped by permission levels. This allows to keep the focus on features and users. At a glance, you can see that such user can do such and such actions in a specific modules. And it helps to keep `routes.js` files slim.

### Models
```
| -- /models
     | -- index.js             -> loads all models
     | -- user.js              -> model `user`
     | -- test-user.js         -> test the model `user`
```

### Db
```
| -- /db 
```
Migration and seed files. Check [sequelize docs migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) and the [sequelize CLI](https://github.com/sequelize/cli) for more information. There is little official documentation for seeds, so check out the examples given in this repo.

### Configuration
```
| -- /config      -> environment-specific config files
| -- .env-sample  -> environment variables for sensitive config (ex: database). Need to be renamed to .env
```

## Tests
To run the tests, type at the root of the project:
```
npm run test
```
It will trigger unit tests and integration tests. It uses mocha, chai, and chai-http.

Unlike other frameworks, tests live next to the files they test:
* Unit tests: inside the models folder
* Integration tests: Inside each modules folder


## Deployment

@TODO: explain how to set it up with pm2.

## Built With

* [Express](https://expressjs.com) - The web framework
* [Sequelize](http://docs.sequelizejs.com) - The Mysql ORM
* [Handlebars](http://handlebarsjs.com) - The template engine

## License

This project is licensed under the MIT License