import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Items} from "../model/items";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  detailFlag = false;
  nameFlag = false;
  constructor(
    public dialogRef: MatDialogRef<ItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Items,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setFormData();
  }

  itemDetailForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    username: ['', [Validators.required]],
    itemName: ['', [Validators.required]],
    columnName: ['', [Validators.required]],
    itemDetail: ['', []],
    indexNum: ['', [Validators.required]],
  });

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  setFormData(){
    this.itemDetailForm.patchValue({
      id: this.data.id,
      username: this.data.username,
      itemName: this.data.itemName,
      columnName: this.data.columnName,
      itemDetail: this.data.itemDetail,
      indexNum: this.data.indexNum,
    });
  }

  onSubmit() {

  }
}
