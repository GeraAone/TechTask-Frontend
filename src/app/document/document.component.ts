import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {Document} from "../model/document";
import {DocumentItemComponent} from "../document-item/document-item.component";
import {DocumentService} from "../service/document.service";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TableModule, ButtonModule,
    DocumentItemComponent, InputGroupModule, InputGroupAddonModule, FormsModule],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent implements OnInit{
  addDocument: Document;

  documents: Document[];

  selectedDocument: Document ;
  addForm: boolean = false //показать форму с вводом данных

  constructor(
    private documentService: DocumentService,
    private router: Router) {
  }
  showAdd():void
  {
    this.addForm = !this.addForm;
  }

  ngOnInit():void
  {
    this.documentService.getDocuments()
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
  }

  onSelect(document: Document):void
  {
    this.selectedDocument = document;
  }
  addDoc(): void
  {
    if(this.addDocument == null) {return;}
    this.documentService.create(this.addDocument)
      .subscribe((response: Document) => {
      this.documents.push(response);
      this.selectedDocument = response;
    });

  }
  editDoc(updDocument: Document): void
  {
    if (this.selectedDocument === updDocument) {
      this.selectedDocument = null as any;
    }
    this.documentService.update(updDocument)
      .subscribe(() => {
        this.documentService.getDocuments()
          .subscribe((documents: Document[]) => {
            this.documents = documents;
          });
      });
  }
  deleteDoc(doc: Document):void
  {
    if (this.selectedDocument && this.selectedDocument.number === doc.number) {
      this.selectedDocument = null as any;
    }
    this.documentService.delete(doc.number)
      .subscribe(() => {
        this.documents = this.documents.filter(document => document.number !== doc.number);
      });
  }

  goToItems():void {
    const url = `/documents/${this.selectedDocument?.number}/items`
    this.router.navigate([url]);
  }
}
