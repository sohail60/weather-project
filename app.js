const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

    app.post("/loc",function(req,res){
        const city=req.body.city;
        console.log(city);
        // res.write(city);
        const apiKey="2175fc5eadf92e42daeabaff456a55e8";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+apiKey;

        https.get(url,function(response){
            console.log(response.statusCode);
    
            response.on("data",function(data){
                const weatherData= JSON.parse(data);
                const temp= weatherData.main.temp;
                console.log(temp);
                const desc=weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;

                // Wrong Code
                // const iconUrl="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
                // res.write("<h1>The temp in " + city + " is: " +temp+ "</h1>");
                // res.write("<p>The weather currently is: " +desc+ "</p>");
                // res.write("<img src=" + iconUrl+ ">");

                // Right Code
                const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.setHeader("Content-Type", "text/html");     // necessary to write before using res.write
                res.write("<h1>The temp in " + city + " is: " + temp + "</h1>", "utf8");    //encoding(utf8) is necessary in res.write
                res.write("<p>The weather currently is: " + desc + "</p>", "utf8");
                res.write("<img src=" + iconUrl + ">", "utf8");

            });
    });
    });

app.listen(3000,function(){
    console.log("Server is running on port 3000")
});