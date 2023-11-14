import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Observable} from "rxjs";
import {ApolloQueryResult, gql} from "@apollo/client/core";
import {Checkin} from "./models/checkin.model";

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  constructor(private apollo: Apollo) {
  }

  execute(checkinDate: Checkin): Observable<ApolloQueryResult<any>> {
    const value = checkinDate;
    value.code = +value.code;
    value.lastname = value.lastname.toLowerCase();

    return this.apollo
    .watchQuery<any>({
      query: gql`

          query checkin($code: Int, $lastname: String, $date: String) {
            checkin(code: $code, lastname: $lastname, date: $date) {
              message
              status
            }
          }

      `,
      context: {
        headers: new HttpHeaders().set("Accept-Language", "en"),
      },
      variables: {...value}
    })
    .valueChanges
  }
}
