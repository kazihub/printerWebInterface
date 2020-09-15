import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-vertical-ruler',
  templateUrl: './vertical-ruler.component.html',
  styleUrls: ['./vertical-ruler.component.css']
})
export class VerticalRulerComponent implements OnInit {
  @Input() id = this.appService.uuidv4();
  @Output() elementSelected = new EventEmitter<any>();
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  move() {
    this.elementSelected.emit({id: this.id});
  }
}
