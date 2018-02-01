# Progress of Social Housing Development in Ireland - Rebecca Stevens
## Code Institute - Stream 2 - Project Data Visualisation/Dashboard App

[Link to Site](https://boiling-basin-73569.herokuapp.com/)

### Technology Used
* Flask
* MongoDB
* dc.js
* d3.js
* Crossfilter.js
* Heroku Deployment
* Queue.js
* intro.js / introjs.css
* bootstrap.min.js
* CSS
* HTML

### Platform Used
* JetBrains - PyCharm

### Features

* dc.barchart
* dc.piechart
* dc.dataTable
* dc.selectMenu
* Onboarding Tutorial


 

### About

A Data Visualisation Dashboard App showing Social Housing Development data from a csv file which I obtained from [data.gov.ie](https://data.gov.ie/data/search?theme-primary=Housing).
I uploaded the data to MongoDB and opened a connection from MongoDB to my Pycharm Flask App Project. Crossfilter.js, dc.js and d3.js was used to create interdependent charts, queue.js for the callback of functions and arguments selected. intro.js and introjs.css were used to implement an Onboarding Tutorial - pop up tooltips, for the charts.
I have Deployed my Project to [ My Heroku App](https://boiling-basin-73569.herokuapp.com/). 


### Issues/Obstacles

I had a lot of trouble deploying the project to my Heroku App. The main problem was my Project Interpreter - Virtual Environment did not have the right path and had installed too many packages.
I loaded the project in a new Flask App and set up the Virtual Environment correctly and then deployed it to Heroku. I used MLab MongoDB Sandbox
to deploy the MongoDB data to the Heroku App.






