import {Express, Request} from 'express';
import fs from "fs";
const i18n = require('i18n');

const LABELS_DIR = __dirname + '../../../i18n';

i18n.configure({
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    directory: LABELS_DIR,
    objectNotation: true,
});

export class I18nService {
    static initLocals(app: Express): void {
        app.use(i18n.init)
    }
    static translate(req: Request, key: string): string {
        const lang = this.getCurrentLanguage(req);
        i18n.setLocale(lang);
        return i18n.__(key);
    }

    static getLabels(req: Request): {[key: string]: string} {
        const lang = this.getCurrentLanguage(req);
        const filePath = `${LABELS_DIR}/${lang}.json`;

        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            console.log(content)
            return content;
        }
        return {};
    }

    static getCurrentLanguage(req: Request): string {
        return req.acceptsLanguages(['en', 'nl']) || 'en';
    }
}