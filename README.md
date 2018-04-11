# Progress of Social Housing Development in Ireland - Rebecca Stevens
## Code Institute - Stream 2 - Project Data Visualisation/Dashboard App

[Link to Site](https://boiling-basin-73569.herokuapp.com/)

### Technology Used
This Interactive Dashboard uses [dc.js](https://github.com/dc-js/dc.js/releases) which is a powerful javascript charting library that supports [crossfilter.js](https://github.com/crossfilter/crossfilter), a javascript library used to slice and dice large data arrays. Using crossfilter.js allows the developer to manage the data used for charting easily. Using crossfilter.js you can filter, group and reduce results. It uses [d3.js](https://d3js.org/) to render the charts in SVG format. 
The dashboard was created from a dataset on social housing development in Ireland at the time in question and is in .csv format. I downloaded the data file from [data.gov.ie](https://data.gov.ie/dataset?res_format=CSV&theme=Housing&page=7). 
MongoDB - a NoSQL database- was used as the database. It stores the data as seperate documents and has high scalability and is highly dynamic so is ideal for interactive dashboard charting. [Here is a link to MongoDB and MongoDB Shell download](https://www.mongodb.com/download-center) You can also use [mlab.com](https://mlab.com/) for cloud hosting your mongodb dataset. 
I also used [bootstrap](https://getbootstrap.com/docs/4.0/getting-started/download/) for a lot of the styling of the html of the dashboard.
The dashboard has been written as a [Flask](https://pypi.python.org/pypi/Flask) app which is a micro web framework written in Python. Here is a great [youtube tutorial by Traversy media](https://www.youtube.com/watch?v=zRwy8gtgJ1A&t=1074s) on writing a flask applictaion from scratch.

### Features

I have implemented a barchart, two piecharts, a select menu and number display into this dashboard. If the user wishes to find out information on housing development in Galway City for example, they can simply click on the Galway City bar and this will automatically filter the relevant data on all of the charts for Galway City. The dashboard tour, which was created using dc.datacount explains all of this to the user. [Here is a link](http://dc-js.github.io/dc.js/docs/stock.html) to a great tutorial on dc.js and its components.
The stage of administration piechart informs the user of the sites that are in administration and the stage they are currently in.
The housing development progress piechart informs the user on the amount of sites started, finished or in adminisitration proceedings.
There is a reset button which resets all the chart to full count. Dc.js was used for this again and here is the coding I used in the index.html for this  ```                    <span class="filter-count"></span> selected out of <span class="total-count"></span> records | <a id="resetButton"
                        href="javascript:dc.filterAll(); dc.renderAll();">Reset Charts</a>```.
                        
There is a data table at the bottom of the dashboard which informs the user of the Housing bodies developing the sites and the number of houses each. You can find the link to the tutorial above. I also found this [youtube video by John Alexis Guerra Gómez](https://www.youtube.com/watch?v=8TBh5ghRZrI&t=1224s) very helpful throughout the project development.


### Issues/Obstacles

The main issue I ran into was filtering out the data that were empty cells of data in the csv document. Here is an example of how I filtered out the empty cells by using an javascript event handler on the crossfiltered data. ```    var stagesCompletionDim = ndx.dimension(function (d) {
        if (d["stage_four"] !== "null") {
            return "Stage 4";
        } else if (d["stage_three"] !== "null") {
            return "Stage 3";
        } else if (d["stage_two"] !== "null") {
            return "Stage 2";
        } else if (d["stage_one"] !== "null") {
            return "Stage 1";
        } else {
            return "Advanced from Admin"
        }
    });```
ndx.dimension is how we implement the crossfilter.js to to the data. I had to edit all the empty cells in the  the csv data file to read null. Then I used the eventhandler above to filter all the null cells out.

















