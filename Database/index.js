const express = require("express");
const JWT_SECRET = "78e8u9e";
const { UserModel, todoModel } = require("./db");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://sakshiP:12345@zerodhacluster.nkmwj.mongodb.net/databasecheck")
.then(() =>
  console.log("Db Connected")
)

app.use(express.json());

app.post('/signup', async function(req,res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const userExist = await UserModel.findOne({
    name : name,
    email: email
  })

  if(!userExist)
  {
         await UserModel.create({
          name : name,
          email: email,
          password : password
         })
         res.json({
          "message" : "User sign in"
         })
  }else
  {
    res.status(403).json({
      "message": "User already exists"
    });
  }

})

app.post('/signIn', async function(req,res){
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

   const userExist = await UserModel.findOne({
    name : name,
    email: email
  })

   if(userExist)
   {
       const token = jwt.sign({ name }, JWT_SECRET);
       res.json({"token " : token })
   }else{
    res.json("Invalid credentials");
   }
})

function auth(req, res, next){
      let token = req.headers.authorization;

      const decodedInfo = jwt.verify(token, JWT_SECRET);
      if(decodedInfo)
      {
         req.id = decodedInfo._id;
         next();
      }else{
        res.json({
          "message" : "User don't exist"
        });
      }
}

app.post('/todos', auth,  async function(req,res){
    const description = req.body.description;
    const userId = req.id;
    const todo =  await todoModel.create({  // authorize , we can make todos
      description : description,
      done: true,
      userId : userId
    })
    res.json({
      todo
    });
})

app.get('/todos',auth, async function(req,res){
  const data =  await todoModel.findOne({
    userId : req.id
  });

  res.json({
    data
  });
})

app.listen(3000, (req,res) => {
  console.log("listening to port 3000");
})