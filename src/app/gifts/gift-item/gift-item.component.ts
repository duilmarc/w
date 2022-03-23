import { Component, Input, OnInit } from '@angular/core';
import { Gift } from '../gift.model';

@Component({
  selector: 'gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.scss']
})
export class GiftItemComponent implements OnInit {
  @Input() gift!: Gift;

  constructor() { }

  ngOnInit(): void {
  }

}
