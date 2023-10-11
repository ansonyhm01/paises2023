import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  countries:Country[]=[]
  constructor(private countriesService:CountriesService){}
  searchaByRegion(term:string){
    this.countriesService.SearchRegion(term).subscribe((resp)=>{
      this.countries=resp
    })
  }
}
