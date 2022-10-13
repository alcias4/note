const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '../data/baseDatos.json');// ruta del json
const notas = JSON.parse(fs.readFileSync(productFilePath, 'utf-8')); // trear lo datos del json



const controllers = {
    registrar: (req, res)=>{
        res.render('./products/registrar');
    },

    // method crear
    store:(req, res)=>{
        //convertir un objeto al json
        let productoNuevo ={
            id:(notas[notas.length - 1].id + 1),
            titulo:req.body.titulo,
            description: req.body.descripcion
        }
        notas.push(productoNuevo);

        fs.writeFileSync(productFilePath,JSON.stringify(notas,null," "));
        
        res.redirect('/');
    },

    editar: (req, res)=>{
        let idnotas = req.params.id;
        let objnotas;

        for(let o of notas){
            if(idnotas == o.id){
                objnotas = o;
                break;
            }
        }

        res.render('./products/editar',{producto: objnotas})
    },

    guardar:(req, res)=>{
        
        let idnotas = req.params.id;

        for(let o of notas){
            if(idnotas == o.id){
                o.titulo = req.body.titulo;
                o.description = req.body.description;
                break;
            }

        }

        fs.writeFileSync(productFilePath,JSON.stringify(notas,null," "));
        
        res.redirect("/");
    },


    eliminar: (req, res)=>{

        let idnotas = req.params.id;
        
        let arreglosNotas = notas.filter(function(elemento){
            return elemento.id != idnotas
        })

        fs.writeFileSync(productFilePath,JSON.stringify(arreglosNotas,null," "));
        
        res.redirect("/");
    }
}


module.exports = controllers;