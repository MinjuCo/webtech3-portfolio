class App{
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(
            this.locationFound.bind(this),
            this.locationNotFound.bind(this)
        );
    }

    locationFound(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    locationNotFound(err){
        console.log(err);
    }

    getWeather(){
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ae574f403dc7b940aae609d9d32ab653/${this.lat},${this.lng}?units=si`;
        if(localStorage.getItem('data') == null){
            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                localStorage.setItem('data',JSON.stringify(data))
                console.log(data);
                document.querySelector(".weatherInfo .temp").innerHTML = data.currently.temperature + "°";
                document.querySelector(".weatherInfo .summary").innerHTML = data.currently.summary;
                this.changeElement(data.currently.icon);
            }).catch(err =>{
                console.log(err);
            });
        }else{
            try{
                let data = JSON.parse(localStorage.getItem('data'));
                document.querySelector(".weatherInfo .temp").innerHTML = data.currently.temperature + "°";
                console.log(data)
                document.querySelector(".weatherInfo .temp").innerHTML = data.currently.temperature + "°";
                document.querySelector(".weatherInfo .summary").innerHTML = data.currently.summary;
                this.changeElement(data.currently.icon);
            }catch(error) {
                console.log(error);
            }
            var hours = 1; // Reset when storage is more than 24hours
            var now = new Date().getTime();
            var setupTime = localStorage.getItem('setupTime');
            if (setupTime == null) {
                localStorage.setItem('setupTime', now)
            } else {
                if(now-setupTime > hours*60*60*1000) {
                    localStorage.clear()
                    localStorage.setItem('setupTime', now);
                }
            }
        }
    }

    changeElement(icon){
        switch(icon){
            case "clear-day":
                document.querySelector(".weather--icon").className = "far fa-sun weather--icon";
                break;
            case "clear-night":
                document.querySelector(".weather--icon").className = "far fa-moon weather--icon";
                break;
            case "rain":
                document.querySelector(".weather--icon").className = "fas fa-cloud-rain weather--icon";
                break;
            case "snow":
                document.querySelector(".weather--icon").className = "far fa-snowflake weather--icon";
                break;
            case "cloudy":
                document.querySelector(".weather--icon").className = "fas fa-cloud weather--icon";
                break;
            case "wind":
                document.querySelector(".weather--icon").className = "fas fa-wind weather--icon";
                break;
            default:
                document.querySelector(".weather--icon").className = "fas fa-cloud-sun weather--icon";
        }
    }
}

let app = new App();