// start slingin' some d3 here.

var width = 960;
var height = 500;

var enemies = [];

for(var i = 0; i < 30; i++) {
  enemies[i] = {}
}

var drag = d3.behavior.drag().on('drag', function() { 
  if((d3.event.x > 0 && d3.event.x < width) && (d3.event.y > 0 && d3.event.y < height)) {
    hero.attr('cx', d3.event.x)
        .attr('cy', d3.event.y); 
  }
});
   // .on('dragstart', function() { hero.style('fill', 'black'); })
   // .on('dragend', function() { hero.style('fill', 'black'); });


var svg = d3.select(".container").append("svg")
  .attr("class", "board")
  .attr("width", width)
  .attr("height", height);

svg.selectAll("circle").data(enemies)
  .enter().append("circle")
  .attr("class", "enemy")
  .attr("cx", function (d){return d.x;})
  .attr("cy", function (d){return d.y;})
  .attr("r", 15)
  .attr("fill", "red");

var hero = d3.select(".board").append("circle")
  .attr("class", "hero")
  .attr("cx", width/2)
  .attr("cy", height/2)
  .attr("r", 15)
  .attr("fill", "black")
  .call(drag);

var update = function(array) {
  for(var i = 0; i < array.length; i++) {
    enemies[i].x = Math.random()*width;
    enemies[i].y = Math.random()*height;
  }

  svg.selectAll("circle").data(enemies)
    .transition()
    .duration(1500)
    .attr("class", "enemy")
    .attr("cx", function (d){return d.x;})
    .attr("cy", function (d){return d.y;})
    .attr("r", 15)
    .attr("fill", "red");
}

update(enemies);

setInterval(function() {
  update(enemies)
}, 1500);

var move = function() {
  var mouse = d3.mouse(this);
  x1 = mouse[0];
  y1 = mouse[1];
  d3.event.preventDefault();
}