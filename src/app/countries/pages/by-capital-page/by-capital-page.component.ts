import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{
  public isLoading:boolean=false
  public countries:Country[]=[]
  public initialValue:string=''
  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries=this.countriesService.cacheStore.byCapital.countries
    this.initialValue=this.countriesService.cacheStore.byCapital.term
  }
  searchByCapital(term:any):void{
    this.isLoading=true
    this.countriesService.SearchCapital(term).subscribe((resp)=>{
      this.countries=resp
      this.isLoading=false
    })
    
    
  }

}
