import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(){
    return this.http.get(environment.urlApi+'pokemon?offset=0&limit=25')
                .pipe();
  }

  getPokemon(urlPokemon){
    return this.http.get(urlPokemon)
                .pipe();
  }

  getPokemonSpecies(id){
    return this.http.get(environment.urlApi+'pokemon-species/'+id)
                .pipe();
  }

  getEvolutionChain(urlPokemon){
    return this.http.get(urlPokemon)
                .pipe();
  }
}
