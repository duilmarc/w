import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmComponent } from "./confirm/confirm.component";
import { DialogData } from "./confirm/dialog.data";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  openConfirmDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: new DialogData(message),
    });

    return dialogRef.afterClosed();
  }
}
