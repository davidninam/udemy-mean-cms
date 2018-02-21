import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.css']
})
export class AdminEditPageComponent implements OnInit {
  page: any;
  id: string;
  title: string;
  content: string;
  successMsg = false;
  errorMsg = false;
  errorMsg2 = false;
  param: any;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('data') !== '"admin"') {
      this.router.navigateByUrl('');
    } else {
      CKEDITOR.replace('content');
    }
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.pageService.getEditPage(this.param).subscribe(page => {
        this.page = page;
        this.id = page._id;
        this.title = page.title;
        this.content = page.content;
      });
    });
  }

  editPage(f) {
    const value = f.value;
    const valid = f.valid;
    // f.reset();

    if (valid) {
      value.content = CKEDITOR.instances.content.getData();
      this.pageService.postEditPage(value).subscribe(res => {
        if (res === 'pageExists') {
          this.errorMsg = true;
          setTimeout(
            function() {
              this.errorMsg = false;
            }.bind(this),
            3000
          );
        } else if (res === 'errorInEdit') {
          this.errorMsg2 = true;
          setTimeout(
            function() {
              this.errorMsg2 = false;
            }.bind(this),
            3000
          );
        } else if (res === 'ok') {
          this.successMsg = true;
          setTimeout(
            function() {
              this.successMsg = false;
            }.bind(this),
            3000
          );
        }
        // CKEDITOR.instances.content.setData('');
        this.pageService.getPages().subscribe(resPages => {
          this.pageService.pagesBS.next(resPages);
        });
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
