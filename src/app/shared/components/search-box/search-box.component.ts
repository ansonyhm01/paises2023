import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Country } from 'src/app/countries/interfaces/countries.interface';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit ,OnDestroy{
  // private debouncer=new Subject<string>()
  // private a:Country[]=[]
  private debouncer:Subject<string>=new Subject<string>()
  private debouncerSuscription?:Subscription
  @Input()
  public placeHolder:string=''
  @Output()
  public onValue=new EventEmitter<string>()
  @Output()
  public onDebounce=new EventEmitter<string>()
  ngOnInit(): void {
    this.debouncerSuscription=this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe((value:string)=>{
      this.onDebounce.emit(value)
      
    })
  }
  ngOnDestroy(): void {
    // console.log('componente destruido');
    // this.debouncer.unsubscribe();
    this.debouncerSuscription?.unsubscribe();
    
  }
  emitValue(term:string){
    this.onValue.emit(term)
    // this.txtInput=''
  }
  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)
    
  }
} 
