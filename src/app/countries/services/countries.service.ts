import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl:string='https://restcountries.com/v3.1'
  public cacheStore:CacheStore={
    byCapital:{term:'',countries:[]},
    byCountry:{term:'',countries:[]},
    byRegion:{region:'',countries:[]}

  }

  constructor(private httpClient:HttpClient) { 
    // console.log('countries service init');
    this.loadFromLocalStorage()
  }
  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage',JSON.stringify(this.cacheStore))
  }
  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStorage')) return 
    this.cacheStore=JSON.parse(localStorage.getItem('cacheStorage')!)

  }
  private getCountryReques(url:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(()=> of([])),
      // delay(2000)
    )
  }  
  searchCountryByAlphaCode(code:string):Observable<Country[] | any>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map(countries=>countries.length>0?countries[0]:null),
      catchError(()=>of(null))
    )
  }



  SearchCapital(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/capital/${term}`
    return this.getCountryReques(url)
    .pipe(
      tap(countries=> this.cacheStore.byCapital={term,countries}),
      tap(()=>this.saveToLocalStorage())
    )
    // return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    //   .pipe(
    //     catchError(()=> of([]))
    //     // tap(countries=>console.log('tap 1',countries)),
    //     // map(countries=> []),
    //     // tap(countries=>console.log('tap 2',countries))
    //   )
  }
  SearchCountry(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/name/${term}`
    return this.getCountryReques(url)
    .pipe(
      tap(countries=> this.cacheStore.byCountry={term,countries}),
      tap(()=>this.saveToLocalStorage())
    )
    // return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
    // .pipe(
    //   catchError(()=>of([]))
    // )
  } 
  SearchRegion(term:Region):Observable<Country[]>{
    const url=`${this.apiUrl}/region/${term}`
    return this.getCountryReques(url)
    .pipe(
      tap(countries=> this.cacheStore.byRegion={region:term,countries}),
      tap(()=>this.saveToLocalStorage())
    )
    // return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
    // .pipe(
    //   catchError(()=>of([]))
    // )
  } 
}
