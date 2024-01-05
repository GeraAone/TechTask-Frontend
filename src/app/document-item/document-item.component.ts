import {Component, Input, OnInit} from '@angular/core';
import {Document} from "../model/document";
import {Item} from "../model/item";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../service/document.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [
    ButtonModule,CommonModule,
    TableModule, RouterLink
  ],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent implements OnInit{
@Input() document: Document ;

  isVisible: boolean = false;

  items: Item[];
  constructor(
   private route: ActivatedRoute,
   private docService: DocumentService
  ){}

  ngOnInit(): void
  {

  }

  addItem():void
  {

  }
  editItem(item: Item):void
  {

  }
  deleteItem(item: Item):void
  {

  }

  hideList():void {
    this.isVisible = !this.isVisible
  }
}
