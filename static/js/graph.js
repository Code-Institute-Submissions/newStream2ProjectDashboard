queue()
    .defer(d3.json, '/socialHousing/projects')
    .await(makeGraphs);
function makeGraphs(error, socialHousingProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    socialHousingProjects.forEach(function (d) {
        d.county = d["la"];
        d.number_of_Units = +d["number_of_units"];
        d.site_start = d["site_start"] + d["site_finish"];
    });


    var ndx = crossfilter(socialHousingProjects);
    var all = ndx.groupAll();


    var cityDim = ndx.dimension(function (d) {
        return d["la"];
    });
    var numberOfUnitsDim = ndx.dimension(function (d) {
        return d["number_of_units"];
    });
    var siteStart = ndx.dimension(function (d) {
        if (d.site_start!=="null") {return d.site_start;}
    });

    var numberOfUnitsGroupDim = cityDim.group().reduceCount(function (d) {
        return d["number_of_units"];
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
            return "No Stage";
        }
    });







    var cityGroup = cityDim.group();
    var numberOfUnitsGroup = numberOfUnitsDim.group();
    var siteStartGroup = siteStart.group();
    var stageofCompletionGroup = stagesCompletionDim.group().reduceSum(function(d) {
        return d["number_of_units"];
    });



    var maxCity = cityDim.bottom(1)[0]["la"];
    var minCity = cityDim.top(1)[0]["la"];


    var colorScale = d3.scale.ordinal()
                    .domain([minCity, maxCity])
                   .range(["green","blue"]);


    var cityGroupChart = dc.barChart("#housesPerArea");
    var siteStartChart = dc.rowChart("#site-stage");
    var selectField = dc.selectMenu("#menu-select");

    var stagesofCompletionChart = dc.pieChart("#stageofCompletion-chart");

    selectField
        .dimension(cityDim)
        .group(cityGroup);

    siteStartChart
        .height(300)
        .dimension(siteStart)
        .group(siteStartGroup);


    cityGroupChart
        .width(1300)
        .height(500)
        .margins({top: 10, right: 10, bottom: 55, left: 40})
        .gap(15)
        .brushOn(false)
        .centerBar(true)
        .dimension(cityDim)
        .group(cityGroup)
        .x(d3.scale.ordinal().range([minCity, maxCity]))
        .xUnits(dc.units.ordinal)
        .renderLabel(true)
        .xAxisLabel("County/City")
        .elasticX(true)

        .on('renderlet.somename', function(cityGroupChart){
            cityGroupChart.selectAll("g.x text")
            .attr('transform', "rotate(-65)");
            cityGroupChart.selectAll("g rect")
            .attr("fill", function(d){return(colorScale(d));});
})
        .renderHorizontalGridLines(true);

    stagesofCompletionChart
        .height(300)
        .radius(120)
        .innerRadius(60)
        .transitionDuration(1500)
        .dimension(stagesCompletionDim)
        .group(stageofCompletionGroup);




    dc.renderAll();


}

