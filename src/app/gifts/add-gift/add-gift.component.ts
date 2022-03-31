import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Gift } from "../gift.model";
import { GiftsService } from "../gift.service";

@Component({
  selector: "add-gift",
  templateUrl: "./add-gift.component.html",
  styleUrls: ["./add-gift.component.scss"],
})
export class AddGiftComponent implements OnInit {
  @ViewChild("img", { read: ElementRef }) img!: ElementRef;
  gift: Gift = new Gift("", "", "", "", "https://via.placeholder.com/250x250");
  edit: boolean = false;
  errorMessage = "";

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly giftsService: GiftsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params["uuid"]) {
        this.edit = true;
        const gift = await this.giftsService.getGift(params["uuid"]);
        if (!gift) {
          this.router.navigate(["/gifts"]);
        } else {
          this.gift = JSON.parse(JSON.stringify(gift));
        }
      }
    });
  }

  clickImage(): number {
    this.img.nativeElement.select()
    return 0;
  }

  async addTodo(form: NgForm) {
    const values = form.value;
    if (form.invalid) {
      return;
    }
    console.log(values);
    const gift = {
      ...values,
      uuid: this.gift?.uuid,
    } as Gift;
    if (this.edit) {
      await this.giftsService.updateGift(gift);
      this.router.navigate(["/gifts"]);
      return;
    }
    await this.giftsService.addGift(gift);
    this.router.navigate(["/gifts"]);
    form.reset();
  }
}
