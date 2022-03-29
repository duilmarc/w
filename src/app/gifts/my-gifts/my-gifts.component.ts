import { Component, OnInit } from "@angular/core";
import { Gift } from "../gift.model";
import { GiftsService } from "../gift.service";

@Component({
  selector: "app-my-gifts",
  templateUrl: "./my-gifts.component.html",
  styleUrls: ["./my-gifts.component.scss"],
})
export class MyGiftsComponent implements OnInit {
  gifts: Gift[] = [];

  constructor(private readonly giftsService: GiftsService) {}

  async ngOnInit(): Promise<void> {
    this.gifts = await this.giftsService.getMyGifts();
  }
}
