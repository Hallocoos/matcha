First group web project for the web based semester at WeThinkCode_ , using TypseScript, Knex, KnockoutJS and some base HTML and CSS. You can find the project brief here: [instructions](https://github.com/Hallocoos/matcha/blob/master/matcha.en.pdf).

This Project is about creating a basic online dating website. It is inspired largely by Tinder, and involves creating a profile with some general info about yourself and your interests, matching with people using "likes" and once both users have liked eachother they can chat.

To install the project you need to have the following dependencies installed before cloning:

    npm package
    mysql database package
    sendmail package

*you can install npm and then run "npm i" (after cloning the repository) from the commandline to install all needed dependencies for the project

To install the project:

    clone the repository from github to anywhere on your computer

    go into the matcha folder

    create a .env file and it in place the following (please note DBPASSWORD is your own mysql password and email and email password have been left out for safety reasons):
    
\# .environmental variable file to store and configure various variables

ACTIVEDB = "mysql"
DBFOLDER = "./database/"
DBNAME = "matcha"
DBPASSWORD = ""
DBHOST = "localhost"
DBUSER = "root"
NODE_ENV = "development"

\# Set port for the API service
PORT = 3000

\# Set the secret key to be used by JSON Web Token Authentication
SECRETKEY = 'secret'

\# Set logging status 
CONSOLELOG = 'true'
LOGFILE = 'true'

\# Initial admin properties
ADMINNAME = 'admin'
ADMINPASSWORD = 'admin'

\# Emailer
EMAILUSER = ""
EMAILPASS = ""

To run the site:

    make sure you installed all the needed dependencies and then run the following command in commandline: "nodemon redb" and wait till you see the line "server running on port 3000" in your terminal.
    
    at this point you can type "http://localhost:3000/matcha/" into your address bar and press enter. You should then see the home page of the site.

    if you need to stop the service at any point you can use ctrl + c, and use "nodemon start" to start it up again. 

The source code of the project is laid out as follows in the repository:

    root folder: .gitignore is a file to ensure certain file types created during the testing of the programme do not get uploaded to the repository

    root folder: the readme (explains the project)

    root folder: the project brief and testing page(pdfs)

    root folder: .json files for dependency version and other setup information, js and html files for basic setup

    database folder: migrations folder contains the setup for the database tables. teh seeds folder contains the example users we have created to help with testing the site (in development).

    node_modules: should not need to be edited, contains all the information about the required node modules in our project

    src: contains all the working parts of the programme:
    - controllers: the different access levels and the functions needed to do the avaialable actions allowed by the user level. eg. regular user vs admin of site

    - helpers contains functions to do with emailing for user verification and geo-location

    - models contains all the information about how an object is set up and what information it can contain e.g.  user, image, notification

    - services contains input validation functions and base sql (in the form of knex) queries which are reused in other functions.

    - view contains front end pertaining files.  the html page in use, the knockout file required, the logo image for our design. 

    - loose files showing base formats and typescript files

    testImages: contains contains images used in our test case users in the seeds.

for testing the programme, see the testing pdf linked here: [tests](https://github.com/Hallocoos/matcha/blob/master/matcha.markingsheet.pdf), and you can make use of the seeds created with verious users to test almost every possible scenario.
