# Pharmalink RESTful API

RESTful API to create, update and remove data from a MongoDB.

**`This is a personal project. If you are interested in clone it feel free to use it as a starting point for your own RESTful API. Good luck my friend :)`**

## Instalation & run the project

* clone the repo `$ git clone https://github.com/adriamarti/Pharmalink-RESTful-API.git`
* navigate to the cloned project `$ cd Pharmalink-RESTful-API`
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Code architecture

The API is build following the MVC (model-view-controller) where the views are the different routes. 
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── api
│   ├── controllers # Contains the different JS files that process all the data and it's consumed by the corresponding routes. (All the logic is here).
│   ├── global # Contains different JS files with all the global variables used along the API.
│   ├── middleware # Contains middleware services used to process data like authorization.
│   ├── models # Contains the data (data object definition) of the different routes (endpoints).
│   ├── routes # Contains all the routes available along the API.
│   └── services # Contains srevices consumed along the API.
├── app.js # This is the root of the API.
├── nodemon.json # sensible data (MongoDB Connection Data).
├── uploads # Contains uploaded files by the API.
├── .gitignore # Gitignore file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── server.js # server configuration.    
```

## @TODO's

* Create Great API Documentation (maybe with swagger).
* Move all the logic from routes to the controllers.
* Create and add to the project a Postman collection file to facilitate testing.