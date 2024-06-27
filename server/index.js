const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "KAlana#23",
    database: "crud"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//api for select
app.get("/api/get", (req , res) =>{
    const sqlGet = "SELECT * FROM deva";
    db.query(sqlGet, (error, result) => {
        res.send(result);
  });
});

//api for insert
app.post("/api/post", (req , res) =>{
    const {name, email, contact} =req.body;
    const sqlInsert = "INSERT INTO deva (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error){
            console.log(error);
        }
    });
});

//api for delete
app.delete("/api/remove/:id", (req , res) =>{
    const {id} =req.params;
    const sqlRemove = "DELETE FROM deva WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
        }
    });
});

//get data to update api
app.get("/api/get/:id", (req , res) =>{
const {id} = req.params;
    const sqlGet = "SELECT * FROM deva WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
    
        if (error) {
            console.log(error);
        }
        res.send(result);
  });
});

//update api
app.put("/api/update/:id", (req , res) =>{
        const {id} = req.params;
        const {name, email, contact} =req.body;
        const sqlUpdate = "UPDATE deva SET name = ?, email = ?, contact = ? WHERE id = ?";
        db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        
            if (error) {
                console.log(error);
            }
            res.send(result);
      });
    });
    


//api for check insert
app.get("/", (req , res) => {
   // const sqlInsert = "INSERT INTO deva (name, email, contact) VALUES ('kamal', 'kamal@gmail.com', 'ccbc')";
    //db.query(sqlInsert, (error, result) => {
       // console.log("error", error);
       // console.log("result", result);
       // res.send("Hello Express");
  //  });
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})