const express=require("express");       // requires module,i.e, we will be able to use the module after this
const bodyParser=require("body-parser");

const app=express();        // creates a new express application

app.use(express.static("public"));          // Serving static files in Express
app.use(bodyParser.urlencoded({extended: true}));       // text, json, urlencoded
// extended: true -> allows us to post nested objects
// we have to write this line every time we want to use body parser


// respond with the index.html page when a GET request is made to the homepage
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");      // __dirname for getting current directory location
});                                             // sendFile for sending file instead of just send

app.post("/",function(req,res){
    let num1=Number(req.body.num1);     // req.body.num1 returns String
    let num2=Number(req.body.num2);

    let result=num1+num2;      // req.body -> parsed version
    res.send("Result of Calculation: "+ result);       // res.send() -> to print on webpage
    // res.send() is equivalent to res.write() + res.end() so we don't have to write res.end()
});

// respond with the bmiCalculator.html page when a GET request is made to the /bmicalculator
app.get("/bmicalculator",function(req,res){
    res.sendFile(__dirname+"/bmicalculator.html");
});

app.post("/bmicalculator",function(req,res){
    let weight=Number(req.body.weight);
    let height=Number(req.body.height);

    let bmi=weight/(height*height);
    res.send("BMI: "+bmi);
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});