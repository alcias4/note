const productControllers = require('../controllers/productControllers');

const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const { store } = require('../controllers/productControllers');


// multer configuracion 

const configuracionImg = multer.diskStorage({

    //donde va ir guardado la img que subimos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img')) //carpeta que queremos donde se guarde.
    },

    // con que nombre se va gurdar la img que subimos 
    filename: function(req, file, cb){
        let imgName = Date.now() + file.originalname; // Date.now() retorna los milisegundo desde un fecha en concreto
        cb(null, imgName);
    }

});

// llamamos a multer y le pasamos un objeto;

const uploadFile = multer({storage: configuracionImg});






//-------------------------

routes.get('/registra' , productControllers.registrar);
routes.post('/regis', uploadFile.single('imgProduct') ,productControllers.store); //   uploadFile.single('imgProduct') va el name de la etiqueta input file. para muchas img es .array

routes.get('/editar/:id' , productControllers.editar);
routes.put('/edit/:id' , uploadFile.single('imgProductEdit') ,productControllers.guardar);

routes.delete('/eli/:id' , productControllers.eliminar);




module.exports= routes;