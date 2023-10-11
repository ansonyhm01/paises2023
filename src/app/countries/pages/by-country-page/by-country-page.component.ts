import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  countries:Country[]=[]
  constructor(private countriesService:CountriesService){}
  searchaByCountry(term:any):void{
    this.countriesService.SearchCountry(term).subscribe((resp)=>{
      this.countries=resp
    })
    
    
  }

}
