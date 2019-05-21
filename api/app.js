const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const multiParty = require('connect-multiparty');
const fs = require('fs');

const user = require("./app/controllers/users");
const Pictures = require("./app/controllers/pictures");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(multiParty());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    res.setHeader("Access-Control-Allow-Credentials",true);  
    next();
});

app.listen(9000, ()=>{
    console.log("rodando na 9000")
});

//USERS
app.get("/users", async (req,res)=>{
    let users = await user.getAll();
    return res.status(200).json(users);
});

app.get("/user/:id", async (req,res)=>{
    let userId = await user.getFindById(req.params.id);
    return res.status(200).json(userId);
});

app.post("/user", async (req,res)=>{
    let status;
    let response = await user.insert(req.body);
    console.log(response);
    let message = response;
    message == "Email já existe" ? status = 400 : status = 200;
    return res.status(status).json(message);   
});

app.put("/user/:id", (req,res)=>{
    user.update(req.params.id,req.body);
    return res.json("Usuario alterado com sucesso");
});

app.delete("/user/:id", (req,res)=>{
    user.delete(req.params.id);
    return res.status(200).json("Usuario excluido com sucesso");
});


//PICTURES
app.post("/pictures/:id", async (req,res)=>{



    const pictures = await Pictures.insert(req.body,req.files.picture, req.params.id,fs);
    console.log(pictures)
    return res.status(202).json(pictures);
});

app.get("/pictures/:id",async (req,res)=>{
    const pictures = await Pictures.getAll(req.params.id);
    return res.status(200).json(pictures);
});

app.get("/picture/:idUser/:idPicture", async (req,res)=>{
    const picture = await Pictures.getById(req.params.idPicture, req.params.idUser);
    return res.status(200).json(picture);
});

app.get("/pictures/public/:idUser", async (req,res)=>{
    const pictures = await Pictures.getPublicByUser(req.params.idUser);
    return res.status(200).json(pictures);
});

app.get("/pictures/public/:idUser/:idPicture",async(req,res)=>{
    const picture = await Pictures.getPublicOne(req.params.idUser, req.params.idPicture);
    return res.status(200).json(picture);
});

app.get("/pictures/private/:idUser", async (req,res)=>{
    const pictures = await Pictures.getPrivateByUser(req.params.idUser);
    return res.status(200).json(pictures);
});

app.get("/pictures/private/:idUser/:idPicture",async (req,res)=>{
    const picture = await Pictures.getPrivateOne(req.params.idUser, req.params.idPicture);
    return res.status(200).json(picture);
});

app.get("/pictures/image/private/:url", async (req,res)=>{
    const url = req.params.url;
    fs.readFile('./static/pictures/private/'+url+'.jpg',(err,img)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        res.writeHead(200,{'content-type':'image/jpg'});
        res.end(img);
    }); 
});

app.get("/pictures/image/public/:url", async (req,res)=>{
    const url = req.params.url;
    fs.readFile('./static/pictures/public/'+url+'.jpg',(err,img)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        res.writeHead(200,{'content-type':'image/jpg'});
        res.end(img);
    }); 
});

app.put("/pictures/update/:idUser/:idPicture",async(req,res)=>{
    const message = await Pictures.update(req.params.idUser, req.params.idPicture, req.body);
    return res.status(200).json(message);
});

app.delete("/pictures/delete/:idUser/:idPicture",async(req,res)=>{
    const message = await Pictures.delete(req.params.idUser, req.params.idPicture, fs);
    return res.status(200).json(message);
});








