import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {map, Observable} from "rxjs";
import {ApolloQueryResult, gql} from "@apollo/client/core";

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  constructor(private apollo: Apollo) {
  }

  execute(): Observable<ApolloQueryResult<any>> {
    return this.apollo
    .watchQuery<any>({
      query: gql`
        {
          labels
        }
      `,
      context: {
        headers: new HttpHeaders().set("Accept-Language", "en"),
      }
    })
    .valueChanges.pipe(map(res => res.data['labels']))
  }
}
