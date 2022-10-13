const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '../data/baseDatos.json');// ruta del json
const notas = JSON.parse(fs.readFileSync(productFilePath, 'utf-8')); // trear lo datos del json


//traer los datos

const controllers ={
    
    index:(req,res)=>{
        const notas = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));
        res.render('index',{ps:notas});
    }
}


module.exports = controllers;