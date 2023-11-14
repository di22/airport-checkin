import {Component, OnInit} from '@angular/core';
import {ShareDataService} from "../../core/services/share-data.service";

@Component({
  selector: 'app-checkin-success',
  standalone: true,
  templateUrl: './checkin-success.component.html',
  styleUrls: ['./checkin-success.component.scss']
})
export class CheckinSuccessComponent implements OnInit {
  message: string;
  constructor(private shareDataService: ShareDataService) {}

  ngOnInit() {
    this.shareDataService.getMessage().subscribe(res => {
      this.message = res;
    })
  }

}
