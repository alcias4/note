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
        //crear el id 
        let idNuevo = 0;

        for(let s of notas){
            if(idNuevo < s.id){
                idNuevo = s.id
            }
        }

        idNuevo++

        // llamamos el dato de l img de file que queremos 

        let nombreImg = req.file.filename;

        //convertir un objeto al json
        let productoNuevo ={
            id: idNuevo,
            titulo:req.body.titulo,
            description: req.body.descripcion,
            img: nombreImg
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
        let nombreImg = req.file.filename;
        for(let o of notas){
            if(idnotas == o.id){
                o.titulo = req.body.titulo;
                o.description = req.body.description;
                o.img = nombreImg;
                break;
            }

        }

        fs.writeFileSync(productFilePath,JSON.stringify(notas,null," "));
        
        res.redirect("/");
    },


    eliminar: (req, res)=>{

        let idnotas = req.params.id;
        let productoEncontrado;


        let arreglosNotas = notas.filter(function(elemento){
            return elemento.id != idnotas
        })
        
        for(let producto of notas){
            if(producto.id == idnotas){
                productoEncontrado = producto;
            }
        }
        fs.unlinkSync(path.join(__dirname, '../../public/img', productoEncontrado.img))

        fs.writeFileSync(productFilePath,JSON.stringify(arreglosNotas,null," "));
        
        res.redirect("/");
    }
}


module.exports = controllers;