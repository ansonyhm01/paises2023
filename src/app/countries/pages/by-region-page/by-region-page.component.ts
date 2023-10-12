import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent  implements OnInit{
  countries:Country[]=[]
  public selectedRegion?:Region
  public regions:Region[]=['Africa','Americas','Asia','Europe','Oceania']
  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries=this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion=this.countriesService.cacheStore.byRegion.region
    
  }
  searchaByRegion(term:Region){
    this.selectedRegion=term
    this.countriesService.SearchRegion(term).subscribe((resp)=>{
      this.countries=resp
    })
  }
}
