import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/route.js';
import createConnection from './connection/connection.js';
import path from 'path'
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app = express()
const PORT = process.env.PORT || 3001


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);
app.use(express.json())


// for deploying on heroku also move client from ../client to ./client also change api url from "http://localhost:8000" to nothin 
// just remove that 
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})



// for deploying on localhost
// app.use(express.static(path.join(__dirname, '../client', 'build')));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
// })
createConnection();
app.listen(PORT, () => console.log('Server is running at ' + PORT))