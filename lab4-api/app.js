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
        console.log(this.lat)
    }

    locationNotFound(err){
        console.log(err);
    }
}

let app = new App();