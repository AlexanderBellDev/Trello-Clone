import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormBuilder, Validators} from "@angular/forms";

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
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  doing = [
    'Make java app'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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
  this.todo.splice(item,1);
  }
  deleteDoingItem(item: number) {
    this.doing.splice(item,1);
  }
  deleteDoneItem(item: number) {
    this.done.splice(item,1);
  }
}
