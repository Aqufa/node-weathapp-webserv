const request = require('request');

const forecast = (lat, long, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=88cf14cea7bca519026605552ccb73f5&query=${lat},${long}&units=m`;

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Please check your internet', undefined);
        }
        else if(body.error){
            callback('Please enter a correct location and try again', undefined);
        }
        else{
            callback(undefined, {Current_temp: body.current.temperature,
                                 Feels_like: body.current.feelslike,
                                weather_description:body.current.weather_descriptions}
            )
        }
    })
}

module.exports = forecast;

