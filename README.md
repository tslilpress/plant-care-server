# Plant Care (server)

This is the server side app for [Plant Care](https://tslilpress.github.io/plant-care-client/). A single page application that allows users to keep track of their houseplants watering and fertilizing schedule and reminds them when it's time to water or fertilize their plants.

## Important Links

[Client side app repo on git hub](https://github.com/tslilpress/plant-care-client) ----
[Clent side deployed site](https://tslilpress.github.io/plant-care-client/#/)

## Planning Story
I started by creating the plant schema using Mongoose. I then created the cURL scripts to for the different requests (to later test my routes). Finally, I created the CRUD routes using express and tested each route. This process is pretty straight forward and simple since I've done it a couple of times prior.

### User Stories
- As a user I would like to sign up/in
- As a user I would like to sign out
- As a user I would like to change my password
- As a user I would like to add a plant and its details
- As a user I would like see all my plants
- As a user I would like search for a single plant
- As a user I would like to update a plant
- As a user I would like to delete a plant
- As a user I would like to be see when the next watering and fertilizing is
- As a user I would like to be able to set my watering and fertilizing schedule for each plant
- As a user I  would to have a reminder to water or fertilize a plant on the scheduled day

### Technologies Used
- node.js
- Express
- MongoDB
- Mongoose
- Heroku
- cURL
- Javascript

### Unsolved Problems
I would like to eventually split up the locations of the plants by rooms. Also, have more information about each plant and their needs.

### ERD
![Plant Care App ERD](https://user-images.githubusercontent.com/68870466/98417400-d8193280-204e-11eb-8c7e-5eb4c79986c1.jpg)
