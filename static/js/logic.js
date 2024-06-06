let map = L.map('map').setView([0, 0], 2); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

d3.json(url).then(data => {
        data.features.forEach(feature => {


            let magnitude = feature.properties.mag;
            let depth = feature.geometry.coordinates[2];
            
            let marker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                radius: magnitude * 2, 
                fillColor: getColor(depth), 
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);
            
            marker.bindPopup(`<b>Location:</b> ${feature.properties.place}<br><b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km`);
            });
            });
            
            
            function getColor(depth) {
            if (depth < 10) {
            return 'green';
            } else if (depth < 30) {
            return 'yellow';
            } else if (depth < 50) {
            return 'orange';
            } else {
            return 'red';
            }
            }
            
            
            let legend = L.control({ position: 'bottomright' });
            
            legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend');
            div.innerHTML += '<h4>Depth Legend</h4>';
            div.innerHTML += '<i style="background: green"></i> <10 km<br>';
            div.innerHTML += '<i style="background: yellow"></i> 10-30 km<br>';
            div.innerHTML += '<i style="background: orange"></i> 30-50 km<br>';
            div.innerHTML += '<i style="background: red"></i> >50 km<br>';
            
            return div;
};
legend.addTo(map);
