const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

var posts = [];
const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora atque obcaecati ipsam vel doloribus eligendi accusamus ipsa iste necessitatibus, perspiciatis, alias libero quia totam ratione eius ullam odio soluta aliquam. Numquam culpa earum ullam, rerum voluptatum perspiciatis minus ipsam ipsa molestias perferendis dolorem reprehenderit, neque optio nesciunt saepe itaque facilis, minima animi ut ab suscipit magni. Libero est obcaecati eos earum! Porro quidem veritatis enim quisquam nisi fugit consequatur placeat. Animi sapiente, laborum illum nisi rem quasi vitae dolorem error aliquam recusandae facilis fugit iusto incidunt expedita, blanditiis architecto distinctio quis omnis, aperiam a. Officia quaerat amet quos expedita voluptatum.";
const aboutStartingContent = "Aliquam sequi atque recusandae minus quas odit doloremque omnis voluptate magni veniam nihil non, fuga, dolorem deleniti accusamus, impedit repellat velit! Exercitationem, tempore quidem excepturi consequatur accusamus nihil perferendis beatae eum ad atque amet sunt inventore voluptatibus cum iste nobis quisquam necessitatibus vero odio harum voluptatum ipsum consectetur corrupti. Tenetur laborum praesentium porro, adipisci iusto error voluptas provident nesciunt animi eos. Perspiciatis neque ratione autem magnam cum doloremque natus sunt, ullam quisquam excepturi nemo esse officia earum praesentium incidunt voluptatum nulla, molestias consequatur id assumenda accusantium nam temporibus harum? Eligendi eos repellat aut minus odio minima dolores quod modi vel distinctio. Facere iure laudantium enim! Commodi, maxime. Maiores dolore sint ipsam. Ut rerum quas debitis ipsum corporis tenetur natus facere officia temporibus.";
const contactStartingContent = "At, dignissimos ipsum! Aliquam sequi atque recusandae minus quas odit doloremque omnis voluptate magni veniam nihil non, fuga, dolorem deleniti accusamus, impedit repellat velit! Exercitationem, tempore quidem excepturi consequatur accusamus nihil perferendis beatae eum ad atque amet sunt inventore voluptatibus cum iste nobis quisquam necessitatibus vero odio harum voluptatum ipsum consectetur corrupti. Tenetur laborum praesentium porro, adipisci iusto error voluptas provident nesciunt animi eos. Perspiciatis neque ratione autem magnam cum doloremque natus sunt, ullam quisquam excepturi nemo esse officia earum praesentium incidunt voluptatum nulla, molestias consequatur id assumenda accusantium nam temporibus harum? Eligendi eos repellat aut minus odio minima dolores quod modi vel distinctio. Facere iure laudantium enim! Commodi, maxime. Maiores dolore sint ipsam. Ut rerum quas debitis ipsum corporis tenetur natus facere officia temporibus.";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.render("home",{
        homeContent:homeStartingContent,
        Posts:posts
    });
})
app.get("/about",(req,res)=>{
    res.render("about",{
        aboutContent:aboutStartingContent
    });
})
app.get("/contact",(req,res)=>{
    res.render("contact",{
        contactContent:contactStartingContent
    });
})
app.get("/compose",(req,res)=>{
    res.render("compose");
})
app.get("/posts/:topic",(req,res)=>{
   
    let paramTopic =_.lowerCase(req.params.topic);
    posts.forEach(function(ele){
        
        if(_.lowerCase(ele.title)===paramTopic){
            res.render("post",{
                title1:ele.title,
                post1:ele.actualMore
            })
        
        }
        
    })

    
})
app.post("/compose",(req,res)=>{
    let textPublish = req.body.publishText;
    let actualMoreText = req.body.MoreText;
    let moreText = req.body.MoreText;
    moreText = String(moreText);
    if(moreText.length>100){
        moreText = moreText.substring(0,100);
        moreText = moreText.concat("...");
    }
    const post = {
        title:textPublish,
        postText:moreText,
        actualMore:actualMoreText
    };
    posts.push(post);
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Server running at port 3000");
})