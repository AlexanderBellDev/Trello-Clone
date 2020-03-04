import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormBuilder, Validators} from "@angular/forms";
import {BoardService} from "../service/board.service";
import {Item} from "../model/item";
import {ItemDetailComponent} from "../item-detail/item-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {Board} from "../model/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  addToDoItemForm = this.formBuilder.group({
    itemName: ['', [Validators.required]]
  });
  addDoingItemForm = this.formBuilder.group({
    itemName: ['', [Validators.required]]
  });
  addDoneItemForm = this.formBuilder.group({
    itemName: ['', [Validators.required]]
  });
  addItemDoingSelected: boolean;
  addItemToDoSelected: boolean;
  addItemDoneSelected: boolean;
  itemHover = false;

  itemColor: string;
  boardProperties: Board;
  todo: Item[] = [];
  doing: Item[] = [];
  done: Item[] = [];
  itemsArray: Item[] = [];
  items: Item[] = [];
  private indexNumber: number;
  private newItem: Item;

  constructor(private formBuilder: FormBuilder, private boardService: BoardService, public dialog: MatDialog) {
  }

  username: string;

  ngOnInit() {

    if (sessionStorage.getItem('authenticatedUser')) {
      this.username = sessionStorage.getItem('authenticatedUser');
    } else {
      this.username = '';
    }

    this.boardService.getBoardProperties().subscribe(data => {
      this.boardProperties = data;
      this.itemColor = this.boardProperties.boardColor;
    }, () => {
      console.log('error')
    });


    this.boardService.getItems().subscribe(data => {
        this.items = data;
        console.log(this.items);
        for (let entry of this.items) {
          switch (entry.columnName) {
            case 'ToDo':
              this.todo.push(entry);
              break;
            case 'Doing':
              this.doing.push(entry);
              break;
            case 'Done':
              this.done.push(entry);
              break;
          }
        }
      },
      error => {
        console.log("Error", error);
      });
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.saveColumn();
  }


  addItem(columnName){
    switch (columnName) {
      case 'ToDo':
        this.addItemToDoSelected = true;
        break;
      case 'Doing':
        this.addItemDoingSelected = true;
        break;
      case 'Done':
        this.addItemDoneSelected = true;
        break;
    }
  }

  saveColumn() {
    this.todo.forEach((item, index) => {
      item.columnName = 'ToDo';
      item.indexNum = index;
      this.itemsArray.push(item);
    });
    this.doing.forEach((item, index) => {
      item.columnName = 'Doing';
      item.indexNum = index;
      this.itemsArray.push(item);
    });
    this.done.forEach((item, index) => {
      item.columnName = 'Done';
      item.indexNum = index;
      this.itemsArray.push(item);
    });
    this.saveItems(this.itemsArray);
  }

  saveItems(item) {
    this.boardService.saveItems(item).subscribe(() => {
      },
      error => {
        console.log("Error", error);
      })
  }

  saveItem(item) {
    this.boardService.saveItem(item).subscribe(data => {
        this.newItem = data;
        switch (this.newItem.columnName) {
          case 'ToDo':
            this.todo.push(this.newItem);
            this.addToDoItemForm.reset();
            break;
          case 'Doing':
            this.doing.push(this.newItem);
            this.addDoingItemForm.reset();
            break;
          case 'Done':
            this.done.push(this.newItem);
            this.addDoneItemForm.reset();
            break;
        }
      },
      error  => {
        console.log("Error", error);
      })
  }

  addItemContent(columnName){
    switch (columnName) {
      case 'ToDo':
        this.indexNumber = this.todo.length;
        this.addItemToDoSelected = false;
        this.newItem = new Item(this.boardProperties.username, this.addToDoItemForm.value.itemName, 'ToDo', '', this.indexNumber);
        break;
      case 'Doing':
        this.indexNumber = this.doing.length;
        this.addItemDoingSelected = false;
        this.newItem = new Item(this.boardProperties.username, this.addDoingItemForm.value.itemName, 'Doing', '', this.indexNumber);
        break;
      case 'Done':
        this.indexNumber = this.done.length;
        this.addItemDoneSelected = false;
        this.newItem = new Item(this.boardProperties.username, this.addDoneItemForm.value.itemName, 'Done', '', this.indexNumber);
        break;
    }
    this.saveItem(this.newItem);
  }

  cancelAddItemContent(columnName){
    switch (columnName) {
      case 'ToDo':
        this.addToDoItemForm.reset();
        this.addItemToDoSelected = false;
        break;
      case 'Doing':
        this.addDoingItemForm.reset();
        this.addItemDoingSelected = false;
        break;
      case 'Done':
        this.addDoneItemForm.reset();
        this.addItemDoneSelected = false;
        break;
    }
  }


  deleteItem(column:string, itemNumber:number){
    switch (column) {
      case 'ToDo':
        this.newItem = this.todo[itemNumber];
        this.boardService.deleteItemAction(this.newItem);
        this.todo.splice(itemNumber, 1);
        break;
      case 'Doing':
        this.newItem = this.doing[itemNumber];
        this.boardService.deleteItemAction(this.newItem);
        this.doing.splice(itemNumber, 1);
        break;
      case 'Done':
        this.newItem = this.done[itemNumber];
        this.boardService.deleteItemAction(this.newItem);
        this.done.splice(itemNumber, 1);
        break;
    }
  }

  openDialog(item:Item) {
    switch (item.columnName) {
      case 'ToDo':
        item = this.todo[item.indexNum];
        break;
      case 'Doing':
        item = this.doing[item.indexNum];
        break;
      case 'Done':
        item =  this.done[item.indexNum];
        break;
    }
    const dialogRef = this.dialog.open(ItemDetailComponent, {
      width: '800px',
      height: '420px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.newItem = result;
      switch (this.newItem.columnName) {
        case 'ToDo':
          this.todo[this.newItem.indexNum] = this.newItem;
          break;
        case 'Doing':
          this.doing[this.newItem.indexNum] = this.newItem;
          break;
        case 'Done':
          this.done[this.newItem.indexNum] = this.newItem;
          break;
      }
      console.log(this.newItem)
    });

  }

  //Show and hide delete function

  mouseEnter(item: Item) {
    item.delete = true;
  }
  mouseLeave(item: Item) {
    item.delete = false;
  }
}
