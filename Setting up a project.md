Create a Back-End with NodeJS

1. Create NPM Project 
	- Browse directory
	- npm init 
		- "test": "echo \"Error: no test specified\" && exit 1"
	- add to package.json: 
		- "start": "node index.js" 
		- "dev": "nodemon index.js"
2. Setting up index.js
	- Using Express as Server:
	```const express = require('express')
	  const app = express()```
	- Using middlewares:
	```
	const cors = require('cors')
	
	app.use(cors())
	app.use(express.json())
	
	```
	- Embedd FrontEnd:
	`app.use(express.static('build'))`
	*whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address. If a correct file is found, express will return it*
		
	- Use ENV Variables:
	```
	require('dotenv').config()
	const PORT = process.env.PORT
	```
	*Store variables in .env file*