import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getCompanyRequestController = (dependencies: IDependencies) => {
  const {
    useCases: { getCompanyRequestUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("Authentication required: No user provided.");
      }
      const page = parseInt(req.query.page as string) || 1; // Current page number, default to 1
      const limit = parseInt(req.query.limit as string) || 10; // Number of users per page, default to 10

      const result = await getCompanyRequestUseCase(dependencies).execute(
        page,
        limit
      );
      if (!result) {
        throw new Error("Can't get companies requests at the moment");
      }
      const { totalPages, currentPage, data } = result;
      res.status(200).json({
        success: true,
        totalPages,
        currentPage,
        data,
        message: "Companies Requests Fetched",
      });
    } catch (error) {
      next(error);
    }
  };
};