joural- 

1/4/23- Started up project, decide to use postgres. Decided to use multiple databases and tried to build accounts but failed to do so. 

1/5/23-decided to do monolith instead of indiv micros. Vic drove and we made new docker compose file, requirement.txt. Had migration problems.

1/6/23 - we fixed our bugs from docker via run.sh and and set up our localhost to be working and running. Initially it was not working because we probably did not set up our accounts stuff yet. We had sent valeria to take notes on the videos while we did so. Then we set up the stuff for accounts and surely enought it worked. 

1/9- today we fixed more of our error 500's and decided it was probably the commas giving us the error...once that was resolved, we split up into pairs and worked each worked on Hotels/Flights. Me and Alex were able to get CRUD for hotels running on the localhost. 


1/10- debugged flights on swagger, re did some migrations....and started working on trips

1/11- had to redo our migrations and models bc we had a many to many relationship , also had to dumb down the project. Dalante came to talk and help us and Riley told us to nest everything in trips. Spread out migrations so we had not just one file, but 5 different files. Did not know how to do nested routes yet. 

1/12- fixed up migrations queries and routers via nested routes. Then worked on hotels to fix queries and routers for that and checked if they worked on localhost. Then the girls did the same for flights, we did hotels. but trips as a group.


1/13- added auth for trips, and finished up with activities crud via nested route. 


1/17- did some front end stuff... we made our sign up page, login, added stuff for our apps.js. We also decided to implement redux so we started to do that for hotels. Also worked on main page. Also tried to do modal thing for log in right before candice came in to help us. 

1/18- Worked more on the front end. I installed bootstrap in the index.html via riley. Made our front end look like car car, and attemped to do the login page. The rest of the team also did their own thing. We touched base to see if everything was working and that our push and pulls were successful. 

1/19- We continued to work on front end. Finally fixed the line 1. react/redux/toolkit bug, got our hooks working and the pages finally load for flights activity and signup.
Fixed our auth error, took conf go to model and made our trips load like that. 

1/20 - finally got details page to work, and connect flights. and stopped the infinite loop, and 404 errors we been getting. Got the tables to list out for hotels, flights, and activities. used {} () instead. 

1/23 - Alex was able to get the logout button function to work. I attemped to add delete button but did not work. Valeria had updated our front end to have videos in the background. And attemped to change some colors of our front end. 


1/24. Made the logout button red, made the front end more consistent, nav bar touch up. and forms to be centered and consistent. Did the same to the trips list page. attempted unit testing.

1/25- touch up on the front end, making all buttons consistent and tried to make the form boxes not move when minizing screen

1/26- finally got to fix the minizing issue by making it px and not by %, also added a logo to the home and main page. Tried to set up deployment as well.