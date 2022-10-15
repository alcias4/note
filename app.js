const mainRoutes = require('./src/routes/mainRoutes');
const productRoutes = require('./src/routes/productRoutes');
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, './public')));

// para poder usar put y delete 

app.use(methodOverride('_method'));

//para indicar que vamos a usar POST

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./src/views'));

// ruta global 

app.use('/', mainRoutes);
app.use('/product', productRoutes);


// servidor 

app.listen(process.env.PORT || 3006 ,function(){
    console.log('run server 3006');
});