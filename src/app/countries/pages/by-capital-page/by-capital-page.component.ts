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
  constructor(private countriesService:CountriesService){}
  public countries:Country[]=[]
  searchaByCapital(term:any):void{
    this.countriesService.SearchCapital(term).subscribe((resp)=>{
      this.countries=resp
    })
    
    
  }

}
