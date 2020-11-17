
// Store our API endpoint inside queryUrl
var queryUrl = 'https://raw.githubusercontent.com/DanielKarpowicz/final_project_plays_prediction/jiaping/jiaping/Resources/team_info.json';

// create a titlelayer as the background
var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v9",
    accessToken: API_KEY
});

// create a map view
var baseMaps = {
    "Grayscale": grayscale,
    "Outdoors": outdoors
};

var ACFlayer = L.layerGroup();
var NCFlayer = L.layerGroup();

var overlayMaps = {
    "ACF": ACFlayer,
    "NCF": NCFlayer
};

var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 4,
    layers: [grayscale,ACFlayer,NCFlayer]
});

L.control.layers(baseMaps, overlayMaps,  {
    collapsed: false
}).addTo(myMap);

// define a function to process information of each team
function teamProcess(teams, layer) {
    console.log("process team", teams);
    teams.forEach((team) => {
        var conference = team.conference;
        var club = team.club;
        var city = team.city;
        var division = team.division;
        var capacity = team.capacity;
        var abbr = team.abbr;
        var stadium = team.stadium;
        var lon = team.lon;
        var lat = team.lat;
        var head_coach = team.head_coach;
        var logo_address = team.logo_address;
        var icon = L.icon({
            iconUrl: logo_address,
            iconSize: [30, 30]
        });
         
        var marker = L.marker([lat, -lon], {icon: icon }).addTo(myMap);
        marker.bindPopup(`<h3>Club: ${club}<br>
        Head Coach: ${head_coach}<br>
        Confercence: ${conference}<br>
        Division: ${division}<br>
        City: ${city}<br>
        Statium: ${stadium}<br>
        Capacity: ${capacity}</h3>`).addTo(layer);
    });

};

// access the data in stored in the team info json API
d3.json(queryUrl).then(function (teams) {
    ACFteamsInfo = teams.filter(team => team.conference === 'American Football Conference');
    NCFteamsInfo = teams.filter(team => team.conference === 'National Football Conference');
    console.log('ACFteamsInfo', ACFteamsInfo);
    console.log('NCFteamsInfo', NCFteamsInfo);

    teamProcess(ACFteamsInfo, ACFlayer);
    teamProcess(NCFteamsInfo, NCFlayer);
});





