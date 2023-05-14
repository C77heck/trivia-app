export class HttpError extends Error {
    public message: string;
    public code: number;

    public constructor(message: string, code = 500) {
        super();
        this.message = message;
        this.code = code;
    }
}
