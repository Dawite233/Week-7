

minneapliseForecastUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast\n'
let weatherForecastTableElement = document.querySelector('#weather-forecast')

fetch(minneapliseForecastUrl) // return a Promise
    .then( weatherResponse => weatherResponse.json())  // to get data from promise
    // convert the byte in the response content to JSON
    // .Json() returns a Promise since teh conversation is not instant
    // .json() promise to provide JSON, or an error (e,g if the JSONis malformed)
    // to get data from a promise, use then() with callback function which is called
    // if the promise worked  - we have data
    .then(weatherJson  => {  // actual JSON
        console.log(weatherJson)
        displayForecastInTable(weatherJson)
    })

    .catch(error => {
        console.log(error)
        alert('Sorry, Something went wrong.') // this is for users

    })


function displayForecastInTable(weatherJson) {

    // extract the forecast periods array, dont need any of teh other data
    //This is an array so we can loop over it
    let weatherForecastPeriods = weatherJson.properties.periods

    weatherForecastPeriods.focus(forecast => {
        let forecastPeriodName = forecast.name
        let temperature = forecast.temperature
        let temperatureUnite = forecast.temperatureUnite
        let forecastIconUrl = forecast.icon

        // Todo get forecast description 'detaileForecast'
        // Todo get wind speed and direction, display in table

        // create a table data, add to table
        let forecastRow = document.createElement('tr')
        weatherForecastTableElement.appendChild(forecastRow)

        // create table data for temp
        let forecastTemperatureTableData = document.createElement('td')
        forecastTemperatureTableData.innerHTML = `${temperature} ${temperatureUnite}`

        let forecastIconTableData = document.createElement('td')
        let forecastIconImg = document.createElement('img')
        forecastIconImg.src=forecastIconUrl

        forecastTemperatureTableData.appendChild(forecastIconImg)

        // Add the table data to the row

        forecastRow.appendChild(forecastPeriodName)
        forecastRow.appendChild(forecastTemperatureTableData)
        forecastRow.appendChild(forecastIconTableData)
    })
    console.log(weatherForecastPeriods);
}