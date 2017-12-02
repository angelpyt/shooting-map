
// Function to draw your map
var drawMap = function() {

// Create map and set view
  var map = L.map('map').setView([40, -100], 5)


// Create a tile layer variable using the appropriate url
  var layer =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

// Add the layer to your map
  layer.addTo(map)

// Execute your function to get data
  getData(map)

}

// Function for getting data

var getData = function(map) {
// Execute an AJAX request to get the data in data/response.js
  $.ajax({
       url:'data/response.json',
       type: "get",
       success:function(data) {
         customBuild(data, map);
       }, 
       dataType:"json"
  });

// When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function( data, map) {
  // Be sure to add each layer to the map
 var  dataWhite = new L.LayerGroup([]);
 var  dataBlack = new L.LayerGroup([]);
 var  dataAsian = new L.LayerGroup([]);
 var  dataAmerican = new L.LayerGroup([]);
 var  dataHawaiian = new L.LayerGroup([]);
 var  dataUnknown = new L.LayerGroup([]);

  var countTL = 0;
  var countTR = 0;
  var countBL = 0;
  var countBR = 0; 
  for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        if (dat["Race"] == "White") {
          if (dat["Victim's Gender"] == "Male") {
            countTL++;
          } else {
            countTR++;
          } 
        } else {
          if (dat["Victim's Gender"] == "Male") {
            countBL++;
          } else {
            countBR++;
          }
        }
      document.getElementById("top-left").innerHTML = countTL;
      document.getElementById("top-right").innerHTML = countTR;
      document.getElementById("bottom-left").innerHTML = countBL;
      document.getElementById("bottom-right").innerHTML = countBR;

      if (dat["Race"] == "White"){  
          var circle = new L.circleMarker([ dat["lat"],  dat["lng"]]);
          circle.addTo( dataWhite);
          var source = "link".link(dat["Source Link"]);
          circle.bindPopup( dat["Summary"]+ " (" + source + ")");
          if (dat["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red", radius: 8, opacity: 0, fillColor: "red", fillOpacity: 0.5});
          } else {
            circle.setStyle({color: "black", radius: 8, opacity: 0, fillColor: "black", fillOpacity: 0.5});
          }
      }
      if ( dat["Race"] == "Black or African American"){  
          var circle = new L.circleMarker([ dat["lat"],  dat["lng"]]);
          circle.addTo( dataBlack);
          var source = "link".link(dat["Source Link"]);
          circle.bindPopup( dat["Summary"]+ " (" + source + ")");
          if ( dat["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red", radius: 8, opacity: 0, fillColor: "red", fillOpacity: 0.5});
          } else {
            circle.setStyle({color: "black", radius: 8, opacity: 0, fillColor: "black", fillOpacity: 0.5});
          }
      }
      if ( dat["Race"] == "Asian"){  
          var circle = new L.circleMarker([ dat["lat"],  dat["lng"]]);
          circle.addTo( dataAsian);
          var source = "link".link(dat["Source Link"]);
          circle.bindPopup( dat["Summary"]+ " (" + source + ")");
          if ( dat["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red", radius: 8, opacity: 0, fillColor: "red", fillOpacity: 0.5});
          } else {
            circle.setStyle({color: "black", radius: 8, opacity: 0, fillColor: "black", fillOpacity: 0.5});
          }
      }
      if ( dat["Race"] == "American Indian or Alaska Native"){  
          var circle = new L.circleMarker([ dat["lat"],  dat["lng"]]);
          circle.addTo( dataAmerican);
          var source = "link".link(dat["Source Link"]);
          circle.bindPopup( dat["Summary"]+ " (" + source + ")");
          if ( dat["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red", radius: 8, opacity: 0, fillColor: "red", fillOpacity: 0.5});
          } else {
            circle.setStyle({color: "black", radius: 8, opacity: 0, fillColor: "black", fillOpacity: 0.5});
          }
      }
      if ( dat["Race"] == "Native Hawaiian or Other Pacific Islander"){  
          var circle = new L.circleMarker([ dat["lat"],  dat["lng"]]);
          circle.addTo( dataHawaiian);
          var source = "link".link(dat["Source Link"]);
          circle.bindPopup( dat["Summary"]+ " (" + source + ")");
          if ( dat["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red", radius: 8, opacity: 0, fillColor: "red", fillOpacity: 0.5});
          } else {
            circle.setStyle({color: "black", radius: 8, opacity: 0, fillColor: "black", fillOpacity: 0.5});
          }
      }
      else if ( dat["Race"] == "Unknown"){  
          var circle = new L.circleMarker([ dat["lat"],  dat["lng"]]);
          circle.addTo( dataUnknown);
          var source = "link".link(dat["Source Link"]);
          circle.bindPopup( dat["Summary"]+ " (" + source + ")");
          if ( dat["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red", radius: 8, opacity: 0, fillColor: "red", fillOpacity: 0.5});
          } else {
            circle.setStyle({color: "black", radius: 8, opacity: 0, fillColor: "black", fillOpacity: 0.5});
          }
      }
}

 var layerGroup = {
     "White":  dataWhite,
     "Black or African American": dataBlack,
     "Asian":  dataAsian,
     "American Indian or Alaska Native":  dataAmerican,
     "Hawaiian or Other Pacific Islander":  dataHawaiian,
     "Unknown":  dataUnknown,
 }

    L.control.layers(null, layerGroup).addTo(map);
}



