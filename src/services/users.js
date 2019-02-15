const mysqlConnection = require('../connection_db');

/*Funcion que verifica si el usuario ya existe en la bd
antes de ser registrado*/
function verifyUser(email,numberPhone){
    const verify = new Promise((resolve, reject) =>{
        try{
            mysqlConnection.query("SELECT email,telefono FROM usuario WHERE email=? OR telefono=?",[email,numberPhone],(err,rows)=>{
                if(!err){
                    if(rows.length == 0){
                         resolve({status: true,message: "Correcto"});
                    }else{
                        if(rows[0]['email']==email){
                            resolve({status: false,message: "El Email ya se encuentra registrado"});
                        }else{
                            resolve({status: false,message: "El Telefono ya se encuentra registrado"});
                        }     
                    }
                }
            });
        }catch(err){
            reject({status: 500,message: "Error del servidor"})
        }
    })
    return verify;
}

function generateId(name, last_name, login) {
    id =""+login+""+name.substring(0,2)+""+last_name.substring(0,3)+""+Math.floor(Math.random() * (1000001 - 1)) + 1;;
    return id;
}
module.exports = {verifyUser}