import { Roles } from "../../types/enum"
import { Request, Response, NextFunction } from "express"
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

   if(!req.decodedUserRole)
      return res.status(404).json({
         error: true,
         message: "Missing auth"
      })


    if(req.decodedUserRole.toLowerCase() === Roles.ADMIN){
       return next()
    }else{
       return res.status(403).send({
         error: true,
         message: "Not Admin"
       })
    }
 }