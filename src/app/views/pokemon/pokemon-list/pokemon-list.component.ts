import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  search = "";
  pokemons = [];
  pokemons_copy;
  constructor(private _pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this._pokemonService.getPokemonList().subscribe(
      (response)=>{
        response['results'].forEach((pokemon)=> this.getPokemonDetail(pokemon.url));       
      },    
      (err: any)=>{
        console.log("Error Obteniendo Lista",err);  
      });
    
  }

  getPokemonDetail(url: string){
    this._pokemonService.getPokemon(url).subscribe((response)=>{
        this.pokemons.push(response);
        if(this.pokemons.length === 25){
          this.pokemons.sort((a,b)=> a.id-b.id);
          this.pokemons.forEach((element) => this.getSpecies(element.id));
          this.pokemons_copy = this.pokemons;          
        }
      },
      (err: any)=>{
        console.log("Error.",err);
      });
  }

  getSpecies(id: any){
    this._pokemonService.getPokemonSpecies(id).subscribe((response)=>{
        this.getEvolution(response['evolution_chain'].url , response['name'], id)
      },
      (err: any)=>{
        console.log("Error.",err);
      });
  }

  getEvolution(url: any, pokemon:any, id:any){
    this._pokemonService.getEvolutionChain(url).subscribe((response)=>{
      let chain = response['chain'];
      let evolutionChain = [];
      while(chain.evolves_to.length){
        evolutionChain.push(chain.species.name);
        chain = chain.evolves_to[0];        
      }
      evolutionChain.push(chain.species.name);
      let index = evolutionChain.findIndex((e)=>e===pokemon);
      if(index>0){
        this.pokemons[id-1]["evolution"]= evolutionChain[index-1];
      }else{
        this.pokemons[id-1]["evolution"]= null;
      }     
    }, 
    (err: any)=>{
      console.log("Error.",err);
    });
  }


  filterPokemon(){
    this.pokemons = this.pokemons_copy;
    let filter = this.pokemons.filter((pokemon)=> !pokemon.name.search(this.search));
    this.pokemons = filter;
  }

  pokemonDetailRedirect(id:number){
    this.router.navigateByUrl('/pokemon/'+id);
  }



}
