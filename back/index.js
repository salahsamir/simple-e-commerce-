import express from 'express'
import mysql from 'mysql2'
import cors from "cors"
import { DataTypes, INTEGER, Op, Sequelize } from 'sequelize'
const port=5000
const app=express()
app.use(express.json(),cors())
const sequelize = new Sequelize('ecom', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
const schema= sequelize.define('image',{
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false ,
    autoIncrement:true
},
imagepath: {
    type: DataTypes.STRING
  }

})
const schemaproducts= sequelize.define('product_info',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false ,
        autoIncrement:true
    },
    name: {
        type: DataTypes.STRING
      }
      ,
      path:{
        type:DataTypes.STRING
      },
      category:{
        type:DataTypes.STRING
      }
      ,
      salary:{
        type:DataTypes.FLOAT,

      }
    
    })
const schema_sells= sequelize.define('sell',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false ,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING
          },
          path:{
            type:DataTypes.STRING
          },
          category:{
            type:DataTypes.STRING
          }
          ,
          salary:{
            type:DataTypes.FLOAT
          }
        
        })
sequelize.sync()
/* get all images*/
app.get('/images',async(req,res)=>{
    let images =await schema.findAll()
    return res.json({message:"success",images})
 })
/* get all products*/
app.get('/products',async(req,res)=>{
    let products =await schemaproducts.findAll()
    return res.json({message:"success",products})
 })
 /* search by category*/
app.post('/products',async(req,res)=>{
    let {category}=req.body
    console.log(category);
    let products =await schemaproducts.findAll({
        where:{
            category:{
              [Op.like]:`%${category}%`
            }
        }
    })
  
    return res.json({message:"success",products})
 })





/*get sells*/
app.get('/sells',async(req,res)=>{
   let sells =await schema_sells.findAll()
   return res.json({message:"success",sells})
})
/* post to sells*/
app.post('/sells',async(req,res)=>{
    const{name,salary,category,path}=req.body
   let newselles= await schema_sells.create({name,path,salary,category})
    return res.json({message:"success",newselles})
})
/*delete one selles*/
app.delete('/sells',async(req,res)=>{
    const{id}=req.query
  let deletesells= await schema_sells.destroy({
    where:{
        id
    }
  })
  if(deletesells){
    return res.json({message:"done",deletesells})

  }else{
    return res.json({message:"fail"})

  }

})
app.delete('/sell',async(req,res)=>{
let deletesells= await schema_sells.destroy({
  truncate:true
})
return res.json({message:"done",deletesells})

})



// })
// const sql = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'ecom'
//   });
// app.get('/shop',(req,res,next)=>{
//     const query=`select * from shopimages`
//     sql.execute(query,(error,result)=>{
//         if(error){
//             return res.json({message:"error"})
//         }
//         return res.json({result})

//     })
// })
// app.get('/shops',(req,res,next)=>{
//     const query=`select * from products`
//     sql.execute(query,(error,result)=>{
//         if(error){
//             return res.json({message:"error"})
//         }
//         return res.json({result})

//     })
// })
// app.post('/shop',(req,res,next)=>{
//     const{name,price,path}=req.body
//     const query=`insert into selles (name,price,path) values('${name}',${price},'${path}')`
//     sql.execute(query,(error,result)=>{
//         if(error){
//             return res.json({message:"error"})
//         }
//         return res.json({result})

//     })
// })
// app.get('/selles',(req,res,next)=>{
//     const query=`select * from selles`
//     sql.execute(query,(error,result)=>{
//         if(error){
//             return res.json({message:"error"})
//         }
//         return res.json({result})

//     })
// })
app.listen(port,()=>{
    console.log("server is running  ......");
})