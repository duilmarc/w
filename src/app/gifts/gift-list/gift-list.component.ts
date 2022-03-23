import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Gift } from "../gift.model";
import { GiftsService } from "../gift.service";

@Component({
  selector: "gift-list",
  templateUrl: "./gift-list.component.html",
  styleUrls: ["./gift-list.component.scss"],
})
export class GiftListComponent implements OnInit, OnDestroy {
  gifts: Gift[] = [];
  subscriber: Subscription;

  constructor(private readonly giftsService: GiftsService) {
    this.subscriber = giftsService.giftsChanged.subscribe((gifts) => {
      this.gifts = gifts;
    });
  }

  async ngOnInit(): Promise<void> {
    this.gifts = await this.giftsService.getGifts();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
