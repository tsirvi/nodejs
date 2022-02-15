const mysql=require('mysql2');
const express=require('express');
var app=express();
const parser=require('body-parser');
app.use(parser.json());
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Keli@9449571951',
    database:'dblab'
});
connection.connect((err)=>
{
    if(!err) 
    console.log('DB connected');
    else
    console.log('Error');
})
app.listen(5700,()=>console.log('server started...'));
app.get('/customerinformation',(req,res)=>
{
    connection.query('SELECT * FROM customer',(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/customerinformation/:cusname',(req,res)=>
{
    connection.query('SELECT * FROM customer WHERE cusname=?',[req.params.cusname],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/add',(req,res)=>
{
    var post={cusid:13,cusname:'himanshu',cusaddress:'chandighard',email:'himanshu@gmail.com',phone_no:88989098,no_of_cus:10};
    var sql='INSERT INTO customer  SET ?';
    var query=connection.query(sql,post,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Rows...");
    })
});

app.get('/update/:phone_no',(req,res)=>
{
    var name1='Lisa'
    var sql=`UPDATE customer SET cusname='${name1}' WHERE phone_no= '${req.params.phone_no}'`;
    var query=connection.query(sql,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Updated...");
    })
});