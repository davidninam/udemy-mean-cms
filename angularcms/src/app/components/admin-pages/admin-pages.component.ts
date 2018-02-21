import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {
  pages: any;
  successMsg = false;
  errorMsg = false;

  constructor(private router: Router, private pageService: PageService) {}

  ngOnInit() {
    // Restricted non-admin users to get access to this page
    if (localStorage.getItem('data') !== '"admin"') {
      this.router.navigateByUrl('');
    }

    this.pages = this.pageService.pagesBS;
  }

  deletePage(id) {
    if (confirm('Are you sure, you want to delete this page?')) {
      this.pageService.getDeletePage(id).subscribe(res => {
        if (res === 'errorInDelete') {
          this.errorMsg = true;
          setTimeout(
            function() {
              this.errorMsg = false;
            }.bind(this),
            3000
          );
        } else {
          this.successMsg = true;
          setTimeout(
            function() {
              this.successMsg = false;
            }.bind(this),
            3000
          );
        }
        this.pageService.getPages().subscribe(resPages => {
          this.pageService.pagesBS.next(resPages);
        });
      });
    }
  }
}
