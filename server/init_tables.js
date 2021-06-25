const mysql = require('mysql');

// This file creates our database, tables, and sample data
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database:'kar_mysql'
});

// Make sure the connection is successful
db.connect((err)=>{
    if(!err){
        console.log('DB connection succeeded');
    }else{
        console.log('DB connection failed \n Error: '+ JSON.stringify(err, undefined, 2));
    }
});

// Create all the mysql tables that we need
create_tables();

// Insert some sample data
insert_sample_data();

function create_tables(){
    const tables = [
        "CREATE TABLE IF NOT EXISTS `keys_table` (" +
        "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY," +
        "name VARCHAR(30) NOT NULL," +
        "description VARCHAR(100) NOT NULL," +
        "price INT(6))",
    
        "CREATE TABLE IF NOT EXISTS `vehicles_table` (" +
        "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY," +
        "year INT(4) NOT NULL," +
        "make VARCHAR(100) NOT NULL," +
        "vin INT(17)," +
        "model VARCHAR(11))",
    
        "CREATE TABLE IF NOT EXISTS `technician_table` (" +
        "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY," +
        "first_name VARCHAR(11) NOT NULL," +
        "last_name VARCHAR(11) NOT NULL," +
        "truck_number INT(20))",

        "CREATE TABLE IF NOT EXISTS `orders_table` (" +
        "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY," +
        "technician_id INT(6) NOT NULL," +
        "key_id INT(6))",
    ];

    let sql;
    for(let i=0; i<tables.length; i++){
        sql = tables[i];

        db.query(sql, (err) =>{
            if (err){
                console.log('Could not create table \n Error: '+ JSON.stringify(err, undefined, 2));
            }
        });
    }
}
function insert_sample_data(){
    const inserts = [
        "INSERT INTO `keys_table` (`id`, `name`, `description`, `price`) VALUES ('1', 'Item A', 'This is Item A', '1.00');",
        "INSERT INTO `keys_table` (`id`, `name`, `description`, `price`) VALUES ('2', 'Item B', 'This is Item B', '2.00');",
        "INSERT INTO `keys_table` (`id`, `name`, `description`, `price`) VALUES ('3', 'Item C', 'This is Item C', '3.00');",
        "INSERT INTO `keys_table` (`id`, `name`, `description`, `price`) VALUES ('4', 'Item D', 'This is Item D', '4.00');",
    
        "INSERT INTO `vehicles_table` (`id`, `year`, `make`, `vin`, `model`) VALUES ('1', '2020', 'Car', '123456789', 'A');" ,
        "INSERT INTO `vehicles_table` (`id`, `year`, `make`, `vin`, `model`) VALUES ('2', '2020', 'Truck', '123456789', 'B');",
        "INSERT INTO `vehicles_table` (`id`, `year`, `make`, `vin`, `model`) VALUES ('3', '2020', 'Car', '123456789', 'C');",
        "INSERT INTO `vehicles_table` (`id`, `year`, `make`, `vin`, `model`) VALUES ('4', '2020', 'Truck', '123456789', 'D');",
    
        "INSERT INTO `technician_table` (`id`, `first_name`, `last_name`, `truck_number`) VALUES ('1', 'Tech', 'One', '1');",
        "INSERT INTO `technician_table` (`id`, `first_name`, `last_name`, `truck_number`) VALUES ('2', 'Tech', 'Two', '2');",
        "INSERT INTO `technician_table` (`id`, `first_name`, `last_name`, `truck_number`) VALUES ('3', 'Tech', 'Three', '3');",
        "INSERT INTO `technician_table` (`id`, `first_name`, `last_name`, `truck_number`) VALUES ('4', 'Tech', 'Four', '4');",

        "INSERT INTO `orders_table` (`id`, `technician_id`, `key_id`) VALUES ('1', '1', '1');",
        "INSERT INTO `orders_table` (`id`, `technician_id`, `key_id`) VALUES ('2', '2', '2');",
        "INSERT INTO `orders_table` (`id`, `technician_id`, `key_id`) VALUES ('3', '3', '3');",
        "INSERT INTO `orders_table` (`id`, `technician_id`, `key_id`) VALUES ('4', '4', '4');"
    ]

    let sql;
    for(let i=0; i<inserts.length; i++){
        sql = inserts[i];

        db.query(sql, (err) =>{
            if (err){
                console.log('Could not insert into table \n Error: '+ JSON.stringify(err, undefined, 2));
            }
        });
    }
}