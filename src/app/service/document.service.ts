import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Document} from "../model/document";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentUrl = 'http://localhost:4200/documents'
  constructor(private http: HttpClient) { }
  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.documentUrl);
  }
  getDocument(docNumber: String): Observable<Document>
  {
    const url =`${this.documentUrl}/${docNumber}`;
    return this.http.get<Document>(url);
  }
  create(newDocument: Document): Observable<Document>
  {
    const url = `${this.documentUrl}/${newDocument.number}`;
    return this.http.post<Document>(url, newDocument);
  }

  update(updDocument: Document): Observable<Document>
  {
    const url = `${this.documentUrl}/${updDocument.number}`;
    return this.http.put<Document>(url, updDocument);
  }

  delete(documentNumber: String): Observable<void>
  {
    const url = `${this.documentUrl}/${documentNumber}`;
    return this.http.delete<void>(url);
  }
}
