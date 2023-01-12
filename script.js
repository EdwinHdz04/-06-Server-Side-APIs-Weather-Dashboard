//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=
var apiKey="46f48b1c2591f014d5caac1646b6d3ff"

//The function will be getting the general weather data.
function fetchlonlat(city){
    var requestUrl= "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=" + apiKey + "&contentType=json"
     return fetch(requestUrl).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        
        console.log(response)
        var cityLon = response[0].lon;
        var cityLat = response[0].lat;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`)
           
            .then(function(response) {
                
                return response.json();
            })
      
            .then(function(response){
                var temp = response.list[0].main.temp
                var wind = response.list[0].wind.speed
                var humidity = response.list[0].main.humidity

                
            })

      
  })

}
var result= fetchlonlat("San Francisco")
