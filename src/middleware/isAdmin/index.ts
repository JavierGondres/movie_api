import { Roles } from "../../types/enum"
import { Request, Response, NextFunction } from "express"
export const isAdmin = (roles: Roles[]) => (req: Request, res: Response, next: NextFunction) => {
   if(!req.decodedUserRole)
      return res.status(404).json({
         error: true,
         message: "Missing auth"
      })

   const isValid = roles.some(role => req.decodedUserRole.toLowerCase() === role)

    if(isValid){
       return next()
    }else{
       return res.status(403).send({
         error: true,
         message: `Not ${roles}`
       })
    }
 }