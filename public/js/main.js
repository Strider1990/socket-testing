const NOTIFICATION_SHORT = 3000;
const NOTIFICATION_LONG = 5000;

document.addEventListener("DOMContentLoaded", function (event) {
  var socket = io();

  var usersBar = $("#user-list");

  requestNotification();
  //retrieveData()
  //  .then((data) => {
  //    createBarChart();
  //    generateBarChart(data);

      document.getElementById("increment").addEventListener('click', function(e) {
        e.preventDefault();
        socket.emit('data change', 10);
      });

      document.getElementById("decrement").addEventListener('click', function(e) {
        e.preventDefault();
        socket.emit('data change', -10);
      });

      document.getElementById("upper_threshold_button").addEventListener('click', function(e) {
        e.preventDefault();
        socket.emit('set threshold', "UPPER", document.getElementById("upper_threshold").value)
      });

      document.getElementById("lower_threshold_button").addEventListener('click', function(e) {
        e.preventDefault();
        socket.emit('set threshold', "LOWER", document.getElementById("lower_threshold").value);
      });

      socket.on('current data', function(data) {
        if (!svg) {
          createBarChart();
          generateBarChart(data);
        } else {
          update(data);
        }
      });

      socket.on('connection', function(id) {
        notifyMe("New Connection", id, NOTIFICATION_SHORT);
        addListItem(id);
      });

      socket.on('disconnect', function(id) {
        notifyMe("Disconnect", id, NOTIFICATION_SHORT);
        $("#"+id).remove();
      });

      socket.on('user list', function(user, users) {
        usersBar.empty();
        usersBar.append("<h3>Users List</h3>")
        for (var i=0;i < users.length;i++) {
          if (users[i] !== user) {
            addListItem(users[i]);
          }
        }
      });

      function addListItem(id) {
        var li = $("<li id="+id+">"+ id +"</li>");
        usersBar.append(li);
        li.click(function(e) {
          socket.emit('sendPing', e.target.id);
          //notifyMe("Clicked", e.target.id, 3000);
        })
      }

      socket.on('notification', function(msg){
        notifyMe("Socket Header", msg, NOTIFICATION_LONG);
      });
      
      socket.on('data change', function(data) {
        update(data);
      });

      socket.on('alert', function(header, msg) {
        notifyMe(header, msg, NOTIFICATION_SHORT);
      });

      socket.on('receivedPing', function(msg) {
        notifyMe("Received a ping!", msg, NOTIFICATION_SHORT);
      });
  //});
});

var margin = {top: 20, right: 20, bottom: 70, left: 40},
width = 900 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;
var x, y, svg;
var data2;

function createBarChart() {
  svg = d3.select("#bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");
}

function generateBarChart(data) {
  // Parse the date / time
  //var	parseDate = d3.time.format("%Y-%m").parse;

  // Make Axis of Bar Chart
  x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    //.tickFormat(d3.time.format("%Y-%m"));

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");
  
  data.forEach(function(d) {
    if (d.value < 0) {
      d.value = 0;
    } else {
      d.value = +d.value;
    }
  });

  updateBarChart(data);
}

function update(data) {
  var	parseDate = d3.time.format("%Y-%m").parse;

  redrawAxis(data);
  updateBarChart(data);
  
}

function updateBarChart(data) {
  var bar = svg.selectAll(".bar").data(data, function(d) {  return d.date });

  /**
   * Remove non-existent data
   */
  bar.exit().remove();

  /**
   * Add existing data
   */
  bar.enter().append("rect")
    .style("fill", "steelblue")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.date); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });
  
  /**
   * Update existing bars
   */
  bar.transition()
    .attr("x", function(d) { return x(d.date); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });
}

function redrawAxis(data) {
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  
  svg.selectAll("g.x.axis")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.selectAll("g.y.axis")
    .call(yAxis);
}

function requestNotification() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission(function (permission) {
      if (permission === "denied") {
        alert("Permission denied :(");
      } else {
        notifyMe("Permission Granted!", "You will now receive notifications.", NOTIFICATION_SHORT);
      }
    });
  }
}

function notifyMe(header, body, timeout) {
  var options = {
    body: body
  };
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
  } else if (Notification.permission === "granted") {
    var notification = new Notification(header, options);
    setTimeout(notification.close.bind(notification), timeout);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(header, options);
        setTimeout(notification.close.bind(notification), timeout);
      }
    });
  }
}

function retrieveData() {
  return new Promise((resolve, reject) => {
    $.post("http://localhost:8080/")
      .done(function (data) {resolve(data);})
      .fail(function (err) {reject(err)});
  });
}