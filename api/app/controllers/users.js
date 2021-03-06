const { User } = require('../models');
const crypto = require('crypto');


module.exports.getAll = async()=>{
    let users = await User.findAll();
    return users;
}

module.exports.getFindById = async(id)=>{
    let user = await User.findOne({
        where:{
            id:id
        }
    });
    return user;
}

module.exports.getAutentic = async (data)=>{
    data.password = crypto.createHash("md5").update(data.password).digest("hex");
    let user = await User.findOne({
        where:{
            email:data.email,
            password:data.password
        }
    });
    return user;
}

module.exports.insert = async (data)=>{
    try {
        data.password = data.password = crypto.createHash("md5").update(data.password).digest("hex");
        const user = await User.create(data);
        return user;

     }catch (e) {
        console.log(e)
        let message;
        e.errors[0].message == "email must be unique" ? message = "Email já existe" : "um erro inesperado";
        return message;
    }
}

module.exports.update = async (id, data)=>{
    data.password =  crypto.createHash("md5").update(data.password).digest("hex")
    if(!data.password){
        console.log("if")
        await User.update({
            name:data.name,
        },{
            where:{
                id:id
            }
        });
        return;
    }
        console.log("esle")
        await User.update({
            name:data.name,
            password: data.password
        },{
            where:{
                id:id
            }
        });
    
}

module.exports.delete =  async(id)=>{
    await User.destroy({
        where:{
            id:id
        }
    });
}

