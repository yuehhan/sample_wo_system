const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

// Connect to Mysql
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'kar_mysql'
});

// Make sure the connection is successful
db.connect((err)=>{
    if(!err){
        console.log('DB connection succeeded');
    }else{
        console.log('DB connection failed \n Error: '+ JSON.stringify(err, undefined, 2));
    }
});

// Start of Express App
const app = express();
app.use(cors());

// Listen to our server -- Change the port during production
app.listen('3000', () => {
    console.log('Server started on port 3000');
})

// ROUTES

// Return all order data
app.get("/", function(req, res) {
    order_sql = "SELECT o.id as order_id, k.*, t.*, v.* FROM `orders_table` o " +
    "INNER JOIN `keys_table` k ON o.key_id = k.id " +
    "INNER JOIN `vehicles_table`v ON v.id = k.id " +
    "INNER JOIN `technician_table` t ON o.technician_id = t.id;";
    db.query(order_sql, (err, data) =>{
        if (err){
            console.log('Could not create table \n Error: '+ JSON.stringify(err, undefined, 2));
        }
        res.send(data);
    });
})

// Get all keys and vehicles
app.get("/findKeys", function(req, res) {
    keys_sql = "SELECT * FROM keys_table";
    db.query(keys_sql, (err, data) =>{
        if (err){
            console.log('Could not create table \n Error: '+ JSON.stringify(err, undefined, 2));
        }
        res.send(data);
    });
});

// Get all technicians
app.get("/findTechs", function(req, res){
    techs_sql = "SELECT id, first_name, last_name FROM technician_table";
    db.query(techs_sql, (err, data) =>{
        if (err){
            console.log('Could not create table \n Error: '+ JSON.stringify(err, undefined, 2));
        }
        res.send(data);
    });
});

// Create an order
app.post('/createOrder', function (req, res) {
    let params = req.query;
    let key = params.key_id;
    let tech = params.tech_id;

    if(key && tech){
        let create_sql = "INSERT INTO `orders_table` (`technician_id`, `key_id`) VALUES ('"+tech+"', '"+key+"');";
        db.query(create_sql, (err, data) =>{
            if (err){
                console.log('Could not create table \n Error: '+ JSON.stringify(err, undefined, 2));
            }
            res.send(data);
        });
    }
})

// Delete an order
app.delete('/deleteOrder', function(req, res) {
    let delete_order_id = req.query.order_id;

    if(delete_order_id){
        let delete_sql = "DELETE FROM `orders_table` WHERE `orders_table`.`id` = "+delete_order_id;
        db.query(delete_sql, (err) =>{
            if (err){
                console.log('Could not delete order \n Error: '+ JSON.stringify(err, undefined, 2));
            }
            res.send("deleted!")
        });
    }
});
