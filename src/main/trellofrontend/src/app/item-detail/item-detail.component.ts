import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../model/item";
import {FormBuilder, Validators} from "@angular/forms";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  detailFlag = false;
  nameFlag = false;
  itemDetail: Item;

  constructor(
    public dialogRef: MatDialogRef<ItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private formBuilder: FormBuilder, private itemService: BoardService) {
    this.dialogRef.backdropClick().subscribe(_ => {
      this.itemDetail = this.itemFromDB;
      this.dialogRef.close(this.itemDetail);
    })
  }

  itemFromDB: Item;

  ngOnInit() {
    this.itemService.getItemDetails(this.data.id).subscribe(data => {
        console.log(data.id);
        this.itemFromDB = data;
        this.setFormData();
      },
      error => {
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
    this.dialogRef.close(this.itemDetail);
    // window.location.reload();
  }

  setFormData() {
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

  saveItem(item) {
    this.itemService.saveItem(item).subscribe(() => {
        this.closeDialog()
      },
      error => {
        console.log("Error", error);
      })
  }
}
