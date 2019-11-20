export class Items {

  id: number;
  username: string;
  itemName: string;
  columnName: string;
  itemDetail: string;
  indexNum: number;


  constructor(id: number, username: string, itemName: string, columnName: string, itemDetail: string) {
    this.id = id;
    this.username = username;
    this.itemName = itemName;
    this.columnName = columnName;
    this.itemDetail = itemDetail;
  }
}
