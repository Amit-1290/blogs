import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {

  ghostArray = [1,2,3,4,5]
  ghostArrayBig = [1,2,3,4]

  constructor() { }

  ngOnInit(): void {
  }

}
