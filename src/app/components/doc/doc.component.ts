import { AuthenticationService } from './../../services/authentication.service';
import { DocsService } from 'src/app/services/docs.service';
import { DocModel } from './../../models/doc-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

  doc: DocModel = new DocModel;
  content = '';
  docIdParam = '';
  docTitle = '';
  createNewDoc = false;

  constructor(private route: ActivatedRoute,
    private docsService: DocsService,
    private router: Router,
    private authService: AuthenticationService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.docIdParam = params['id'];
      }
    });

  }

  ngOnInit(): void {

    if (this.docIdParam && this.docIdParam !== 'new') {
      this.fetchDocument();
    } else {
      if (this.docIdParam === 'new') {
        this.createNewDoc = true;
        this.doc = new DocModel();
        this.doc.userId = this.authService.currentUserValue.id;
      }
    }

  }

  fetchDocument() {

    this.docsService.fetchDoc(this.docIdParam)
      .subscribe({
        next: (data) => {
          this.doc = data;
          this.content = this.doc.content;
          this.docTitle = this.doc.title;
        },
        error: (data) => {
          alert(`Couldn't fetch doc ${this.docIdParam}: ${data.error}`);
        }
      })
  }

  loadSuccesful() {
    console.log('Load successful');

  }

  onError(event: any) {
    alert(`Couldn't load doc ${this.docIdParam}: ${event}`);
  }

  saveDoc() {

    this.doc.content = this.content;
    this.doc.updatedAt = '';
    this.doc.title = this.docTitle;

    if (this.createNewDoc) {
      this.docsService.createDoc(this.doc)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/mydocs']);
          },
          error: (data) => {
            console.log(data);
            alert(`Doc couldn't be saved: ${data}`);
          }
        });
    } else {
      this.docsService.saveDoc(this.doc)
        .subscribe({
          next: () => this.router.navigate(['/mydocs']),
          error: (data) => {
            alert(`Doc couldn't be saved: ${data}`) 
          }    
        });
    }
  }
}

