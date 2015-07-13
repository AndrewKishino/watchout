// start slingin' some d3 here.
var width = 960;
var height = 500;
var current = document.getElementsByClassName("currentScore")[0].innerHTML;
var high = document.getElementsByClassName("highScore")[0].innerHTML;
var collisionCount = document.getElementsByClassName("collisionCount")[0].innerHTML;
var enemies = [];

for(var i = 0; i < 20; i++) {
  enemies[i] = {};
}

for(var i = 0; i < enemies.length; i++) {
    enemies[i].x = Math.random()*width;
    enemies[i].y = Math.random()*height;
  } 

var drag = d3.behavior.drag().on('drag', function() { 
  if(d3.event.x > 15 && d3.event.x < width-15) {
    hero.attr('cx', d3.event.x); 
  }
  if(d3.event.y > 15 && d3.event.y < height-15) {
    hero.attr('cy', d3.event.y); 
  }
});

var svg = d3.select(".container").append("svg")
  .attr("class", "board")
  .attr("width", width)
  .attr("height", height);

svg.selectAll(".enemy").data(enemies)
  .enter().append("image")
  .attr("width", "30")
  .attr("height", "30")
  .attr("xlink:href", "Shuriken.png")
  .attr("class", "enemy")
  .attr("x", function (d){return d.x;})
  .attr("y", function (d){return d.y;});

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

  svg.selectAll(".enemy").data(enemies)
    .transition()
    .duration(1500)
    .attr("class", "enemy")
    .attr("x", function (d){return d.x;})
    .attr("y", function (d){return d.y;})
}

var checkCollisions = function() {
  for(var i = 0; i < 20; i++) {
    var run = hero[0][0].getAttribute('cx') - document.getElementsByClassName('enemy')[i].getAttribute("x");
    var rise = hero[0][0].getAttribute('cy') - document.getElementsByClassName('enemy')[i].getAttribute("y");
    
    if(Math.sqrt((rise*rise)+(run*run)) < 20) {
      document.getElementsByClassName("currentScore")[0].innerHTML=0;
      collisionCount = document.getElementsByClassName("collisionCount")[0].innerHTML++;
    }
  }
}

update(enemies);

setInterval(function(){
  if(Number(document.getElementsByClassName("highScore")[0].innerHTML) < Number(document.getElementsByClassName("currentScore")[0].innerHTML)) {
    document.getElementsByClassName("highScore")[0].innerHTML = document.getElementsByClassName("currentScore")[0].innerHTML;
  }
  if(document.getElementsByClassName("currentScore")[0].innerHTML > 5) {
    checkCollisions();
  }
}, 10);

setInterval(function(){
  current = document.getElementsByClassName("currentScore")[0].innerHTML++;
}, 100);

setInterval(function() {
  update(enemies);
}, 1500);