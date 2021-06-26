# Workorder System Project

### This is a simple example of what a workorder system might look like.

* **Design Choices**
    * I decided to use Node.js/Express backend because it is a lighter, unopinionated framework. It is easy to set up and great to just create a few endpoints
    * I decided to use Mysql for my database due the the nature of the data. When ordering vehicles, there are relations between tables (key_id = vehicle_id)
    * I decided to use Vue.js for the frontend becuase it is my favorite SPA framework. 

* **How to Run locally**
    * First clone this repository on your local machine
    * Start up Mysql on your local machine
    * cd into the server folder and run the init javascript files ("node init_db.js" and "node init_tables.js")
        * This will create a Mysql database and populate the tables with some sample data
    * Run the index.js file. You can use nodemon for this - it is already a dev dependency so you can run "npm run dev"
    * In another terminal, cd into the client folder and run "npm run serve", this will start our Vue.js on another server

* Mysql data can be seen in the init_db.js and init_tables.js files. Please let me know if there are any questions, thank you
* Improvements: this app is still rough around the edges so here are some things I would do if given the time
    * Create environment variables so that it will be easier to launch to production (ex. make port numbers env variables)
    * Add some unit testing and to make sure functions account for edge cases - I would add more error handling as well (try catch statements)
    * Improve the UI, make everything look neater and test for bugs
    * Better automate the database initialization process