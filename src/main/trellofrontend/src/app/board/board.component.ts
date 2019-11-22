import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormBuilder, Validators} from "@angular/forms";
import {ItemService} from "../service/item.service";
import {Items} from "../model/items";
import {ItemDetailComponent} from "../item-detail/item-detail.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private formBuilder: FormBuilder, private itemsService: ItemService, public dialog: MatDialog) {
  }

  todo: Items[] = [];
  doing: Items[] = [];
  done: Items[] = [];
  itemsArray: Items[] = [];
  items: Items[] = [];
  private indexNumber: number;
  private newItem: Items;

  ngOnInit() {
    this.itemsService.getItems('Alex').subscribe(data => {
        this.items = data;
        console.log(this.items);
        for (let entry of this.items) {
          if (entry.columnName === 'ToDo') {
            this.todo.push(entry);
          }
          if (entry.columnName === 'Doing') {
            this.doing.push(entry);
          }
          if (entry.columnName === 'Done') {
            this.done.push(entry)
          }
        }
      },
      error => {
        console.log("Error", error);
      });


  }

  drop(event: CdkDragDrop<Items[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.saveColumn();
  }

  addItemDoing() {
    this.addItemDoingSelected = true;
  }

  addItemToDo() {
    this.addItemToDoSelected = true;
  }

  addItemDone() {
    this.addItemDoneSelected = true;
  }

  saveColumn() {

      this.todo.forEach((item, index) => {
        item.columnName = 'ToDo';
        item.indexNum = index;
        this.itemsArray.push(item);
        //this.saveItem(item);
      });
      this.doing.forEach((item, index) => {
        item.columnName = 'Doing';
        item.indexNum = index;
        this.itemsArray.push(item);
      //  this.saveItem(item);
      });
        this.done.forEach((item, index) => {
          item.columnName = 'Done';
          item.indexNum = index;
          this.itemsArray.push(item);
       //   this.saveItem(item);
        });
        this.saveItems(this.itemsArray);
  }

  saveItems(item){
    this.itemsService.saveItems(item).subscribe(data  => {
      },
      error  => {
        console.log("Error", error);
      })
  }
  saveItem(item){
    this.itemsService.saveItem(item).subscribe(data  => {
      },
      error  => {
        console.log("Error", error);
      })
  }

  // get f() {
  //   return this.addItemForm.controls;
  // }

  addToDoItemContent() {
    this.indexNumber = this.todo.length;
    this.addItemToDoSelected = false;
    this.newItem = new Items('Alex',this.addToDoItemForm.value.itemName,'ToDo','',this.indexNumber);
    this.todo.push(this.newItem);
    this.saveItem(this.newItem);
    this.addToDoItemForm.reset();
  }

  cancelToDoAddItemContent() {
    this.addToDoItemForm.reset();
    this.addItemToDoSelected = false;
  }


  addDoingItemContent() {
    this.indexNumber = this.doing.length;
    this.addItemDoingSelected = false;
    this.newItem = new Items('Alex',this.addDoingItemForm.value.itemName,'Doing','',this.indexNumber)
    this.doing.push(this.newItem);
    this.saveItem(this.newItem);
    this.addDoingItemForm.reset();
    console.log(this.doing)
  }

  cancelDoingAddItemContent() {
    this.addDoingItemForm.reset();
    this.addItemDoingSelected = false;
  }

  addDoneItemContent() {
    this.indexNumber = this.done.length;
    this.addItemDoneSelected = false;
    this.newItem = new Items('Alex',this.addDoneItemForm.value.itemName,'Done','',this.indexNumber);
    this.done.push(this.newItem);
    this.saveItem(this.newItem);
    console.log(this.done);
    this.addDoneItemForm.reset();
  }

  cancelDoneAddItemContent() {
    this.addDoneItemForm.reset();
    this.addItemDoneSelected = false;
  }


  deleteToDoItem(item: number) {
    this.newItem = this.todo[item];
    this.itemsService.deleteItem(this.newItem).subscribe(data  => {
      console.log('Delete successful ')
      },
      error  => {
        console.log("Error", error);
      });
    this.todo.splice(item, 1);
  }

  deleteDoingItem(item: number) {
    this.newItem = this.doing[item];
    this.itemsService.deleteItem(this.newItem).subscribe(data  => {
        console.log('Delete successful ')
      },
      error  => {
        console.log("Error", error);
      });
    this.doing.splice(item, 1);
  }

  deleteDoneItem(item: number) {
    this.newItem = this.done[item];
    this.itemsService.deleteItem(this.newItem).subscribe(data  => {
        console.log('Delete successful ')
      },
      error  => {
        console.log("Error", error);
      });
    this.done.splice(item, 1);
  }


  openDialog(item: Items): void {
    const dialogRef = this.dialog.open(ItemDetailComponent, {
      width: '800px',
      height: '420px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }
}
