import mysql from 'mysql';


export default function createConnection() {
    var con =  mysql.createConnection({
        host: "roundhouse.proxy.rlwy.net",
        user: "root",
        password: "gcC4cgchGCghg3-611256A5eED-ed-g5",
        port: 14636,
        database:"MySQL"
    });
    
        
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
}