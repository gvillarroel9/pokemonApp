import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  
  pokemons = [];
  constructor(private _pokemonService: PokemonService) { }

  ngOnInit() {
    this._pokemonService.getPokemonList().subscribe(
      (response)=>{
        response['results'].forEach((pokemon)=> this.getInfoPokemon(pokemon.url));
      },    
      (err: any)=>{
        console.log("Error Obteniendo Lista",err);
      });
  }

  getInfoPokemon(url: string){
    this._pokemonService.getPokemon(url).subscribe((response)=>{
        this.pokemons.push(response);
      },
      (err: any)=>{
        console.log("Error.",err);
      });
  }



}
