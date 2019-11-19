import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormBuilder, Validators} from "@angular/forms";
import {ItemService} from "../service/item.service";
import {Items} from "../model/items";

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

  constructor(private formBuilder: FormBuilder, private itemsService: ItemService) {
  }

  todo: Items[] = [];
  doing: Items[] = [];
  done: Items[] = [];

  items: Items[] = [];

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

  item: Items;


  drop(event: CdkDragDrop<Items[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'todo') {
        this.item = this.todo[event.previousIndex];
        console.log(this.item);
        if (event.container.id === 'doing') {
          this.item.columnName = 'doing';
          this.item.index = event.currentIndex;
        }
        if(event.container.id === 'done'){
          this.item.columnName = 'done';
          this.item.index = event.currentIndex;
        }
        console.log(this.item);
      }else if (event.previousContainer.id === 'doing') {
        this.item = this.doing[event.previousIndex];
        if (event.container.id === 'todo') {
          this.item.columnName = 'todo';
          this.item.index = event.currentIndex;
        }
        if(event.container.id === 'done'){
          this.item.columnName = 'done';
          this.item.index = event.currentIndex;
        }
        console.log(this.item);
      }else if (event.previousContainer.id === 'done') {
        this.item = this.done[event.previousIndex];
        if (event.container.id === 'todo') {
          this.item.columnName = 'todo';
          this.item.index = event.currentIndex;
        }
        if(event.container.id === 'doing'){
          this.item.columnName = 'doing';
          this.item.index = event.currentIndex;
        }
        console.log(this.item);
      }
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
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

  // get f() {
  //   return this.addItemForm.controls;
  // }

  addToDoItemContent() {
    this.addItemToDoSelected = false;
    this.todo.push(this.addToDoItemForm.value.itemName);
    this.addToDoItemForm.reset();
  }

  cancelToDoAddItemContent() {
    this.addToDoItemForm.reset();
    this.addItemToDoSelected = false;
  }


  addDoingItemContent() {
    this.addItemDoingSelected = false;
    this.doing.push(this.addDoingItemForm.value.itemName);
    this.addDoingItemForm.reset();
  }

  cancelDoingAddItemContent() {
    this.addDoingItemForm.reset();
    this.addItemDoingSelected = false;
  }

  addDoneItemContent() {
    this.addItemDoneSelected = false;
    this.done.push(this.addDoneItemForm.value.itemName);
    this.addDoneItemForm.reset();
  }

  cancelDoneAddItemContent() {
    this.addDoneItemForm.reset();
    this.addItemDoneSelected = false;
  }


  deleteToDoItem(item: number) {
    this.todo.splice(item, 1);
  }

  deleteDoingItem(item: number) {
    this.doing.splice(item, 1);
  }

  deleteDoneItem(item: number) {
    this.done.splice(item, 1);
  }
}
