const {Videos} = require('../models/');

module.exports.insert = async (file,data,id,fs)=>{
    data.userId = id;
    const date = new Date();
    const url = date.getTime()+"_"+file.video.originalFilename;
    const path_origin = file.video.path;
    let path_destiny;

    console.log(data.public);
    data.public == true ? path_destiny = "./static/videos/public/"+url+".mp4" : path_destiny = "./static/videos/private/"+url+".mp4";

    fs.rename(path_origin, path_destiny,async(err)=>{
        if(err){
            return err;
        }else{
            data.url = url;
            await Videos.create(data);
            
        }
    });
    return "Video adicionado com sucesso";
}

module.exports.getAll = async (id)=>{
    const videos = await Videos.findAll({
        where:{
            userId:id
        }
    });
    return videos;
}

module.exports.getById = async (idVideos, idUser)=>{
    const video = await Videos.findOne({
        where:{
            id:idVideos,
            userId:idUser
        }
    });
    return video;
}

module.exports.getPublicByUser = async (id)=>{
    const videos = await Videos.findAll({
        where:{
            userId:id,
            public:1
        }
    });
    return videos;
}

module.exports.getPublicOne = async (idUser,idVideos)=>{
    const video = await Videos.findOne({
        where:{
            userId:idUser,
            id:idVideos,
            public:1
        }
    });

    return video;
}

module.exports.getPrivateByUser = async (id)=>{
    const videos = await Videos.findAll({
        where:{
            userId:id,
            public:0
        }
    });
    return videos;
}

module.exports.getPrivateOne = async (idUser,idVideos)=>{
    const video = await Videos.findOne({
        where:{
            userId:idUser,
            id:idVideos,
            public:0
        }
    });

    return video;
}

module.exports.update = async (idUser,idVideos,data)=>{
    await Videos.update({
        nome:data.nome,
        public:data.public
    },{
        where:{
            id:idVideos,
            userId:idUser
        }
    });

    return "Video alterado com sucesso";
}

module.exports.delete = async (idUser,idVideo)=>{
    let path;
    const video = await Videos.findOne({
        where:{
            userId:idUser,
            id:idVideo
        }
    });
    await Videos.destroy({
        where:{
            id:idVideo,
            userId:idUser
        }
    });

    video.dataValues.public == true ? path = "./static/videos/public/"+video.dataValues.url+".mp4" : path = "./static/videos/private/"+video.dataValues.url+".mp4";
    fs.unlink(path,(err)=>{
        if(err){
            console.log(err);
            return
        }
    });

    return "Video deletado com sucesso!";
}

