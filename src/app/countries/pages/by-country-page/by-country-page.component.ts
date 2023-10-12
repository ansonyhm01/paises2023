import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{
  countries:Country[]=[]
  public initialValue:string=''
  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries=this.countriesService.cacheStore.byCountry.countries
    this.initialValue=this.countriesService.cacheStore.byCountry.term
  }
  searchaByCountry(term:any):void{
    this.countriesService.SearchCountry(term).subscribe((resp)=>{
      this.countries=resp
    })
    
    
  }

}
