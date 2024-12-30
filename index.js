const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride=require("method-override");
const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"hatim_lalji",
        content:"this is my first post", 
        image:"img1.png"
    },
    {
        id:uuidv4(),
        username:"Moiz_ezzy",
        content:"hii, this is my first post",
        image:"img2.png"
    },
    {
        id:uuidv4(),
        username:"hatim_lalji",
        content:"this is my second x post",
        image:"img3.png"
    },
]

app.listen(port,()=>{
    console.log(`listening to port ${port}..`);
})

app.get("/",(req,res)=>{
    res.send("Server working well")
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts})
})

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let{username,content,image}=req.body;
    let id=uuidv4();
    posts.unshift({id,username,content,image});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post =posts.find((p)=>id===p.id);
    let newContent = req.body.content
    post.content=newContent;
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})