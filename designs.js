var margin = {top: 30, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xscale = d3.scalePoint()
    .range([0, width], 1);

var yAxis = d3.axisLeft();

var svg = d3.select("parallel").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("BSM-Project.csv", function(error, bsm) {
  if (error) throw error;
  
  xscale.domain(dimensions = d3.keys(bsm[0]).filter(function(d) {
    return d != "Date" && (yAxis[d] = d3.scaleLinear()
        .domain(d3.extent(bsm, function(p) { return +p[d]; }))
        .range([height, 0]));
  }));

  // Add grey background lines for context.
  background = svg.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(bsm)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  foreground = svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(bsm)
    .enter().append("path")
      .attr("d", path);

  // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + xscale(d) + ")"; });

  
});

// Returns the path for a given data point.
function path(d) {
  return(dimensions.map(function(p) { return [xscale(p), yAxis[p](d[p])]; }));
  
/
}
}