import { Request, Response } from "express";

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
         lastModifiedDate,
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

      const date = new Date(lastModifiedDate)

      try {
         result = await this.movieModel.createMovie({
            availability,
            description,
            imageURL,
            lastModifiedDate: date,
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
}
