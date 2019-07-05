const {Links} = require("../models/");

module.exports.insert = (data,id)=>{
    console.log(data)
    data.userId = id
    Links.create(data);

    return "Link adicionado com sucesso!";
}

module.exports.getAll = (id)=>{
    const links = Links.findAll({
        where:{
            userId:id
        },
        order:[
            ['createdAt', 'DESC']
        ]
    });
    return links;
}