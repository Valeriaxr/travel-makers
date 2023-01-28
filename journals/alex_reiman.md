## January 4, 2023


Today, we all worked together on creating the beginnings of our project.  We discussed which database we wanted to use and settled on PostgreSQL because it seems to be more in demand based on the Stack overflow survey.  We started discussing if we wanted one database or multiples and mapped out what information we needed for each table.  We settled on multiple databases: accounts, trips, flights, hotels, and activities.  Once we did that, I drove while we followed the learn instructions to build our first microservice: accounts.  Then we divided up the others and followed the instructions to build all 5 of our microservices.  Learning about how to integrate multiple databases was really interesting!


## January 5, 2023

Today, we decided to follow the guidance of our instructors and decided to create a monolith for our back end rather than 5 separate microservices.  So, we reforked the repo and started over.  Victoria drove while we all guided her on the dockerfile, main.py, requirements.txt, and building our new docker-compose file.  Then, we tried to build our tables in a new migration.  We found lots of interesting info on data types including timestamp and numeric instead of float.  However, we tried to re-run our docker containers and ran into an error we will need to work on tomorrow.

## January 6, 2023

We resolved our migration problems from yesterday.  We started working on authentication, but ran into a problem that we hadn’t created accounts yet.  We therefore saw nothing on our fastapi page.  We met up and discussed how to best resolve this and decided we needed to build out our accounts first.  We asked Valeria to rewatch the videos and take notes as her notes are amazing.  The rest of us tried to work on accounts based on our notes.  We built out most of the accounts queries and other aspects of accounts.  After some more debugging, we got our Swagger to actually show up!

## January 9, 2023

We realized that we had some bugs in our account code.  We had built it like any other data rather than something that needed to interact with authorization.  We all worked together to go back and correct our bugs until we got our code working in Swagger.  We then split off with Victoria and Valeria working on flights while Anderson and I worked on hotels.  While we were building the back end for hotels, we realized we wanted to add cities into the data for hotels.  We adjusted our migrations and everything else to include it and then finished the hotels back end.  We then met up to help with flights before finishing for the day.

## January 10, 2023

Today, we finalized our work on flights, checking to make sure that all our CRUD worked in Swagger.  We dealt with a bit of a Git issue, as one of our pushes seems to have not worked, but we resolved it.  Then we all worked together on activities.  We discussed if we wanted to change our tables to fit our plan for an MVP, but decided to keep them built towards our stretch goals.  We finished activities and started to work on trips but ran into a major blocker.  We realized that activities and trips share a many to many relationship and we did not know how to build that in SQL.  We spoke to Dalonte, and he said he can help us tomorrow.

## January 11, 2023
Today, we had to rearrange the way we were thinking about our data.  We talked to Dalonte about how to do a many to many relationship and got it mostly built, but then realized we were over-complicating our data.  Riley suggested we change it so that users will build trips first, then build flights, hotels, and activities for each individual trip after.  We worked to rewrite and spread out our migrations, but didn’t have working code yet.  I met with Riley and he helped me to create working code for creating and getting a trip and said he would help more tomorrow.  I let the others in the group know.

## January 12, 2023
We made so much progress today.  We spoke to RIley a few times and he helped us to create nested routes for our post and get in flights.  Then, we all worked together with me driving to build out the rest of the nested routes and changing our queries for the rest of flights.  We then split into groups.  Anderson and I were working on hotels with Anderson driving.  We used flights as an example and built working code for hotels.  Victoria and Valeria worked on activities.  They ran into some issues where I made some mistakes in migrations, but were able to get create and get to work for activities.

## January 13,2023
We worked together today to finish off our back end, hopefully.  We built queries and routes for the rest of our trips (get all, update, delete).  We also realized that everything needed to be locked behind authentication so that you users can only see their own info and no one else can see that.

## January 17, 2023
Today we began our front end.  We worked on our main page and started work on our accounts and hotels.  We watched the videos again to guide us in our work with Redux.  Near the end of the day, we spoke to Candice and she helped guide us towards how to fix our accounts, so we will work on that tomorrow.  Victoria drove today while the rest of us provided suggestions and support.  It looks like we will need to create a very long file.

##January 18, 2023
Today, we all were sort of working on various parts of the project.  I worked to get accounts a little more effective.  I worked and was able to get signup to work despite burning through a lot of bugs.  Anderson worked on login with Riley for a bit, but still didn’t have it functioning.  We worked with Candice and got login to work as well.  It is great having the support of our instructors.

##January 19, 2023
Today we continued to all work together to try and get things working.  I drove today, while we got advice from others.  We struggled through stuff with trips, but finally got the ability to create trips and the ability to see all your trips in a list.  We are trying to build a trips details page and running into a lot of errors that we are having issues resolving.

## January 20, 2023
We kept working together since everything we needed to work on was on one file.  However, today was unbelievably productive!  I drove today.  We pushed through a few blockers and got not only trips detail to work, but also were able to connect flights, hotels, and activities to it.  We have connections to create all three things, plus created tables on the details page to show the details for flights, hotels, and activities!  Tomorrow, we need to work on being able to update and delete trips, flights, hotels, and activities but it is looking so much better than it was!

## January 23, 2023
Over the weekend, Valeria did a bunch to update our CSS and make the website look great!  Today, I worked on a few small fixes to some problems.  Mostly, I worked on getting our log out functionality to work.  After pushing through a few blockers, I was able to get there!

## January 24, 2023
Today, I focused on trying to get tests to work.  I re-did the exploration and re-watched Riley’s lecture on it.  After following along with Riley’s lecture, I was still running into some errors.  Working with Will, I got one of my two tests to work.  I am going to try to get the other to work tomorrow, but if not I still have one!

## January 25, 2023
Today, I focused on cleaning up some code.  I worked to eliminate print and console log statements, take out unnecessary blank lines, fix punctuation and eliminate dead code.  I also worked with Victoria to help her with writing her unit test.

## January 26, 2023
Today’s focus was working on deployment.  I worked with Delonte multiple times throughout the day to try and get it deployed, but we are running into problems still.  It won’t show my back end jobs for the build part in my yml file.

## January 27, 2023
Today I continued to work on CI/CD with Delonte for a while.  When testing our project, we ran into some bugs and spent a bunch of time debugging.  We have everything working now, and are submitting!  This project definitely had some challenges, but I am proud of what we have made!
