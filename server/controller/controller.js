var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
          //  res.send(data)
         //   console.log(user)
           res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

//retrieve and return all users||retrieve and return a single user
exports.find=(req,res)=>{


    if(req.query.id){ //query parameter

       const id=req.query.id;
       Userdb.findById(id)
       .then(data=>{
        if(!data){
            res.status(404).send({message:"Not found user with id"+ id})
        }else{
            res.send(data)
        }
       }) 
       .catch(err=>{
        res.status(500).send({
            message:"Error retriving user id"+id
        })
       })
    }
    else{


    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message ||"Error occured while retriving user information"})
    })
}
}

//update a new identified  by userid

exports.update=(req,res)=>{

    if(!req.body){
        return res.status(400)
        .send({message:"Data to update can not be empty"})
    }

    const id=req.params.id;  //url parameter
    Userdb.findByIdAndUpdate(id,req.body)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update user with ${id}.Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error update user information"})
    })
}

//delete user with specified userid

exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete with id${id}.Maybe id is wrong`})
        }else{
            res.send({
                message:"User was deleted succefully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete user with id=" +id
        });
    });

}


