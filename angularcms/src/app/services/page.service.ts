import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class PageService {
  constructor(private http: Http) {}

  public pagesBS = new BehaviorSubject<string>(null);

  getPages() {
    return this.http.get('http://localhost:3000/pages').map(res => res.json());
  }

  getPage(slug) {
    return this.http
      .get('http://localhost:3000/pages/' + slug)
      .map(res => res.json());
  }

  getUsername(id) {
    return this.http
      .get('http://localhost:3000/users/name/' + id)
      .map(res => res.json());
  }
}
