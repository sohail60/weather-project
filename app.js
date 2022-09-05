const express=require("express");       // requires module,i.e, we will be able to use the module after this
const https=require("https");
const bodyParser=require("body-parser");

const app=express();        // creates a new express 

 // text, json, urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));          // Serving static files in Express

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

    app.post("/loc",function(req,res){
        const city=req.body.city;
        const apiKey="2175fc5eadf92e42daeabaff456a55e8";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+apiKey;

        // Getting response from server
        https.get(url,function(response){       // https.get is used when we only need to get data from different server and https.request is used when we need to get as well as to give data

            response.on("data",function(data){  // Taking data from response
                const weatherData= JSON.parse(data);    // Converting data into object
                const temp= weatherData.main.temp;
                const desc=weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;     // Icon id
                const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

                // Writing Output
                // res.send() can only be called once, since it is equivalent to res.write() + res.end()
                // res.write() can be called multiple times to provide successive parts of the body.
                res.setHeader("Content-Type", "text/html");     // necessary to write before using res.write
                res.write("<h1>The temp in " + city + " is: " + temp + "</h1>", "utf8");    //encoding(utf8) is necessary in res.write
                res.write("<p>The weather currently is: " + desc + "</p>", "utf8");
                res.write("<img src=" + iconUrl + ">", "utf8");
                res.end()
            });
    });
    });
    
    app.listen(process.env.PORT || 3000,function(){
        console.log("Server is running on port 3000");
    });

// API Key
// 2175fc5eadf92e42daeabaff456a55e8