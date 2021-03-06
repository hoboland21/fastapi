import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `<h5 style="margin-top:.5em">{{ today | date : 'medium'}}</h5>`,
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  today = new Date();
  clockid : any;
  
  constructor() { }

  ngOnInit(): void {
      // Clock
      this.clockid = setInterval(
        timer =>  this.today = new Date(),1000
       )
  }

  ngOnDestroy() {
    if (this.clockid) {
      clearInterval(this.clockid)
    }
  }



}
