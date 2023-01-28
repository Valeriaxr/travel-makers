01/04/23- Watched API videos to understand a little more of what FastAPI is/ does and how to implement it in our code.  We chose postgreSQL, and made a new excalidraw for the tables we want to create.. Wanted to do multiple databases, can change our mind about this later though.

01/05/23- I drove while we set up a new database. We decided to do a single database and began to create our tables. We created flights migration, hotels migration, activities migration and trips, but then we ran into a few errors at the end of trying to get them created.

01/06/23 Had lots of errors trying to get the development server up, localhost was not working Began to build the CRUD for accounts.


1/9/23 We began to work on flight queries and routers, we didn’t finish them but we were able to finish typing up hotels and getting the CRUD functionalities to work. Will work on flights CRUD again tomorrow to resolve errors.

1/10/23 tested out our flight CRUD on the server (Swagger) and ran into a few errors, but we were able to fix them pretty quick with the error messages it gave us. We completed activities CRUD and began working on trips but ran into issues trying to connect the foreign key. Trips has an id that needs to be connected to every flight, hotel, and activity we want to make.

1/11/23 We are running into a bunch of errors trying to create a trip so we tried to do something with one to many relationships and that didn't work, so we made our migrations into separate files instead of the one single file and we are making them less complex. Moving them into separate files helped us organize our stuff better. It was easier to follow.

1/12/23 Riley helped us with nested routes but we still are running into errors because we arent very familiar with how to implement them.


1/13/23 We had social hack hour today so a lot of our project time was taken away, but before the event we finished everything for trips. Our backend should be complete now because everything was running correctly on our swagger page.

1/17/23
Today I drove and we worked on our front end. We were able to create the signup page and successfully collect data from a user using redux toolkit and react hooks. We made a simple main page and began the front end work on hotels, like creating hotelsform and hotelsapi. We also tried to create a login modal.

1/18/23 Our code isn't really working when we tried to create a flight, activity and create a hotel. We don't know why this is an issue but we decided to delete the code and try to rewrite it. Spoke with Candace about it as well and she suggest we rewrite the code. We believe the reason it wont be created is due to the way our routes are set up but we aren't very sure.

1/19/23 So we resolved the issue as to why creating a flight mutation isn't working, it was because we were importing from the wrong place. We then were able to show our created trips as a list in our “Your Trips” tab but we aren't able to connect the TripDetals page to the individual id that is associated to a specific trip. This is probably another error due to our routes not matching up with what we have in our routers.

1/20/23 Today we were able to get flights, hotels, and activities to connect to our trips details page and made them into a list. It doesn’t look pretty yet but it will once we begin working on the CSS. We also were able to get an image to show up as well with our create activities so if users want to add an image of where they’re going they can. .

1/23/23: Today we worked on some css and tried to create an update and delete function but weren't able to get it working. We are wondering we should just scrap the update and delete all together, when we have a create working.  We got our log out page to work as well and also are able to hide the password now when logging in.

1/24/23: I began my unit test for flights, however the unit testing was not working. I started with a 404 error then changed a few things to run into a 422 error. Went to Riley for help, and he mentioned something about a method not being used that we use in our routers.

1/25/23: Continued working on the flight unit test and got it to work after returning a trip out. The test wouldn’t work until we returned from a trip because we need a fake existing trip to be made in order to make a flight. Happy to have unit testing work.

1/26/23: Started README, made specific files for our api, data models and GHI.

1/27/23: Finished the README! And merged all journal entires/ readme file to main branch.
