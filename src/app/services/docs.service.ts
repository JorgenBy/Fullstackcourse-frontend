import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DocModel } from '../models/doc-model';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(private httpClient: HttpClient) { }

  getMyDocs(id: string): Observable<DocModel[]> {
    const url = `${environment.ENDPOINTS.DOC_FOR_USER}/${id}`;
    return this.httpClient.get<DocModel[]>(url);
  }

  deleteDocument(docId: string) {
    const url = `${environment.ENDPOINTS.DOC_DELETE}/${docId}`;
    return this.httpClient.delete(url);
  }

  fetchDoc(docId: string): Observable<DocModel> {
    const url = `${environment.ENDPOINTS.DOC_FETCH}/${docId}`;
    return this.httpClient.get<DocModel>(url);
  }

  saveDoc(docModel: DocModel): Observable<DocModel> {
    const url = `${environment.ENDPOINTS.DOC_UPDATE}`;
    return this.httpClient.put<DocModel>(url, docModel);
  }

  createDoc(docModel: DocModel): Observable<DocModel>  {
    const url = `${environment.ENDPOINTS.DOC_CREATION}`;
    return this.httpClient.post<DocModel>(url, docModel);
  }

  fetchRecentDocuments(): Observable<DocModel[]> {
    const url = `${environment.ENDPOINTS.DOC_RECENT}`;
    return this.httpClient.get<DocModel[]>(url);
  }
}

