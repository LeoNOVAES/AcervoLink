const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const multiParty = require('connect-multiparty');
const jwt = require("jsonwebtoken");
const fs = require('fs');

const authConfig = require("./config/auth.json");
const user = require("./app/controllers/users");
const Pictures = require("./app/controllers/pictures");
const Videos = require("./app/controllers/videos");
const Links = require("./app/controllers/links");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(multiParty());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Credentials",true);  
    next();
});


app.listen(9000, ()=>{
    console.log("rodando na 9000")
});

//USERS
app.post("/user", async (req,res)=>{
    let status;
    let response = await user.insert(req.body);
    console.log(response);
    let message = response;
    message == "Email já existe" ? status = 400 : status = 200;
    return res.status(status).json(message);   
});

app.post("/user/autentic", async (req,res)=>{
    const data = req.body;
    const userLog = await user.getAutentic(data);
    if(userLog != null){
        const token = jwt.sign({"id":userLog.id}, authConfig.secret,{
            expiresIn:86400
        });

        res.status(200).json({'auth':true,'user':userLog, 'token':token });
    }else{
        res.status(403).json({'auth':false,'user':"Email Ou Senha incorretos!", 'token':'Não existe Token'})
    }
});


app.use((req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
    
    if(token){
        jwt.verify(token, authConfig.secret,(err,decoded)=>{
            if(err){
                console.log(err)
                return res.status(403).json({'message':'Falha ao Autenticar Token'});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.status(200).json({"message":"Não existe Token"});
    }

});


app.get("/users", async (req,res)=>{
    let users = await user.getAll();
    return res.status(200).json(users);
});

app.get("/user/:id", async (req,res)=>{
    let userId = await user.getFindById(req.params.id);
    return res.status(200).json(userId);
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
app.post("/pictures/:id", (req,res)=>{
    const pictures = Pictures.insert(req.body,req.files.picture, req.params.id,fs);
    return res.status(202).json(pictures);
});

app.get("/pictures/public", async(req,res)=>{
    const pictures = await Pictures.getAllPublic(req.params.id);
    return res.status(200).json(pictures);
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

app.get("/pictures/pagination/public/:page/:limit",async(req,res)=>{
    const pictures = await Pictures.getTotPublicByPage(req.params.page, req.params.limit);
    return res.status(200).json(pictures);
});

app.get("/pictures/private/:idUser", async (req,res)=>{
    const pictures = await Pictures.getPrivateByUser(req.params.idUser);
    return res.status(200).json(pictures);
});

app.get("/pictures/private/:idUser/:page/:limit", async(req,res)=>{
    const pictures = await Pictures.getPrivatePageByUser(req.params.idUser, req.params.page, req.params.limit);
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
    console.log(req.body)
    const message = await Pictures.update(req.params.idUser, req.params.idPicture, req.body);
    return res.status(200).json(message);
});

app.delete("/pictures/delete/:idUser/:idPicture",async(req,res)=>{
    const message = await Pictures.delete(req.params.idUser, req.params.idPicture, fs);
    return res.status(200).json(message);
});

//videos

app.post("/videos/:id", async (req,res)=>{
    const video = await Videos.insert(req.files,req.body, req.params.id, fs);
    return res.status(202).json(video);
});

app.get("/videos/:id",async (req,res)=>{
    const videos = await Videos.getAll(req.params.id);
    return res.status(200).json(videos);
});

app.get("/videos/:idUser/:idVideos", async (req,res)=>{
    const video = await Videos.getById(req.params.idPicture, req.params.idUser);
    return res.status(200).json(video);
});

app.get("/videos/public/:idUser", async (req,res)=>{
    const videos = await Videos.getPublicByUser(req.params.idUser);
    return res.status(200).json(videos);
});

app.get("/videos/public/:idUser/:idVideos",async(req,res)=>{
    const videos = await Videos.getPublicOne(req.params.idUser, req.params.idPicture);
    return res.status(200).json(videos);
});

app.get("/videos/private/:idUser", async (req,res)=>{
    const videos = await Videos.getPrivateByUser(req.params.idUser);
    return res.status(200).json(videos);
});

app.get("/videos/private/:idUser/:idVideos",async (req,res)=>{
    const video = await Videos.getPrivateOne(req.params.idUser, req.params.idPicture);
    return res.status(200).json(video);
});

app.get("/videos/file/private/:url", async (req,res)=>{
    const url = req.params.url;
    fs.readFile('./static/videos/private/'+url+'.mp4',(err,video)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        res.writeHead(200,{'content-type':'video/mp4'});
        res.end(video);
    }); 
});

app.get("/videos/file/public/:url", async (req,res)=>{
    const url = req.params.url;
    fs.readFile('./static/videos/public/'+url+'.mp4',(err,video)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        res.writeHead(200,{'content-type':'video/mp4'});
        res.end(video);
    }); 
});

app.put("/videos/update/:idUser/:idVideos",async(req,res)=>{
    const message = await Videos.update(req.params.idUser, req.params.idPicture, req.body);
    return res.status(200).json(message);
});

app.delete("/videos/delete/:idUser/:idVideos",async(req,res)=>{
    const message = await Videos.delete(req.params.idUser, req.params.idPicture, fs);
    return res.status(200).json(message);
});


//Links
app.post("/links/create/:idUser", async(req,res)=>{
    console.log(req)
    const message = await Links.insert(req.body, req.params.idUser);
    return res.status(202).json(message);
});

app.get("/links/:userId/:page/:limit", async (req,res)=>{
    const links = await Links.getAll(req.params);
    return res.status(200).json(links);
});

app.get("/links/total/:userId/", async (req,res)=>{
    const links = await Links.getAllTot(req.params);
    return res.status(200).json(links);
});

app.delete("/links/delete/:idUser/:id", async(req,res)=>{
    const message = await Links.delete(req.params);
    return res.status(200).json(message);
});


