import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-horizontal-ruler',
  templateUrl: './horizontal-ruler.component.html',
  styleUrls: ['./horizontal-ruler.component.css']
})
export class HorizontalRulerComponent implements OnInit {
  @Input() id = this.appService.uuidv4();
  @Output() elementSelected = new EventEmitter<any>();
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  move() {
    this.elementSelected.emit({id: this.id});
  }
}
