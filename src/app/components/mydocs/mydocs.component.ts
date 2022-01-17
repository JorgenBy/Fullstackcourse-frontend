import { AuthenticationService } from './../../services/authentication.service';
import { DocsService } from './../../services/docs.service';
import { DocModel } from './../../models/doc-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mydocs',
  templateUrl: './mydocs.component.html',
  styleUrls: ['./mydocs.component.scss']
})
export class MydocsComponent implements OnInit {

  myDocsList: DocModel[] = [];

  constructor(private docService: DocsService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.id) {
      this.docService.getMyDocs(this.authenticationService.currentUserValue.id)
        .subscribe({
          next: (data) => {
            this.myDocsList = data;
          },
          error: (data) => {
            alert(`${data.error}`);
          }
        });
    }
  }

  cellDeleted(docChildId: string) {
    this.myDocsList = this.myDocsList.filter(doc => doc.id !== docChildId);
  }




}

