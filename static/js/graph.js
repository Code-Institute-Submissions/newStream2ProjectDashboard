queue()
    .defer(d3.json, '/socialHousing/projects')
    .await(makeGraphs);
function makeGraphs(error, socialHousingProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    socialHousingProjects.forEach(function (d) {
        d.county = d["County_City"];
        d.number_of_Units = +d["number_of_units"];
    });


    var ndx = crossfilter(socialHousingProjects);
    var all = ndx.groupAll();


    var cityDim = ndx.dimension(function (d) {
        return d["County_City"];
    });

    var bodyDim = ndx.dimension(function(d){
        if (d["approved_housing_body"] === "*N/A"){
            return "Other";
        } else {
            return d["approved_housing_body"];
        }
    });


    var siteStart = ndx.dimension(function (d) {
        if (d["site_start"]!=="null") {
            return "Site Started";
        }else if (d["site_finish"]!=="null") {
            return "Site Finished";
        }else{
            return "In Stage of Development";
            }

    });


    var stagesCompletionDim = ndx.dimension(function (d) {
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
    });

    var cityGroup = cityDim.group().reduceSum(function (d) {
        return d.number_of_Units;
    });
    var siteStartGroup = siteStart.group();
    var stageofCompletionGroup = stagesCompletionDim.group();
    var bodyGroup = bodyDim.group();

    var colorScale = d3.scale.ordinal()
                         .domain([cityGroup])
                        .range(["green"]);



    var maxCity = cityDim.bottom(1)[0]["County_City"];
    var minCity = cityDim.top(1)[0]["County_City"];


    var cityGroupChart = dc.barChart("#housesPerArea");
    var siteStartChart = dc.pieChart("#site-stage");
    var selectField = dc.selectMenu("#menu-select");
    var stagesofCompletionChart = dc.pieChart("#stageofCompletion-chart");
    var totalHousesND = dc.numberDisplay("#totalnumHouses");
    var bodyCount = dc.dataCount(".dc-data-count");
    var bodyTable = dc.dataTable('.dc-data-table');


    selectField
        .dimension(cityDim)
        .group(cityGroup);

    totalHousesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    siteStartChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5"])
        .height(300)
        .radius(100)
        .innerRadius(40)
        .transitionDuration(1500)
        .turnOnControls(true)
        .dimension(siteStart)
        .group(siteStartGroup);




    cityGroupChart
        .width(500)
        .height(400)
        .margins({top: 10, right: 10, bottom: 55, left: 40})
        .gap(10)
        .brushOn(false)
        .centerBar(true)
        .dimension(cityDim)
        .group(cityGroup)
        .x(d3.scale.ordinal().range([minCity, maxCity]))
        .xUnits(dc.units.ordinal)
        .renderLabel(true)
        .xAxisLabel("County/City")
        .elasticX(true)
        .colors(d3.scale.category10())
        .on('renderlet.somename', function(cityGroupChart){
            cityGroupChart.selectAll("g.x text")
            .attr('transform', "rotate(-65)");
            // cityGroupChart.selectAll("g rect")
            // .attr("fill", function(d){return(colorScale(d));});
            })
        .renderHorizontalGridLines(true);


    stagesofCompletionChart
        .height(300)
        .radius(100)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(stagesCompletionDim)
        .group(stageofCompletionGroup);




    bodyCount
        .dimension(ndx)
        .group(all);

    bodyTable
        .dimension(bodyDim)
        .group(function (d) {

            return d["approved_housing_body"];
        })
        .columns(["approved_housing_body", "County_City", "number_of_units"]);




    dc.renderAll();


}

