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
                this.getActivity("music","");
                document.querySelector(".songPic").src = "https://i.scdn.co/image/ab67706f00000002fe0099a8dcd3054706ffc92f"
                break;
            case "clear-night":
                document.querySelector(".weather--icon").className = "far fa-moon weather--icon";
                this.getActivity("recreational"," while listening to this playlist");
                document.querySelector(".songPic").src = "https://pl.scdn.co/images/pl/default/79f1ecd290c813a4deff9439f9d045e84dc76626"
                break;
            case "rain":
                document.querySelector(".weather--icon").className = "fas fa-cloud-rain weather--icon";
                this.getActivity("relaxation","while enjoying this playlist!");
                document.querySelector(".songPic").src = "https://pl.scdn.co/images/pl/default/https://i.scdn.co/image/ab67706f00000002a692c498201090e78f8c9f7e"
                break;
            case "snow":
                document.querySelector(".weather--icon").className = "far fa-snowflake weather--icon";
                this.getActivity("social","while singing with this playlist");
                document.querySelector(".songPic").src = "https://i.scdn.co/image/ab67616d0000b27381af630ac06f82c24d8f85ee";
                break;
            case "cloudy":
                document.querySelector(".weather--icon").className = "fas fa-cloud weather--icon";
                this.getActivity("cooking","moving to this beat");
                document.querySelector(".songPic").src = "https://i.scdn.co/image/ab67706f0000000272d1ee442828718107cb4fb6";
                break;
            case "wind":
                document.querySelector(".weather--icon").className = "fas fa-wind weather--icon";
                this.getActivity("diy"," while dancing to this playlist");
                document.querySelector(".songPic").src = "https://i.scdn.co/image/ab67706f000000025af1070c80cd50dbbb4cfa19";
                break;
            default:
                document.querySelector(".weather--icon").className = "fas fa-cloud-sun weather--icon";
                document.querySelector(".songPic").src = "https://i.scdn.co/image/ab67706f00000002cef1e1e83454017583e8bd8f";
        }
    }

    getActivity(type,extra){
        let url = `https://cors-anywhere.herokuapp.com/https://www.boredapi.com/api/activity?type=${type}`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            document.querySelector(".activity").innerHTML = data.activity + " " + extra;
        }).catch(err =>{
            console.log(err);
        });
    }
}

let app = new App();