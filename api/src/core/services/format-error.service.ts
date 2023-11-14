import {GraphQLError} from "graphql/index";
import {Request} from "express";
import {I18nService} from "./i18.service";
import {ResponseCodes} from "../response-codes";

export class FormatErrorService {
    static formatError(req: Request): any {

        const errors: {[code: number]: () => void} = {
            9001: () => {
                this.throwError(req, 9001);
            },
            9002: () => {
                this.throwError(req, 9002);
            },
            9003: () => {
                this.throwError(req, 9003);
            },
            9004: () => {
                this.throwError(req, 9004);
            }
        }

        return errors;
    }

    static throwError(req: Request, code: number): void {
        const labels = I18nService.getLabels(req);
        throw new GraphQLError(labels[ResponseCodes[code]], {
            extensions: {code: "BAD_REQUEST", http: { status: 400, code: code }},
        });
    }
}