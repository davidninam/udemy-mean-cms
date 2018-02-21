import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  successMsg = false;
  content: string;

  constructor(
    private sidebarService: SidebarService,
    private http: Http,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('data') !== '"admin"') {
      this.router.navigateByUrl('');
    } else {
      CKEDITOR.replace('content');
    }

    this.sidebarService.getSidebar().subscribe(res => {
      this.content = res.content;

      // this.successMsg = true;
      // setTimeout(
      //   function() {
      //     this.successMsg = false;
      //   }.bind(this),
      //   3000
      // );
    });
  }

  editSidebar(f) {
    const value = f.value;

    value.content = CKEDITOR.instances.content.getData();

    this.sidebarService.postSidebar(value).subscribe(res => {
      this.successMsg = true;
      setTimeout(
        function() {
          this.successMsg = false;
        }.bind(this),
        3000
      );
    });
  }
}
