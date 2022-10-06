    let url = 'https://api.wheretheiss.at/v1/satellites/25544'

    let issLat = document.querySelector('#iss-lat')
    let issLong = document.querySelector('#iss-long')
    let issId = document.querySelector('#id')
    let timeIssLocationFetched = document.querySelector('#time')

    let update = 10000 // 10000 == 10 second
    let maxFailAttempts = 3

    let issMarker
    let icon = L.icon({
        iconUrl: 'iss-icon.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    })




    let map = L.map('iss-map').setView([0, 0], 1)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    iss(maxFailAttempts) // call function one time start
    //setInterval(iss, update)



    function iss(attempts) {

        if (attempts <= 0 ) {
            alert('failed to contact ISS server after several attempts')
        }

        fetch(url).then((res) => {
            return res.json() // process response into JSON
        }).then((isData) => {
            console.log(isData) // TODO - display data in web page

            let lat = isData.latitude
            let long = isData.longitude
            let id = isData.id
            issId.innerHTML = id
            issLat.innerHTML = lat
           issLong.innerHTML = long

                // Create marker id it doesnot exist
                // Move marker if it does exist

            if (!issMarker) {
                // create marker
                issMarker = L.marker([lat, long], {icon: icon} ).addTo(map)
            } else {
                issMarker.setLatLng([lat, long])
            }

            let now = Date()
             timeIssLocationFetched.innerHTML = `This date was fetched at ${now}`

        }).catch((err) => {
            attempts = attempts - 1 // substract 1 from number of attempts
            console.log('Error!', err)
        }).finally( () => {
            setTimeout(iss, update, attempts)
        })
    }


    // the fetch() method in JS is used to request to server and load the information on the webpages.
    // the request can be og any APIs that return the data of the format JSON or XML. The method returns a promise
    // syntax; fetch('url') // api for the get request.


    // the then() method in JS has been defined in the Promise API adn is used to deal with asynchronous tasks
    // such as an API call. Previously, callback function were used instead of this function made the code difficult to maintain

    // json object notation is a standard text-based format for representing structured data based in javaScript object syntax.
    // commonly used for transmitting data in web application
    // sending some data from the sever to client so iit can ve displayed on web page


