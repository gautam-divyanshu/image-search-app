// api key: LvkkqYcreRacs3ToRjiEuaayLEjZeXgI3QoLeqdw3Zs

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let newimages=[];
let div1 = [];
let div2 = [];
let div3 = [];
let div4 = [];

app.get("/",function(req,res){
    res.render("image",{div1:div1,div2:div2,div3:div3,div4:div4});
})

app.post("/",function(req,res){
    newimages = []; // Empty the images array
    div1=[];
    div2=[];
    div3=[];
    div4=[];

    const searchText = req.body.search;
    const apiKey = '9d7lx4u2AOXNz6MICvrj5Tpnzgsm1wMnPrzoDsIfQ_s';
    const url=`https://api.unsplash.com/search/photos/?page=1&per_page=100&query=${searchText}&client_id=${apiKey}`;
    
    
    https.get(url,function (response){
        console.log(response.statusCode);

        let data = '';
        response.on("data", function (chunk) {
            data += chunk;
        });
        response.on("end", function () {
            const imageData = JSON.parse(data);
             
            for(let i=0;i<imageData.results.length;i++){
                let image = imageData.results[i].urls.full;
                newimages.push(image);
             }
             // Calculate the number of images per div
            const imagesPerDiv = Math.ceil(newimages.length / 4);
            console.log(imagesPerDiv*4);

            // Distribute the images into the div arrays
            newimages.forEach(function (imageLink, index) {
            let targetDiv;
            if (index < imagesPerDiv) {
                targetDiv = div1;
            } else if (index < imagesPerDiv * 2) {
                targetDiv = div2;
            } else if (index < imagesPerDiv * 3) {
                targetDiv = div3;
            } else {
                targetDiv = div4;
            }
            targetDiv.push(imageLink);
            });
            res.redirect("/");
            
        })


    })
})








app.listen("3000",function(){
    console.log("server is running on port 3000");
})