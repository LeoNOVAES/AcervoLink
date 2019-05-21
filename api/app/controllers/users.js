const { User } = require('../models');

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

module.exports.insert = async (data)=>{
    try {
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
   await User.update({
        name:data.name,
        email:data.email,
        password:data.password
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

