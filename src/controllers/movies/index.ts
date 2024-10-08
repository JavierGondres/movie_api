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
         penalty,
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
            penalty,
         });

         if (result.error) return res.status(400).json(result);
         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };

   updateMovie = async (req: Request, res: Response) => {

      const { id } = req.params

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
         result = await this.movieModel.updateMovie(id, movieObj);

         if (result.error) return res.status(400).json(result);
         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };

   getAll = async (req: Request, res: Response) => {
      let message;
      try {
         let { filterByAvailability, sortBy, title, page, perPage, sortOrder, sortProps, exclusions } = req.query;

         if (req.decodedUserRole === Roles.USER || !req.decodedUserRole)
            filterByAvailability = "available";

         const movies = await this.movieModel.getAll(
            filterByAvailability,
            sortBy,
            title,
            Number(page),
            Number(perPage),
            sortOrder,
            sortProps,
            exclusions
         );

         if (!movies) {
            message = "Error al obtener peliculas";
            return res.status(500).json({
               error: true,
               message: message,
            });
         }
         return res.status(200).json(movies);
      } catch (error) {
         console.log(error);
         message = "Error grave obtener peliculas";
         return res.status(500).json({
            error: true,
            message: message,
         });
      }
   };
}
