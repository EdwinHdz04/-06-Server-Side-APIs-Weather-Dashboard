//Global Variables

var resultCity=document.querySelector("#resultCity");
var currentTemp=$("#currentTemp");
var currentWind=$("#currentWind");
var currentHumidity=$("#currentHumidity");
var 
apiKey="46f48b1c2591f014d5caac1646b6d3ff"


//This function will be populating the results of the weather
function populateResults(result) {
    
   console.log(result)
   currentTemp.append("Temp: "+ result.temp + " &#176;F");
   currentHumidity.append("Humidity: " + result.humidity + "%");
   currentWind.append("Wind: " + result.wind + " MPH ");
   resultCity.textContent = result.city;

    
}

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
                const result ={ 
                     temp : response.list[0].main.temp,
                     wind : response.list[0].wind.speed,
                     humidity : response.list[0].main.humidity,
                     city : response.city.name
                }
                
                 populateResults(result);

                
            })

   
  })

}
var result= fetchlonlat("San Francisco")
