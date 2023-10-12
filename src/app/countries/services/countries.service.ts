import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl:string='https://restcountries.com/v3.1'

  constructor(private httpClient:HttpClient) { }
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
    // return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
    // .pipe(
    //   catchError(()=>of([]))
    // )
  } 
  SearchRegion(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/region/${term}`
    return this.getCountryReques(url)
    // return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
    // .pipe(
    //   catchError(()=>of([]))
    // )
  } 
}
