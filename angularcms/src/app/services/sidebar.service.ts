import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class SidebarService {
  // constructor(private http: Http) {}
  constructor(private http: HttpClient) {}

  getSidebar() {
    // return this.http
    //   .get('http://localhost:3000/sidebar/edit-sidebar')
    //   .map(res => res.json());
    return this.http.get('http://localhost:3000/sidebar/edit-sidebar');
  }

  postSidebar(data) {
    // return this.http
    //   .post('http://localhost:3000/sidebar/edit-sidebar', data)
    //   .map(res => res.json());
    return this.http.post('http://localhost:3000/sidebar/edit-sidebar', data);
  }
}
