import {Component, OnInit} from '@angular/core';
import {BoardService} from "../service/board.service";
import {Board} from "../model/board";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  boardProperties: Board;


  boardPropertiesForm = this.formBuilder.group({
    itemColor: ['', [Validators.required]]
  });
  color: any;
  toggle: any;

  constructor(private boardService: BoardService, private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit() {
    this.boardService.getBoardProperties().subscribe(data => {
      this.boardProperties = data;
      this.color = data.boardColor;
      this.boardPropertiesForm.patchValue({
        itemColor: this.boardProperties.boardColor
      });
    }, () => {
      console.log('no properties found')
    })
  }

  closeDialog() {
    this.dialogRef.close();
    // window.location.reload();
  }


  submitBoardProperties() {
    this.boardProperties.boardColor = this.color;
    this.boardService.submitBoardProperties(this.boardProperties).subscribe(() => {
      this.closeDialog()
    }, error => {
      console.log('error is: ' + error);
      this.closeDialog()
    })
  }
}
