import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
type Region='Africa'|'Americas'|'Asia'|'Europe'|'Oceania'
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  countries:Country[]=[]
  public selectedRegion?:Region
  public regions:Region[]=['Africa','Americas','Asia','Europe','Oceania']
  constructor(private countriesService:CountriesService){}
  searchaByRegion(term:Region){
    this.selectedRegion=term
    this.countriesService.SearchRegion(term).subscribe((resp)=>{
      this.countries=resp
    })
  }
}
