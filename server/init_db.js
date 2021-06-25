const mysql = require('mysql');

// This file creates our database, tables, and sample data
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: ''
});

// Make sure the connection is successful
db.connect((err)=>{
    if(!err){
        console.log('DB connection succeeded');
    }else{
        console.log('DB connection failed \n Error: '+ JSON.stringify(err, undefined, 2));
    }
});

// Create database
db.query('CREATE DATABASE IF NOT EXISTS kar_mysql', (err) =>{
    if (err){
        console.log('Could not create database \n Error: '+ JSON.stringify(err, undefined, 2));
    }
});