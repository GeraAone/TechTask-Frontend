import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DocumentMaster } from "../model/document";
import { DocumentItemComponent } from "../document-item/document-item.component";
import { DocumentService } from "../service/document.service";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Item } from '../model/item';
@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TableModule, ButtonModule,
    DocumentItemComponent, InputGroupModule, InputGroupAddonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent implements OnInit {

  addDocument: DocumentMaster = {
    docId: 0,
    docNumber: 0,
    date: '',
    docSum: 0,
    notes: ''
  };

  isEditMode = false;
  documents: DocumentMaster[] = [];
  items: Item[] = [];

  selectedDocument: DocumentMaster = {
    docId: 0,
    docNumber: 0,
    date: '',
    docSum: 0,
    notes: ''
  };

  addForm: boolean = false;

  documentForm: FormGroup;
  isValidateError = false;

  constructor(private formBuilder: FormBuilder, private documentService: DocumentService,
    private router: Router) {
    this.documentForm = this.formBuilder.group({
      docNumber: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['']
    });
  }

  showAdd(): void {
    this.addForm = !this.addForm;
  }

  editMode(document: DocumentMaster): void {
    document.editing =  !document.editing;
  }


  ngOnInit(): void {
    this.documentService.getDocuments()
      .subscribe((documents: DocumentMaster[]) => {
        this.documents = documents;
      });
    this.getItem();
  }

  getItem() {
    this.documentService.getItems()
      .subscribe((items: Item[]) => {
        this.items = items;
      });
  }

  onSelect(document: DocumentMaster): void {
    this.selectedDocument = document;
  }

  addDoc(): void {
    if (this.documentForm.valid) {
      this.addDocument = {
        docId: 0,
        docNumber: this.documentForm.get('docNumber')?.value,
        date: this.documentForm.get('date')?.value,
        docSum: 0, // Set to a default value or calculate based on your logic
        notes: this.documentForm.get('notes')?.value
      };

      this.documentService.create(this.addDocument)
        .subscribe((response: DocumentMaster) => {
          console.log("Document added:", response);
          this.documents.push(response);
          this.selectedDocument = response;
        },
        (error)=>{
          this.isValidateError = true
        });
    } else {
      // Handle invalid form
      console.log('Form is invalid');
    }
  }

  editDoc(updDocument: DocumentMaster): void {
    if (this.selectedDocument === updDocument) {
      this.selectedDocument = null as any;
    }
    this.documentService.update(updDocument)
      .subscribe(() => {
        this.documentService.getDocuments()
          .subscribe((documents: DocumentMaster[]) => {
            this.documents = documents;
          });
      });
  }

  deleteDoc(doc: DocumentMaster): void {
    if (window.confirm("Do you really want to delete the document?")) {
      if (this.selectedDocument && this.selectedDocument.docNumber === doc.docNumber) {
        this.selectedDocument = null as any;
      }
      this.documentService.delete(doc.docNumber)
        .subscribe(() => {
          this.documents = this.documents.filter(document => document.docNumber !== doc.docNumber);
        });
    }

  }

  goToItems(): void {
    const url = `/documents/${this.selectedDocument?.docNumber}/items`
    this.router.navigate([url]);
  }
}
