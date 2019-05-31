const {Pictures} = require('../models/');


module.exports.insert = async (data,file,id,fs)=>{
    data.userId = id;
    const date = new Date();
    const url = date.getTime()+"_"+file.originalFilename;
    const path_origin = file.path;
    let path_destiny;
    
    if(data.public){
        path_destiny = "./static/pictures/public/"+url+".jpg"
    }else{
        path_destiny = "./static/pictures/private/"+url+".jpg"
    }
    
    fs.rename(path_origin, path_destiny,async(err)=>{
        if(err){
            return err;
        }else{
            data.url = url;
            await Pictures.create(data);
            
        }
    });
    return "Foto adicionada com sucesso";
}

module.exports.getAllPublic = async ()=>{
    const pictures = await Pictures.findAll({
        where:{
            public:1
        }
    });
    return pictures;
}

module.exports.getAll = async (id)=>{
    const pictures = await Pictures.findAll({
        where:{
            userId:id,
            public:1
        }
    });
    return pictures;
}

module.exports.getById = async (idPicture, idUser)=>{
    const picture = await Pictures.findOne({
        where:{
            id:idPicture,
            userId:idUser
        }
    });
    return picture;
}

module.exports.getPublicByUser = async (id)=>{
    const pictures = await Pictures.findAll({
        where:{
            userId:id,
            public:1
        }
    });
    return pictures;
}

module.exports.getPublicOne = async (idUser,idPicture)=>{
    const picture = await Pictures.findOne({
        where:{
            userId:idUser,
            id:idPicture,
            public:1
        }
    });

    return picture;
}

module.exports.getPrivateByUser = async (id)=>{
    const pictures = await Pictures.findAll({
        where:{
            userId:id,
            public:0
        }
    });
    return pictures;
}

module.exports.getPrivateOne = async (idUser,idPicture)=>{
    const picture = await Pictures.findOne({
        where:{
            userId:idUser,
            id:idPicture,
            public:0
        }
    });

    return picture;
}

module.exports.update = async (idUser,idPicture,data)=>{
    await Pictures.update({
        nome:data.nome,
        public:data.public
    },{
        where:{
            id:idPicture,
            userId:idUser
        }
    });

    return "Foto alterada com sucesso";
}

module.exports.delete = async (idUser,idPicture,fs)=>{
    let path;
    const picture = await Pictures.findOne({
        where:{
            userId:idUser,
            id:idPicture
        }
    });
    await Pictures.destroy({
        where:{
            id:idPicture,
            userId:idUser
        }
    });

    picture.dataValues.public == true ? path = "./static/pictures/public/"+picture.dataValues.url+".jpg" : path = "./static/pictures/private/"+picture.dataValues.url+".jpg";
    fs.unlink(path,(err)=>{
        if(err){
            console.log(err);
            return
        }
    });

    return "foto deletada com sucesso!";
}

