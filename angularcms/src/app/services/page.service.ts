import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/map';

@Injectable()
export class PageService {
  // private http: Http
  constructor(private http: HttpClient) {}

  // public pagesBS = new BehaviorSubject<string>(null);
  public pagesBS = new BehaviorSubject<Object>(null);

  getPages() {
    return this.http.get('http://localhost:3000/pages');
    // return this.http.get('http://localhost:3000/pages').map(res => res.json());
  }

  getPage(slug) {
    return this.http.get('http://localhost:3000/pages/' + slug);
    // return this.http
    //   .get('http://localhost:3000/pages/' + slug)
    //   .map(res => res.json());
  }

  getUsername(id) {
    return this.http.get('http://localhost:3000/users/name/' + id);
    // return this.http
    //   .get('http://localhost:3000/users/name/' + id)
    //   .map(res => res.json());
  }

  postAddPage(data) {
    return this.http.post('http://localhost:3000/pages/add-page', data);
    // return this.http
    //   .post('http://localhost:3000/pages/add-page', data)
    //   .map(res => res.json());
  }

  getEditPage(id) {
    return this.http.get('http://localhost:3000/pages/edit-page/' + id);
    // return this.http
    //   .get('http://localhost:3000/pages/edit-page/' + id)
    //   .map(res => res.json());
  }

  postEditPage(data) {
    return this.http.post(
      'http://localhost:3000/pages/edit-page/' + data.id,
      data
    );
    // return this.http
    //   .post('http://localhost:3000/pages/edit-page/' + data.id, data).map(res => res.json());
  }

  getDeletePage(id) {
    return this.http.get('http://localhost:3000/pages/delete-page/' + id);
    // return this.http
    //   .get('http://localhost:3000/pages/delete-page/' + id)
    //   .map(res => res.json());
  }
}
