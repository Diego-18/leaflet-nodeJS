const map = L.map('map-template').setView([6.2473725, -75.6252786], 3);
const socket = io();

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';       //url of the tile

map.locate({enableHighAccuracy: true});                                     // enable high accuracy

/**
 * Event that is executed when the user's location is found.
 */
map.on('locationfound', e =>{                           
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker =  L.marker(coords);
    L.tileLayer(tileURL).addTo(map);
    marker.bindPopup('You are here!');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng);
});

/**
 * Receive coordinates from another user
 */
socket.on('newUserCoordinates', (coords) => {
    console.log('New User is Connected.');
    const marker =  L.marker([coords.lat, coords.lng]);
    marker.bindPopup('You are here!');
    map.addLayer(marker);
});