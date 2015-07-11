// start slingin' some d3 here.

var width = 960;
var height = 500;

var enemies = [];

for(var i = 0; i < 30; i++) {
  enemies[i] = {}
}

// var Enemy = function() {
//   this.x = Math.random() * width
//   this.y = Math.random() * height
// }

// Enemy.prototype.update = function() {
//   this.e.transition.duration().attr('cs')
// }

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

var update = function(array) {
  for(var i = 0; i < array.length; i++) {
    enemies[i].x = Math.random()*width;
    enemies[i].y = Math.random()*height;
  }

  var circEnemy = svg.selectAll("circle").data(enemies);
    circEnemy
    .transition()
    .duration(5000)
    .attr("class", "enemy")
    .attr("cx", function (d){return d.x;})
    .attr("cy", function (d){return d.y;})
    .attr("r", 15)
    .attr("fill", "red");
}



// var update = function(data) {

//   // var enemy = svg.selectAll('circle').data(data);
//   // enemy.append('circle');
// }
update(enemies);
setInterval(function() {
  update(enemies)
}, 5000);