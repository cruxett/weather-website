const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e6f2afad213bb8f1f61bfe21e764b106&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error) {
      callback(
        'Unable to find location. Enter a different set of coordinates.'
      );
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
