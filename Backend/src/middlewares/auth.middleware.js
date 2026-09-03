const jwt=require('jsonwebtoken');
async function authUser(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        });
    }
    const isBlacklisted=await tokenBlacklistModel.findOne({ token });
    if(isBlacklisted){
        return res.status(401).json({
            message:'Token is blacklisted'
        });
    }
    
    try{
        const decoded=jwt.verify(token, process.env.Jwt_Secret_key);
        req.user=decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message:'Invalid token'
        });
    }
}

module.exports=authUser;