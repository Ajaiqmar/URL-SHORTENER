const express = require("express");
const path = require("path");
const createRandomExtensions = require("./modules/random");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('mongoose-type-url');
const cors = require("cors");

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://ajaiqmar:123@urldb.fuhhl.mongodb.net/?retryWrites=true&w=majority",function(err){
    if(err)
    {
        console.log(err);
    }
});

const urlSchema = new mongoose.Schema({
    url : {
        type : mongoose.SchemaTypes.Url,
        required : true
    },
    shortenedUrl :{
        type : String,
        required : true
    }
});

const Urls = mongoose.model("urls",urlSchema);

app.get("/",function(req,res){
  res.sendFile("index.html");
});

app.post("/compress",function(req,res){
    Urls.findOne({url : req.body.inputURL},function(err,dat){
        if(err)
        {
            console.log(err);
        }

        if(dat)
        {
            res.send({inputURL : req.body.inputURL,shortenedURL : dat.shortenedUrl});
        }
        else
        {
            Urls.find({},{_id : 0,shortenedUrl : 1},function(err,dat){
                if(err)
                {
                    console.log(err);
                }

                while(true)
                {
                    var extension = createRandomExtensions();

                    if(!dat.includes(extension))
                    {
                        const url = new Urls({url : req.body.inputURL,shortenedUrl : extension});
                        url.save();

                        res.send({inputURL : req.body.inputURL,shortenedURL : extension});
                        break;
                    }
                }


            });
        }
    });
});

app.get("/:shortenedURLId",function(req,res)
{
    const id = req.params["shortenedURLId"];

    Urls.findOne({shortenedUrl : id},function(err,dat){
        if(err)
        {
            console.log(err);
        }

        if(dat)
        {
            res.redirect(dat.url);
        }
    });
});

app.listen(process.env.PORT || 5000,function(){
    console.log("SERVER IS UP RUNNING...");
});
