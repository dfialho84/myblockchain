import { ApiError } from "../validation";

export class OutOfBoundsError extends Error {
    constructor(message: string) {
        super(message);
    }
}
