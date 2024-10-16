import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  private readonly aeroDataBoxApiKey = 'd011cac226mshb2f70dd2115f260p1cd928jsn1543f5e3df72';
  private readonly aeroDataBoxUrl = 'https://aerodatabox.p.rapidapi.com';
  private readonly ninjaApiUrl = 'https://airports-by-api-ninjas.p.rapidapi.com/v1/airports';
  private readonly openSkyUrl = 'https://opensky-network.org/api';
  private readonly backendUrl = 'https://localhost:3000/api';
  private readonly rapidApiKey = 'd011cac226mshb2f70dd2115f260p1cd928jsn1543f5e3df72';
  private readonly skyscannerApiHost = 'sky-scanner3.p.rapidapi.com';
  private readonly skyScrapperApiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete';

  constructor(private http: HttpClient) { }

  // Method to search for flight availability by checking the backend
  searchFlights(departure: string, arrival: string, departureAirports: string, arrivalAirports: string): Observable<boolean> {
    const url = `${this.backendUrl}/check-flight`;
    const params = new HttpParams()
      .set('departure', departure)
      .set('arrival', arrival)
      .set('departureAirports', departureAirports)
      .set('arrivalAirports', arrivalAirports);

    return this.http.get(url, { params }).pipe(
      map((response: any) => response.available),
      catchError(error => {
        console.error('Error checking flight availability:', error);
        return of(false); // Default to no flights available on error
      })
    );
  }

  // Method to get airports by location using AeroDataBox
  getAirportsByLocation(location: string): Observable<any> {
    const url = `${this.aeroDataBoxUrl}/airports/search/term`;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.aeroDataBoxApiKey,
      'X-RapidAPI-Host': 'aerodatobox.p.rapidapi.com'
    });

    const params = new HttpParams().set('q', location).set('withFlightInfoOnly', 'false');

    return this.http.get(url, { headers, params });
  }

  // Method to search airports by name using Ninja API
  searchAirports(query: string): Observable<any> {
    // console.log('Searching for airport:', query);
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'airports-by-api-ninjas.p.rapidapi.com',
      'x-rapidapi-key': this.aeroDataBoxApiKey
    });

    const params = new HttpParams().set('name', query);

    return this.http.get(this.ninjaApiUrl, { headers, params });
  }

  // Method to get airports data from OpenSky Network
  getAirportsData(): Observable<any> {
    const url = `${this.openSkyUrl}/airports`;
    return this.http.get(url);
  }

  // Method to search for flights using Sky Scrapper API
  searchFlightsSkyScrapper(
    originSkyId: string,
    destinationSkyId: string,
    originEntityId: string,
    destinationEntityId: string,
    cabinClass: string,
    adults: number,
    sortBy: string,
    currency: string,
    market: string,
    countryCode: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      'x-rapidapi-key': this.rapidApiKey
    });

    const params = new HttpParams()
      .set('originSkyId', originSkyId)
      .set('destinationSkyId', destinationSkyId)
      .set('originEntityId', originEntityId)
      .set('destinationEntityId', destinationEntityId)
      .set('cabinClass', cabinClass)
      .set('adults', adults.toString())
      .set('sortBy', sortBy)
      .set('currency', currency)
      .set('market', market)
      .set('countryCode', countryCode);

    return this.http.get(this.skyScrapperApiUrl, { headers, params }).pipe(
      catchError(error => {
        console.error('Error searching flights with Sky Scrapper:', error);
        return of(null); // Default to null on error
      })
    );
  }
}
