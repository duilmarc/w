import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmComponent } from "src/app/dialog/confirm/confirm.component";
import { DialogData } from "src/app/dialog/confirm/dialog.data";
import { UserService } from "src/app/users/user.service";
import { Gift } from "../gift.model";
import { GiftsService } from "../gift.service";

@Component({
  selector: "gift-item",
  templateUrl: "./gift-item.component.html",
  styleUrls: ["./gift-item.component.scss"],
})
export class GiftItemComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  @Input() gift!: Gift;

  constructor(
    private readonly userService: UserService,
    private readonly giftsService: GiftsService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();
  }

  deleteGift() {
    if (this.isAdmin) {
      this.openDialog(
        "Estas seguro que quieres eliminar este regalo?"
      ).subscribe(async (result: boolean) => {
        if (result) {
          await this.giftsService.deleteGift(this.gift.uuid ?? "");
        }
      });
    }
  }

  openDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: new DialogData(message),
    });

    return dialogRef.afterClosed();
  }

  addToMyGifts() {
    if (this.isLoggedIn) {
      this.openDialog(
        "Estas seguro que quieres agregar este regalo a tus regalos?"
      ).subscribe(async (result: boolean) => {
        if (result) {
          await this.giftsService.addGiftToUser(this.gift.uuid ?? "");
        } else {
          console.log("cancelled");
        }
      });
    }
  }
}
