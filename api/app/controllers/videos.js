const {Videos} = require('../models/');


module.exports.insert = async (data,id)=>{
    data.userId = id;
    const video = await Videos.create(data);
    return video.dataValues;
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

    return "Foto alterada com sucesso";
}

module.exports.delete = async (idUser,idVideos)=>{
    await Videos.destroy({
        where:{
            id:idVideos,
            userId:idUser
        }
    });
    return "foto deletada com sucesso!";
}

