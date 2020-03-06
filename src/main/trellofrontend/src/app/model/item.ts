export class Item {

  id?: number;
  username: string;
  itemName: string;
  columnName: string;
  itemDetail: string;
  indexNum: number;
  itemColor: string;
  delete: boolean;


  constructor(username: string, itemName: string, columnName: string, itemDetail: string, indexNum: number, itemColor?: string) {
    this.username = username;
    this.itemName = itemName;
    this.columnName = columnName;
    this.itemDetail = itemDetail;
    this.indexNum = indexNum;
    this.itemColor = itemColor;
  }
}
