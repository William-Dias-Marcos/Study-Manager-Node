import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      const fieldErrors = result.error.flatten().fieldErrors;

      for (const key in fieldErrors) {
        if (fieldErrors[key]?.length) {
          formattedErrors[key] = fieldErrors[key]![0];
        }
      }

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    req.body = result.data;
    next();
  };
};
