import { Request, Response } from "express";
import { Movies } from "../../models/mongo/types";

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

      const movieObj: Partial<Movies & { likes?: number; updatesLog?: [] }> = {
         availability,
         description,
         imageURL,
         lastModifiedDate: new Date(),
         rentalPrice,
         salePrice,
         stock,
         title,
      };

      try {
         result = await this.movieModel.updateMovie(
            _id,
            movieObj,
         );

         if (result.error) return res.status(400).json(result);
         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
