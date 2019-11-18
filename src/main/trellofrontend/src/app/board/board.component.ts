import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  addItemForm = this.formBuilder.group({
    itemName: ['', [Validators.required]]
  });
  addItemSelected: boolean;
  constructor(private formBuilder: FormBuilder) { }

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

  addItem() {
  this.addItemSelected = true;
  }
  get f() { return this.addItemForm.controls; }
  addItemContent() {
    this.addItemSelected = false;
    this.doing.push(this.addItemForm.value.itemName);
 this.addItemForm.reset();

  }

  cancelAddItemContent() {
    this.addItemForm.reset();
    this.addItemSelected = false;
  }
}
