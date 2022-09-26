let express = require('express');
let app = express();
let dotenv = require('dotenv');
let morgan = require('morgan');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let cors = require('cors')
let MongoClient = mongo.MongoClient;
let bodyParsel = require('body-parser')
const mongoUrl = 'mongodb+srv://trial321:trial321@atlascluster.kpsc2.mongodb.net/Movies?retryWrites=true&w=majority';
let db;

app.use(morgan('common'))
app.use(bodyParsel.urlencoded({extended:true}));
app.use(bodyParsel.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Greeting from Express');
})

app.get('/shows',(req,res) => {
    db.collection('list').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/show/:sid',(req,res)=>{
    let sid = Number(req.params.sid)
    db.collection('list').find({id:sid}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})



MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(`Error While Connecting`);
    db = client.db('Movies')
    app.listen(port,() => {
        console.log(`listening on port ${port}`);
    })
})