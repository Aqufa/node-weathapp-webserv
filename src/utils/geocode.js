
const request = require('request');
const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXF1aWI0NTYiLCJhIjoiY2tkdG54dGM5MDVjMzJybno4czI3bXptbSJ9.svK5JpvP8wtOGR0JmSxkWg&limit=1`
    request({url: url, json: true}, (error, {body})=>{
        if(error){
            callback('unable to connect to the services', undefined);
        }
        else if(body.features.length===0){
            
            callback('unable to search location. Try another location', undefined);
        }
        else{
            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode