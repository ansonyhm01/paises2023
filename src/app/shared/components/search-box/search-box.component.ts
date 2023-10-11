import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input()
  public placeHolder:string=''
  @Output()
  public onValue=new EventEmitter<string>()
  emitValue(term:string){
    this.onValue.emit(term)
    // this.txtInput=''

  }
} 
