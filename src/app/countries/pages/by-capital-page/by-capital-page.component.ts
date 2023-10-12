import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  public isLoading:boolean=false
  constructor(private countriesService:CountriesService){}
  public countries:Country[]=[]
  searchByCapital(term:any):void{
    this.isLoading=true
    this.countriesService.SearchCapital(term).subscribe((resp)=>{
      this.countries=resp
      this.isLoading=false
    })
    
    
  }

}
