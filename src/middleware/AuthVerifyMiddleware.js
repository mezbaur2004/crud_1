const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let Token=req.headers['token']
    jwt.verify(Token,'it_is_secret',function(err,decoded){
        if(err){
            res.status(401).json({status:"unauthorized"});
        }else{
            let username=decoded['data']['UserName'];
            req.headers.username=username;
            next();
        }
    })
}