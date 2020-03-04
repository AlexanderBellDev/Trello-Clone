import {Component, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import {SettingsDialogComponent} from "../settings-dialog/settings-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public loginService: LoginService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }


  settingsModal(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


}
