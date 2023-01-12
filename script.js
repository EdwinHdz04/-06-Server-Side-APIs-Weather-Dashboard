//Global Variables

var resultCity=document.querySelector("#resultCity");
var currentTemp=$("#currentTemp");
var currentWind=$("#currentWind");
var currentHumidity=$("#currentHumidity");
var 
apiKey="46f48b1c2591f014d5caac1646b6d3ff"



//This function will be populating the results of the weather
function populateResults(result) {
    
   console.log(result[0])
   currentTemp.text("Temp: "+ result[0].temp + "F");
   currentHumidity.text("Humidity: " + result[0].humidity + "%");
   currentWind.text("Wind: " + result[0].wind + " MPH ");
   resultCity.textContent = result.city;
   
   for (var i = 1; i <= 5; i++) {
    $("#day"+i+" > .date").text(result[i].date.toString().substring(0,16))
    $("#day"+i+" > .Temp").text("Temp: "+ result[i].temp + "F");
    $("#day"+i+" > .wind").text("wind: "+ result[i].wind + " MPH ");
    $("#day"+i+" > .Humidity").text("Humidity: "+ result[i].humidity + " % ");
   } 


    
}
// called when the search form is submitted
document.querySelector("#SearchBtn").addEventListener("click",function (event) {
    event.preventDefault()
    var search =$("#SearchCity").val()
    addtohistory(search)
    fetchlonlat(search)


})

//event listener for the san francisco button
document.querySelector("#sanfrancisco").addEventListener("click",function (event) {
    event.preventDefault()
    fetchlonlat("san francisco")

})

//this is the function to add the history
function addtohistory(name){
    
    var test = $('<button/>',
    {
        text: name ,
        click: function (event) { event.preventDefault()
            fetchlonlat(name)}
    });

    var parent = $('<tr><td></td></tr>').children().append(test).end();
    $("#searchhistory tr:last").before(parent);

    
}



//The function will be getting the general weather data.
function fetchlonlat(city){
    var requestUrl= "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=" + apiKey + "&contentType=json"
     return fetch(requestUrl).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        
        
        var cityLon = response[0].lon;
        var cityLat = response[0].lat;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial&cnt=40`)
           
            .then(function(response) {
                
                return response.json();
            })
      
            .then(function(response){
                
                var result ={ 
                0:{
                     date : new Date(response.list[0].dt*1000),
                    temp : response.list[0].main.temp,
                    wind : response.list[0].wind.speed,
                    humidity : response.list[0].main.humidity,},
                1:{
                     date : new Date(response.list[8].dt*1000),
                    temp : response.list[8].main.temp,
                    wind : response.list[8].wind.speed,
                    humidity : response.list[8].main.humidity,},
                2:{
                     date : new Date(response.list[16].dt*1000),
                    temp : response.list[16].main.temp,
                    wind : response.list[16].wind.speed,
                    humidity : response.list[16].main.humidity,},
                3:{
                     date : new Date(response.list[24].dt*1000),
                    temp : response.list[24].main.temp,
                    wind : response.list[24].wind.speed,
                    humidity : response.list[24].main.humidity,},
                4:{
                     date : new Date(response.list[32].dt*1000),
                temp : response.list[32].main.temp,
                wind : response.list[32].wind.speed,
                humidity : response.list[32].main.humidity,},
                5:{
                     date : new Date(response.list[39].dt*1000),
                temp : response.list[39].main.temp,
                wind : response.list[39].wind.speed,
                humidity : response.list[39].main.humidity,},
                
                
                }
                
                result.city = response.city.name
             
                 populateResults(result);

                
            })

   
  })

}
var result= fetchlonlat("San Francisco")
