const ProfileModel = require("../models/ProfileModel");
const jwt=require('jsonwebtoken');

exports.CreateProfile=async(req,res)=>{
    try{
        let reqBody=req.body;
        let data=await ProfileModel.create(reqBody);
        res.status(200).json({status:"success",data:data});
    }catch(err){
        res.json({status:"fail",message:err});
    }
}

exports.UserLogin=async(req,res)=>{
    try{
        let UserName=req.body['UserName'];
        let Password=req.body['Password'];
        let data = await ProfileModel.find({ UserName: UserName, Password: Password });
            if(data.length>0){
                //JWT token generate
                let Payload={exp:Math.floor(Date.now()/1000)+(24*60*60),
            data:data[0]}
                let token=jwt.sign(Payload,'it_is_secret')

                res.status(200).json({status:"success",token:token,data:data[0]});                
            }else{
                res.status(401).json({status:"unauthorized"});
            }

    }catch(err){
        res.json({status:"fail",message:err});
    }
}

exports.SelectProfile=async(req,res)=>{
    try{
        let UserName=req.headers['username'];
        let data=await ProfileModel.find({UserName:UserName});

            if(data.length>0){
                res.status(200).json({ status: "success", data: data });
            }else{
                res.status(404).json({ status: "fail", message: "Profile not found" });
            }

    }catch(err){
        res.json({status:"fail",message:err});
    }
}

exports.UpdateProfile=async(req,res)=>{
    try{
        let UserName = req.headers['username'];
        let newData = req.body;

        let result = await ProfileModel.updateOne({ UserName: UserName }, newData);

        res.json({status:"success",message:"Update Completed"})

    }catch(err){
        res.json({status:"fail",message:err});
    }
}


