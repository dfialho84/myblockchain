import { Request, Response, NextFunction } from "express";

export default function paginationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const page = parseInt(req.query.page as string) || 1; // Página atual, padrão é 1
    const limit = parseInt(req.query.limit as string) || 10; // Itens por página, padrão é 10

    if (page <= 0 || limit <= 0) {
        res.status(400).json({
            error: "Page and limit must be greater than 0",
        });
        return;
    }

    const offset = (page - 1) * limit; // Calcular o deslocamento (offset)

    // Adicionar paginação à requisição para uso posterior
    res.locals.pagination = { page, limit, offset };

    next();
}
