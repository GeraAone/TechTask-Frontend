import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { DocumentMaster} from "../model/document";
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentUrl = 'http://localhost:8080/documents'
  constructor(private http: HttpClient) {
  }

  getDocuments(): Observable<DocumentMaster[]> {
    return this.http.get<DocumentMaster[]>(this.documentUrl);
  }

  getDocument(docNumber: String): Observable<DocumentMaster>
  {
    const url =`${this.documentUrl}/${docNumber}`;
    return this.http.get<DocumentMaster>(url);
  }

  create(newDocument: DocumentMaster): Observable<DocumentMaster>
  {
    const url = `${this.documentUrl}`;
    return this.http.post<DocumentMaster>(url, newDocument);
  }

  update(updDocument: DocumentMaster): Observable<DocumentMaster>
  {
    const url = `${this.documentUrl}/${updDocument.docNumber}`;
    return this.http.put<DocumentMaster>(url, updDocument);
  }

  delete(documentNumber: number): Observable<void>
  {
    const url = `${this.documentUrl}/${documentNumber}`;
    return this.http.delete<void>(url);
  }

  getItemsByDoc(docNumber: number){
    const url =`${this.documentUrl}/${docNumber}/items`;
    return this.http.get<Item[]>(url);
  }

  getItems(){
    const url =`${this.documentUrl}/items`;
    return this.http.get<Item[]>(url);
  }

  createItem(newItem: Item): Observable<Item>
  {
    const url = `${this.documentUrl}/${newItem.document.docNumber}/items`;
    return this.http.post<Item>(url, newItem);
  }

  updateItem(updItem: Item): Observable<Item>
  {
    const url = `${this.documentUrl}/${updItem.document.docNumber}/items/${updItem.itemId}`;
    return this.http.put<Item>(url, updItem);
  }


  deleteItem(documentNumber: number, itemId: number): Observable<void>
  {
    const url = `${this.documentUrl}/${documentNumber}/items/${itemId}`;
    return this.http.delete<void>(url);
  }
}
