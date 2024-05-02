import jwtToken from "jsonwebtoken";
import errorHandler from "./errorHandler";


const verifyToken=async(req,res,next)=>{
 const token=req.cookies.access_token;
 console.log(token);
 if(!token){
    return next(errorHandler(401,"Unauthorized!!!"))
 }
 jwtToken.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
        return next(err)
    }
    req.user=user;
    next();
 })
}