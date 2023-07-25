const express = require("express");
const ejs = require("ejs");
const {createClient} = require('@supabase/supabase-js')
const app = express();
var supabaseurl = 'https://lyiwrrnllifscjlpubul.supabase.co';
var supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aXdycm5sbGlmc2NqbHB1YnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAxMjUwMjAsImV4cCI6MjAwNTcwMTAyMH0.tl6W2--zpYV0Z1ocu8y6yDKX-3UaDfp_ZnHMzJqmfpo';

app.set('views',__dirname+'/views')
app.set('view engine','ejs');
var supabase = createClient(supabaseurl,supabasekey);

//get cssfile
app.get('/home.css',(req,res)=>{res.sendFile(__dirname+'/css/home.css')})

//listen home page
app.get('/',(req,res)=>{
    res.render('home')
})

//listen shop page
app.get('/:id',async(req,res)=>{
    let getid = req.params.id;
    let shop = await supabase.from('shop').select('*').eq('shopid',getid);
    let food = await supabase.from('food').select('*').eq('shop',getid);
    
    res.render('shop',{
        all:{
            "shop":shop.data,
            "food":food.data
        }
    })
    if(shop){}
})

app.listen(80,()=>{
    console.log("server started with port 80")
})