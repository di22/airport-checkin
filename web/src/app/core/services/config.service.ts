import { Injectable } from '@angular/core';
import {LabelsService} from "./labels.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private labelsService: LabelsService, private translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.labelsService.execute().subscribe(res => {
        this.translate.setTranslation('en', res);
        resolve(true)
      })
    });
  }
}
