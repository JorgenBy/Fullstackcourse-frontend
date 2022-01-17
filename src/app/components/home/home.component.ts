import { DocsService } from 'src/app/services/docs.service';
import { DocModel } from './../../models/doc-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recentDocs: DocModel[] = [];

  constructor(private docsService: DocsService) {
  }

  ngOnInit(): void {

    this.fetchRecentDocs();

  }

  reloadRecentDocs() {
    this.fetchRecentDocs();
  }

  fetchRecentDocs() {
    this.docsService.fetchRecentDocuments()
      .subscribe({
        next: (data) => this.recentDocs = data,
        error: (data) => alert(`Recent documents could not be fetched: ${data.error}`)
  });
  }

}

