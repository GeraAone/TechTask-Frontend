import { DocumentMaster } from "./document";

export class Item {
  itemId: number;
  name: string;
  itemSum: number;
  document: DocumentMaster;
  editing?: boolean = false;
}
