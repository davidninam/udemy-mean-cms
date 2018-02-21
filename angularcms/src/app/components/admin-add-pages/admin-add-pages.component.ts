import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Router } from '@angular/router';

// Declare 3rd party editor
declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-add-pages',
  templateUrl: './admin-add-pages.component.html',
  styleUrls: ['./admin-add-pages.component.css']
})
export class AdminAddPagesComponent implements OnInit {
  successMsg = false;
  errorMsg = false;
  title: string;
  content: string;

  constructor(private pageService: PageService, private router: Router) {}

  ngOnInit() {
    CKEDITOR.replace('content');
  }

  addPage(f) {
    console.log(f);

    const value = f.value;
    const valid = f.valid;
    f.reset();

    if (valid) {
      this.pageService.postAddPage(value).subscribe(res => {
        if (res === 'pageExists') {
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
    } else {
      console.log('Form is not valid');
    }
  }
}
