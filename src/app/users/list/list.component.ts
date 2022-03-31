import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { Gift } from "@prisma/client";
import { UserWithGifts } from "../user-with-gifts.model";
import { UserService } from "../user.service";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { DialogService } from "src/app/dialog/dialog.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  users: UserWithGifts[] = [];
  subscriber: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly dialogService: DialogService
  ) {
    this.subscriber = userService.usersChanged.subscribe((users) => {
      this.users = users;
    });
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  async deleteGift(user: UserWithGifts, gift: Gift): Promise<void> {
    this.dialogService
      .openConfirmDialog(
        `seguro que quieres quitar ${gift.name} de ${user.email}?`
      )
      .subscribe(async (result: boolean) => {
        if (result) {
          this.userService.deleteGift(user, gift);
          this.accordion.closeAll();
        }
      });
    // if (result) {
    //   await this.userService.deleteGift(user, gift);
    //   // this.accordion.closeAll();
    // }
    // await this.userService.deleteGift(user, gift);
    // this.users = await this.userService.getUsers();
  }
}
