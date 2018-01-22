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
        d.site_start = d["site_start"];
        d.site_finish = d["site_finish"];
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
        return d["site_start"];
    });
    var siteFinish = ndx.dimension(function (d) {
        return d["site_finish"];
    });
    var numberOfUnitsGroupDim = cityDim.group().reduceCount(function (d) {
        return d["number_of_units"];
    });


    var cityGroup = cityDim.group();
    var numberOfUnitsGroup = numberOfUnitsDim.group();
    var siteStartGroup = siteStart.group();
    var siteFinishGroup = siteFinish.group();

    var maxCity = cityDim.bottom(1)[0]["la"];
    var minCity = cityDim.top(1)[0]["la"];


    var numberOfHousesPerCountyorCity = cityDim.group().reduceSum(function (d) {
        return d.number_of_Units
    });

    var cityGroupChart = dc.barChart("#housesPerArea");
    var siteStartChart = dc.pieChart("#pie-chart-one");
    var selectField = dc.selectMenu("#menu-select");
    var siteFinishChart = dc.pieChart("#pie-chart-two");


    selectField
        .dimension(cityDim)
        .group(cityGroup);

    siteStartChart
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(siteStart)
        .group(siteStartGroup);

    siteFinishChart
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(2000)
        .dimension(siteFinish)
        .group(siteFinishGroup);


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

        .renderlet(function(cityGroupChart){
            cityGroupChart.selectAll("g.x text")
            .attr('transform', "rotate(-65)");
})
        .renderHorizontalGridLines(true);


    dc.renderAll();


}

