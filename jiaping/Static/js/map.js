
// Store our API endpoint inside queryUrl
var queryUrl = 'https://raw.githubusercontent.com/DanielKarpowicz/final_project_plays_prediction/jiaping/jiaping/Resources/team_info.json';
var queryUrl2 = 'https://raw.githubusercontent.com/DanielKarpowicz/final_project_plays_prediction/jiaping/jiaping/Resources/team_info.geojson'

var myMap = L.map("map", {
    center: [35.52, -100.67],
    zoom: 4
    // layers: [grayscale]
});
// create a titlelayer as the background
// var grayscale = 
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap);


// var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "outdoors-v9",
//     accessToken: API_KEY
// });

// // create a map view
// var baseMaps = {
//     "Grayscale": grayscale,
//     "Outdoors": outdoors
// };

// var ACFlayer = L.layerGroup();
// var NCFlayer = L.layerGroup();

// var overlayMaps = {
//     "ACF": ACFlayer,
//     "NCF": NCFlayer
// };

// var myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 4,
//     layers: [grayscale,ACFlayer,NCFlayer]
// });



// L.control.layers(baseMaps, overlayMaps,  {
//     collapsed: false
// }).addTo(myMap);

// // define a function to process information of each team
// function teamProcess(teams, layer) {
//     console.log("process team", teams);
//     teams.forEach((team) => {
//         var conference = team.conference;
//         var club = team.club;
//         var city = team.city;
//         var division = team.division;
//         var capacity = team.capacity;
//         var abbr = team.abbr;
//         var stadium = team.stadium;
//         var lon = team.lon;
//         var lat = team.lat;
//         var head_coach = team.head_coach;
//         var logo_address = team.logo_address;
//         var icon = L.icon({
//             iconUrl: logo_address,
//             iconSize: [30, 30]
//         });

//         var marker = L.marker([lat, lon], {icon: icon }).addTo(myMap);
//         marker.bindPopup(`<h2>${club}</h2><hr>
//         <h3>
//         Head Coach: ${head_coach}<br>
//         Confercence: ${conference}<br>
//         Division: ${division}<br>
//         City: ${city}<br>
//         Statium: ${stadium}<br>
//         Capacity: ${capacity}
//         </h3>`).addTo(layer);
//     });

// };

// // access the data in stored in the team info json API
// d3.json(queryUrl).then(function (teams) {
//     ACFteamsInfo = teams.filter(team => team.conference === 'American Football Conference');
//     NCFteamsInfo = teams.filter(team => team.conference === 'National Football Conference');
//     console.log('ACFteamsInfo', ACFteamsInfo);
//     console.log('NCFteamsInfo', NCFteamsInfo);

//     teamProcess(ACFteamsInfo, ACFlayer);
//     teamProcess(NCFteamsInfo, NCFlayer);
// });



// added divison filters
// geojson
let checkboxStates

d3.json(queryUrl2).then(function (teams) {

    const geojsonLayer = L.geoJSON(null, {
        filter: (feature) => {
            const isDivisionChecked = checkboxStates.divisions.includes(feature.properties.division)
            const isConferenceChecked = checkboxStates.conferences.includes(feature.properties.conference)
            return isDivisionChecked && isConferenceChecked //only true if both are true
        }
    }).addTo(myMap)

    function updateCheckboxStates() {
        checkboxStates = {
            divisions: [],
            conferences: []
        }

        for (let input of document.querySelectorAll('input')) {
            if (input.checked) {
                switch (input.className) {
                    case 'conference': checkboxStates.conferences.push(input.value); break
                    case 'division': checkboxStates.divisions.push(input.value); break
                }
            };
        }
    };


    for (let input of document.querySelectorAll('input')) {
        //Listen to 'change' event of all inputs
        input.onchange = (e) => {
            geojsonLayer.clearLayers()
            updateCheckboxStates()
            geojsonLayer.addData(teams)
        }
    }


    /****** INIT ******/
    updateCheckboxStates()
    geojsonLayer.addData(teams)
});









// json 
// function updateCheckboxStates() {
//     checkboxStates = {
//         divisions: [],
//         conferences: []
//     }

//     for (let input of document.querySelectorAll('input')) {
//         if (input.checked) {
//             switch (input.className) {
//                 case 'conference': checkboxStates.conferences.push(input.value); break
//                 case 'division': checkboxStates.divisions.push(input.value); break
//             }
//         }
//     }
// };

// function filtration(team) {
//     const isDivisionChecked = checkboxStates.divisions.includes(team.division)
//     const isConferenceChecked = checkboxStates.conferences.includes(team.conference)
//     return isDivisionChecked && isConferenceChecked //only true if both are true
// };

// function teamProcess(teams, layer) {
//     console.log("process team", teams);
//     teams.forEach((team) => {
//         var conference = team.conference;
//         var club = team.club;
//         var city = team.city;
//         var division = team.division;
//         var capacity = team.capacity;
//         var abbr = team.abbr;
//         var stadium = team.stadium;
//         var lon = team.lon;
//         var lat = team.lat;
//         var head_coach = team.head_coach;
//         var logo_address = team.logo_address;
//         var icon = L.icon({
//             iconUrl: logo_address,
//             iconSize: [30, 30]
//         });

//         var marker = L.marker([lat, lon], {icon: icon }).addTo(myMap);
//         marker.bindPopup(`<h2>${club}</h2><hr>
//         <h3>
//         Head Coach: ${head_coach}<br>
//         Confercence: ${conference}<br>
//         Division: ${division}<br>
//         City: ${city}<br>
//         Statium: ${stadium}<br>
//         Capacity: ${capacity}
//         </h3>`).addTo(layer);
//     });

// };


// d3.json(queryUrl).then(function (teams) {
//     teams.forEach((team) => {
//         var conference = team.conference;
//         var club = team.club;
//         var city = team.city;
//         var division = team.division;
//         var capacity = team.capacity;
//         var abbr = team.abbr;
//         var stadium = team.stadium;
//         var lon = team.lon;
//         var lat = team.lat;
//         var head_coach = team.head_coach;
//         var logo_address = team.logo_address;
//         var icon = L.icon({
//             iconUrl: logo_address,
//             iconSize: [30, 30]
//         });

//         if (filtration(team)) {
//             var marker = L.marker([lat, lon], { icon: icon })
//             var geojsonLayer = marker.addTo(myMap)
//         };
//         // var marker = L.marker([lat, lon], {icon: icon},{
//         //     filter: (team) => {
//         //         const isDivisionChecked = checkboxStates.divisions.includes(team.division)
//         //         const isConferenceChecked = checkboxStates.conferences.includes(team.conference)
//         //         return isDivisionChecked && isConferenceChecked //only true if both are true
//         //       }
//         // }).addTo(myMap);

//         marker.bindPopup(`<h2>${club}</h2><hr>
//         <h3>
//         Head Coach: ${head_coach}<br>
//         Confercence: ${conference}<br>
//         Division: ${division}<br>
//         City: ${city}<br>
//         Statium: ${stadium}<br>
//         Capacity: ${capacity}
//         </h3>`).addTo(myMap);
//     });
//     // 
//     // const geojsonLayer = L.marker(null,{
//     //     filter: (team) => {
//     //     const isDivisionChecked = checkboxStates.divisions.includes(team.division)
//     //     const isConferenceChecked = checkboxStates.conferences.includes(team.conference)
//     //     return isDivisionChecked && isConferenceChecked //only true if both are true
//     //   }
//     // }).addTo(myMap)
//     // 
//     for (let input of document.querySelectorAll('input')) {
//         //Listen to 'change' event of all inputs
//         input.onchange = (e) => {
//             geojsonLayer.clearLayers()
//             updateCheckboxStates()
//             // geojsonLayer.addData(teams)
//             teamProcess(teams, geojsonLayer)
//         }
//     }
//     /****** INIT ******/
//     updateCheckboxStates()
//     // geojsonLayer.addData(teams)
//     teamProcess(teams, geojsonLayer)
// });








