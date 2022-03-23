import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { Gift } from "./gift.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GiftsService {
  giftsChanged = new Subject<Gift[]>();
  private gifts: Gift[] = [];
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  async getGifts() {
    try {
      const gifts = await this.http
        .get<Gift[]>(`${environment.apiUrl}/api/gifts`, {
          headers: this.headers,
        })
        .toPromise();
      this.gifts = gifts?.slice() ?? [];
      this.giftsChanged.next(this.gifts.slice());
      return gifts ?? [];
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return [];
      }
    }
    this.router.navigate(["/"]);
    return [];
  }

  async getGift(uuid: string): Promise<Gift | null> {
    try {
      const gift = await this.http
        .get<Gift>(`${environment.apiUrl}/api/gifts/${uuid}`, {
          headers: this.headers,
        })
        .toPromise();
      return gift ?? null;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
    }
    this.router.navigate(["/"]);
    return null;
  }

  async updateGift(gift: Gift): Promise<Gift | null> {
    try {
      const updatedGift = await this.http
        .put<Gift>(`${environment.apiUrl}/api/gifts/${gift.uuid}`, gift, {
          headers: this.headers,
        })
        .toPromise();
      if (!updatedGift) {
        return null;
      }
      const index = this.gifts.findIndex(
        (g) => g.uuid === updatedGift.uuid
      );
      this.gifts[index] = updatedGift;
      this.giftsChanged.next(this.gifts.slice());
      return updatedGift;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
    }
    this.router.navigate(["/"]);
    return null;
  }

  async addGift(gift: Gift): Promise<Gift | null> {
    try {
      const newGift = await this.http
        .post<Gift>(`${environment.apiUrl}/api/gifts`, gift, {
          headers: this.headers,
        })
        .toPromise();
      if (!newGift) {
        return null;
      }
      this.gifts.push(newGift);
      this.giftsChanged.next(this.gifts.slice());
      return newGift;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
    }
    this.router.navigate(["/"]);
    return null;
  }
}
