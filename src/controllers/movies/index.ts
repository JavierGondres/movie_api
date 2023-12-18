import { Request, Response } from "express";
import { Movies } from "../../models/mongo/types";
import { Roles } from "../../types/enum";

export class MovieController {
   movieModel: any;

   constructor({ movieModel }: any) {
      this.movieModel = movieModel;
   }

   createMovie = async (req: Request, res: Response) => {
      const {
         availability,
         description,
         imageURL,
         rentalPrice,
         salePrice,
         stock,
         title,
      } = req.body;

      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      try {
         result = await this.movieModel.createMovie({
            availability,
            description,
            imageURL,
            lastModifiedDate: new Date(),
            rentalPrice,
            salePrice,
            stock,
            title,
         });

         if (result.error) return res.status(400).json(result);
         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };

   updateMovie = async (req: Request, res: Response) => {
      const {
         _id,
         availability,
         description,
         imageURL,
         rentalPrice,
         salePrice,
         stock,
         title,
      } = req.body;

      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      let commonProperties: Partial<
         Movies & { likes?: number; updatesLog?: [] }
      > = {
         description,
         imageURL,
         lastModifiedDate: new Date(),
         rentalPrice,
         salePrice,
         stock,
         title,
      };

      let movieObj: Partial<Movies & { likes?: number; updatesLog?: [] }>;

      if (req.decodedUserRole === Roles.ADMIN) {
         // Si el usuario es un administrador, agregamos la propiedad availability
         movieObj = {
            ...commonProperties,
            availability,
         };
      } else {
         // Si no es un administrador, simplemente asignamos las propiedades comunes
         movieObj = { ...commonProperties };
      }
      try {
         result = await this.movieModel.updateMovie(_id, movieObj);

         if (result.error) return res.status(400).json(result);
         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
