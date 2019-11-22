import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Items} from "../model/items";
import {FormBuilder, Validators} from "@angular/forms";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  detailFlag = false;
  nameFlag = false;
  itemDetail: Items;
  constructor(
    public dialogRef: MatDialogRef<ItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Items,
    private formBuilder: FormBuilder, private itemService: ItemService) {

  }

    itemFromDB: Items;

  ngOnInit() {
    this.itemService.getItemDetails(this.data.id).subscribe(data  => {
        console.log(data.id);
        this.itemFromDB = data;
        this.setFormData();
      },
      error  => {
        console.log("Error", error);
      });

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
    this.dialogRef.close();
  }

  setFormData(){
    this.itemDetailForm.patchValue({
      id: this.itemFromDB.id,
      username: this.itemFromDB.username,
      itemName: this.itemFromDB.itemName,
      columnName: this.itemFromDB.columnName,
      itemDetail: this.itemFromDB.itemDetail,
      indexNum: this.itemFromDB.indexNum,
    });
  }

  onSubmit() {
    this.itemDetail = this.itemDetailForm.value;
   this.saveItem(this.itemDetail);
  }

  saveItem(item){
    this.itemService.saveItem(item).subscribe(data  => {
      this.closeDialog()
      },
      error  => {
        console.log("Error", error);
      })
  }
}
