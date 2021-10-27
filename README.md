----ABOUT----

This website was originally completed in partial fulfillment of requirements for Full-Stack Certification at Coding Dojo under the title "Resort-App."

This code base has been refactored, expanded, and enhanced by Michael Towson, one of the original authors.

----.ENV REQUIREMENTS----

Server will not run without .env file, which is not included in public repository. To obtain, email mtowsoncoding@gmail.com or construct your own .env file in the server folder with the following variables:
  
  PORT={#}

  SESS_SECRET={yourSessionSecret}

  COOKIE_NAME={'your-cookie-name AS STRING'}

  MONGO_URI{'mongodb atlas url AS STRING'}

---- OVERVIEW OF DEPENDENCIES ----

**Client**

|REACT| Javasript framework used for front-end display and creating single page application
|AXIOS| Used for making HTTP requests
|REACT-TOASTIFY| Used to create "toast" notifications on the login page.
|REACT-CALENDAR| - Used to create calendar for reservation scheduling.

**Server**

|EXPRESS| Middleware used with Node.JS to make simplifed and streamlined RESTful API
|BCRYPT| Used to securely encrypt user passwords
|MONGOOSE| Used to make schemas in MongoDB
|NODEMON| Used to start server and automatically apply updates

---- HOW TO USE ----
1. Make sure that all prerequiste technologies are installed for both the server and the technology (client and server have unique node modules). Type "npm install" in the root directory for the client and "npm install" in the server directory for the server.

2. To use app, the server and client must both be running. To start the server, navigate to the server folder and type "nodemon server.js" (nodemon must be installed with npm). Then, start the client from the root directory type "npm run start."

3. Server requires .env file in order to operate. This is not available on public repository, so email mtowsoncoding@gmail.com to obtain or create .env file (see above in .ENV requirements)
