const express = require("express");
const app = express(); //express return a function
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jdhljsodj";

app.use(express.json()); // to parse post body in json

const users = [];

const generateToken = () => {
  const hash = ['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];

  let token = "";
  for(let i =0;i<30;i++)
  {
      token += hash[Math.floor(Math.random() * hash.length)];
  }
  return token;
}

app.post('/signup', function(req,res)
{
     const username = req.body.username;
     const password = req.body.password;

     const findUser = (users.find(u => u.username == username))

    if(!findUser)
    {
      users.push({
        username, password
      });

      res.json({
        "message" : "user signup successfully"
      });
    }else{
            res.json({
            "message" : "user already exists"
          });
    }

})

app.post('/signin' , function(req,res)
{
    //after signup , we have to generate token
     const username = req.body.username;
     const password = req.body.password;

     const findUser = users.find(u => u.username == username && u.password == password);

     if(findUser)
     {
        const token = jwt.sign({
          username: username}, JWT_SECRET
        );
        res.json({
          "token" : token
        });
     }else
     {
      res.status(403).json({
        "message" : "user don't exist"
      });
     }
})

app.get('/me', function(req,res){
       let token = req.headers.authorization;

       const decodedInfo = jwt.verify(       // we don't use db here
        token , JWT_SECRET)
       const username = decodedInfo.username;

      const userExists = users.find(u => u.username ===  username);
       if(userExists)
       {
         res.json({
           userExists
         })
       }else
      {
      res.status(403).json({
        "message" : "user don't exist"
      });
     }
})

app.listen(3000, ()=>
{
  console.log("App is listening on port 3000");
})