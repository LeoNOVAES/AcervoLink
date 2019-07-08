const {Links} = require("../models/");

module.exports.insert = (data,id)=>{
    console.log(data)
    data.userId = id
    Links.create(data);

    return "Link adicionado com sucesso!";
}

module.exports.getAll = (obj)=>{
    console.log(obj)
    const links = Links.findAll({
        where:{
            userId:obj.userId
        },
        order:[
            ['createdAt', 'DESC']
        ],
        offset: ((obj.page - 1) * obj.limit),
        limit: parseInt(obj.limit),    
        subQuery: false
    });

    return links;
}

module.exports.getAllTot = (obj)=>{
    const links = Links.findAll({
        where:{
            userId:obj.userId
        },
        order:[
            ['createdAt', 'DESC']
        ]
    });
    
    return links;
}

module.exports.delete = (obj)=>{
    Links.destroy({
        where:{
            userId:obj.idUser,
            id:obj.id
        }
    });

    return "Link deletado com sucesso!";
}