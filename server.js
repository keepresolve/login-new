const express=require("express")
const static=require("express-static")
const fs=require("fs")
const server=express()
const sq=require("mysql")
const  url=require("url")
 var connection=sq.createConnection({
	host:"localhost",
	user:"root",
   password:"",
   database:"data_base"
})
 // // 简单的登录
 server.get("/login",function(req,res){
    var name=url.parse(req.url,true).query.name
    var password=url.parse(req.url,true).query.password
    console.log(name) 
    // console.log(name+"/12")
       connection.query("SELECT * FROM uersname WHERE id='"+name+"';",function(err,data){
           // res.writeHeader(200,{"Content-Type":"text/html;charset=utf-8"})
             if(!err){
              console.log(data)
              // var aa=eval("("+data+")")[0].id
              if(data==""){
                  res.send(`{
                     error:true,
                     data:"请去注册"
                  }`)
                  // res.send("请去注册")
                  // console.log(password)
                 res.end()
              }else{
                  connection.query("SELECT * FROM uersname WHERE password='"+password+"';",function(err,data){
                                           if(!err){
                                                 if(data==""){
                                                      res.send(`{
                                                         error:false,
                                                         data:"密码不正确"
                                                      }`)
                                                      res.end()
                                                 }else{
                                                    console.log(data+"/"+err)
                                                    res.send(`{
                                                      error:false,
                                                      data:"欢迎回来"+name+""
                                                        
                                                    }`)
                                                     res.end()
                                                 }

                                           }else{
                                               res.send(`{
                                                 error:true,
                                                 data:"服务器出错"
                                               }`)
                                                res.end()
                                           }
                           })
                               
              }
             
             }else{
              // console.log(err)
              res.send(`{
                error:true,
                data:"服务器错误"
              }`)
              res.end()
             }
       })
 })  
 // 简单的注册
 server.get("/add",function(req,res){
    var password1=url.parse(req.url,true).query.password
    var name1=url.parse(req.url,true).query.name
   
      connection.query("INSERT into uersname(ID,PASSWORD)VALUES('"+name1+"','"+password1+"');",function(err,data){
                 if(!err){
                    if(data==""){
                       res.send(`{
                        error:true,
                        data:"注册失败 用户名已存在"
                       }`)
                       res.end()
                    }else{
                      // console.log
                      res.send(`{
                        error:false,
                        data:"注册成功！请登录"
                      }`)
                      res.end()
                    }  
                 }else{ 
                    // res.writeHeader(200,{"Cont"})
                    console.log("出错了"+err)
                    res.send(`{
                      error:true,
                      data:"注册失败 用户名存在"
                    }`)
                    res.end()
                 }
                 console.log(err+"///\n"+data)
      })
 }) 
//更该密码
server.get("/updata",(req,res)=>{
   let name=req.query.name
   let pass=req.query.password
  connection.query(`updata into username set pass=${pass} WHERE id=${name}`,function(err,data){
      if(!err){
        res.send({
            error:false,
            data:"suceese"
        })
      }
  })
})
server.listen(8888,function(){
	console.log(8888)
})
server.use(static("www"))

