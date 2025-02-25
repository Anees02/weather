export class Climate{
    temp;
    cityName;
    humidity;
    windSpeed;
    mainImg;
    constructor(weatherDetails){
        this.temp = weatherDetails.main.temp;
        this.cityName = weatherDetails.name;
        this.humidity = weatherDetails.main.humidity;
        this.windSpeed = weatherDetails.wind.speed;
        this.mainImg = weatherDetails.weather[0].main;
    }
}