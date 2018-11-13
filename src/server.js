const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan =require('morgan');
const app = express();
const mongoosee = require('mongoose');
const tasksRoutes = require('./routes/tasks');


//db
mongoosee.Promise = global.Promise;
mongoosee.connect('mongodb://localhost/mevn-stack',{
    useMongoClient: false
}).then(() => console.log('db connected'))
    .catch(err => console.log('no connected',err));

//settings
app.set('port', process.env.PORT || 3001);

//midlewers
app.use(morgan('dev')); //muestra que peticion se le hace al servidor get put post delete ...
app.use(express.json()); //permite trabajajar con objetos json
//app.use(cors());
//app.use(bodyParser.json());

//routes
app.use('/tasks', tasksRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});