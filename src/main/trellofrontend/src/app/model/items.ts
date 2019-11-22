export class Items {

  id?: number;
  username: string;
  itemName: string;
  columnName: string;
  itemDetail: string;
  indexNum: number;


  constructor(username: string, itemName: string, columnName: string, itemDetail: string, indexNum: number) {
    this.username = username;
    this.itemName = itemName;
    this.columnName = columnName;
    this.itemDetail = itemDetail;
    this.indexNum = indexNum;
  }
}
