// coding by JasonXDDDD

var aname, bname;
var coordRecord = [];
var record = [];

// get txt address 
(function controlInit() {
    $.get("res/LocationXDDD.txt", function(data, status) {
        record = JSON.parse(data);

        record.forEach(function(element, index) {
            moveMarker(element, index, 150 * index);
        });
    });
})();


// google map
var markers = [];
var map, marker, polyPath, info_window;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 23.5584447, lng: 119.6161855 }
    });

    marker = new google.maps.Marker({
        position: { lat: 23.5584447, lng: 119.6161855 },
        map: map
    });

    info_window = new google.maps.InfoWindow({
        content: ""
    });
    info_window.open(map, marker);


    polyPath = new google.maps.Polyline({
        geodesic: true,
        strokeColor: '#FF00AA',
        strokeOpacity: .5,
        strokeWeight: 5,
        map: map
    });

}


function addPolyLine(position, timeout) {
    window.setTimeout(function() {
        polyPath.getPath().push(position);
    }, timeout);
}

function addMarker(position, title, timeout) {
    window.setTimeout(function () {
        info_window.close();

        var markers_item;       
        markers_item = new google.maps.Marker({
            position: position,
            map: map,
            icon: "http://india.ashoka.org/sites/all/themes/ustheme/images/a-sidebar-get-volunteer-icon.png",
            animate: google.maps.Animation.DROP
        });

        info_window = new google.maps.InfoWindow({
            content: '<p>' + title + '</p>'
        });

        info_window.open(map, markers_item);
        
        markers.push(markers_item);
    
    }, timeout);
}

function moveMarker(position, index, timeout) {

    var timer = window.setTimeout(function() {
        map.panTo(position);
        marker.setPosition(position);

        coordRecord.push(position);
        addPolyLine(new google.maps.LatLng(position), 0);
 

        //set view        
        $('#show').append("<button onclick='setRecord(" + index + ")'>" + position.lat + ", " + position.lng + "</button>");
        $('#show').scrollTop($("#show")[0].scrollHeight);


        if(Math.abs(position.lat - landmarker[landID].latlng.lat) < 0.001 &&
           Math.abs(position.lng - landmarker[landID].latlng.lng) < 0.001
        ){
            addMarker(landmarker[landID].latlng, landmarker[landID].title, 0);
            landID ++;
        }

    }, timeout);
}


function addCircle711(position, timeout) {
    setTimeout(function() {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: 100
        });

    }, timeout);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


// set landmarker
var landmarker = [], landID = 0;

(function() {
    $.get("res/XDD_DBInfo.txt", function(data, status) {
        landmarker = JSON.parse(data);
    });
})();


//click listener
function setRecord(index) {
    map.panTo(record[index]);
    marker.setPosition(record[index]);
}