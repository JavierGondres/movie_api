import { Roles } from "../../types/enum"

export const isAdmin = (req: any, res: any, next: any) => {
    if(req.decodedUserRole === Roles.ADMIN){
       next()
    }else{
       res.status(403).send({
         error: true,
         message: "Not Admin"
       })
    }
 }