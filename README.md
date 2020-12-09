# Backend Heroku Link: https://immense-retreat-89767.herokuapp.com/
# Frontend Heroku Link: https://commercial-distribution-soln-2.herokuapp.com/
# NOTE, for logging in on the Frontend Heroku, you need to have an account created on the system, but there are default accounts that can be used
1. Order Taker: 
1. user: order_taker
2. Order Fulfiller:
1. user: order_fulfiller
2. pass: ot1234
3. Administrator:
1. user: admin
2. pass: root


# Project Description
This project was created by four individuals:
1. Zoraiz Naeem
3. Denisse Mendoza
4. Abdul-Quddus Adeniji
4. Tylor Autore

The concept of this project was proposed by Zoraiz Naeem.

At a high level, this project is designed to be a real-time distribution management system accessible 
from the browser.

In order to achieve this, the project was separated into two halfs, backend and frontend with two 
teams responsible for the development of each respectively.

# Backend Project Description
The backend team was tasked with creating a Server that hosts a database and responds to HTTP 
requests.

The purpose for this server is to act as a medium for the frontend project to access a database 
that stores all the information required to perform the many functions required for a distribution 
company. This server is accessed by the frontend by HTTP GET and POST requests to obtain data 
pertinant to particular functions for the frontend users.

The backend team is composed of two members:
1. Tylor Autore
2. Abdul-Quddus Adeniji

More information on the technical aspects of the backend project and how to set up the backend 
project on a local machine can be found in the backend/README.rm file

# Frontend Project Description
The frontend team was tasked with creating a webpage based application that provides several utilities
to its users that are related to a distribution company.

Many of these utilites require data, such as the shops that the company distributes to, the items that
are distributed, the orders for the different shops that have been placed, and the different users that
can log into the system.

This data is retrieved by sending HTTP requests to the separate backend project which hosts a database
containing the data.

The frontend team is composed of two members:
1. Denisse Mendoza
2. Zoraiz Naeem

More information on the technical aspects of the frontend project and how to set up the frontend 
project on a local machine can be found in the frontend/README.rm file
