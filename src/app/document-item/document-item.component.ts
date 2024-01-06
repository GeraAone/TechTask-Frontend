import { Component, Input, OnInit } from '@angular/core';
import { DocumentMaster } from "../model/document";
import { Item } from "../model/item";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { DocumentService } from "../service/document.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, TableModule, ButtonModule,
    DocumentItemComponent, InputGroupModule, InputGroupAddonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent implements OnInit {

  @Input() document: DocumentMaster;

  isVisible: boolean = true;

  newItem: Item = {
    itemId: 0,
    name: '',
    itemSum: 0,
    document: new DocumentMaster
  }

  items: Item[];

  addForm: boolean = false;

  itemForm: FormGroup;

  selectedItem: Item = {
    itemId: 0,
    name: '',
    itemSum: 0,
    document: new DocumentMaster
  };

  constructor(private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private router: Router) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      itemSum: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getItem();
  }

  showAdd(): void {
    this.addForm = !this.addForm;
  }

  editMode(item: Item): void {
    item.editing = !item.editing;
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  getItem() {
    this.documentService.getItemsByDoc(this.document.docNumber)
      .subscribe((items: Item[]) => {
        this.items = items;
      });
  }

  addItem(): void {
    if (this.itemForm.valid) {

      const doc: DocumentMaster = {
        docNumber: this.document.docNumber
      }

      this.newItem = {
        name: this.itemForm.get('name')?.value,
        itemSum: this.itemForm.get('itemSum')?.value,
        document: doc,
        itemId: 0,
      };

      this.documentService.createItem(this.newItem)
        .subscribe((response: Item) => {
          console.log("Item added:", response);
          this.items.push(response);
        });
    } else {
      // Handle invalid form
      console.log('Form is invalid');
    }
  }

  editItem(updatedItem: Item): void {
    if (this.selectedItem === updatedItem) {
      this.selectedItem = null as any;
    }
    updatedItem.document = this.document

    this.documentService.updateItem(updatedItem)
      .subscribe(() => {
        this.getItem();
        this.selectedItem.editing = false;
      });
  }

  deleteItem(item: Item): void {
    if (window.confirm("Do you really want to delete the item?")) {
      this.documentService.deleteItem( this.document.docNumber, item.itemId,)
        .subscribe(() => {
          this.items = this.items.filter((i) => i !== item);
        });
    }
  }

  hideList(): void {
    this.isVisible = !this.isVisible
  }
}
