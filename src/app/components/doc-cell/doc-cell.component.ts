import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocModel } from 'src/app/models/doc-model';
import { DocsService } from 'src/app/services/docs.service';

@Component({
  selector: 'app-doc-cell',
  templateUrl: './doc-cell.component.html',
  styleUrls: ['./doc-cell.component.scss']
})
export class DocCellComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private docService: DocsService,
    private router: Router) { }

  @Input()
  doc!: DocModel;

  @Output()
  docDeleted: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  availabilityChanged: EventEmitter<void> = new EventEmitter();

  docUserDisplayName = '';

  ngOnInit(): void {

    if (this.currentUserIsOwner()) {
      this.docUserDisplayName = this.authenticationService.currentUserValue.displayName;
    } else {
      this.fetchUserInfo(this.doc.userId);
    }
  }

  deleteDocument(event: any) {

    this.docService.deleteDocument(this.doc.id)
      .subscribe(
        data => {
          this.docDeleted.emit(this.doc.id);
        },
        error => {
          alert(`Doc ${this.doc.id} was NOT deleted: ` + error.message );
        }
      );

  }

  currentUserIsOwner() {

    if (this.doc == null || this.doc.id == null || this.authenticationService.currentUserValue == null) {
      return false;
    }

    const docOwner = this.doc.userId;
    const currentUserID = this.authenticationService.currentUserValue.id;

    return docOwner === currentUserID;
  }

  cellClicked() {
    if (this.doc && this.doc.id) {
      this.router.navigate(['/doc', this.doc.id]);
    }
  }

  cellStatusChange(event: any) {
    const status = event.target.checked;
    const updateAtTemp = this.doc.updatedAt;

    this.doc.updatedAt = '';
    this.doc.available = status;
    this.docService.saveDoc(this.doc)
      .subscribe(
        data => {
          this.doc = data;
          this.availabilityChanged.emit();
        },
        error => {
          this.doc.available = !status;
          this.doc.updatedAt = updateAtTemp;
          alert(`Doc ${this.doc.id} was NOT saved: ${error.message}`);
        }
      );
  }

  fetchUserInfo(userId: string) {

    this.authenticationService.fetchUserInfo(userId)
      .subscribe(
        data => {
          if (data) {
            this.docUserDisplayName = data.displayName;
          }
        },
        error => {
          console.log(`User couldn't not be fetched for user id ${userId}`);
        }
      );
  }
}

