import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from '../../../../environments/environment'

import { trigger, style, transition, animate, state  } from '@angular/animations';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  animations: [
    trigger( 'enterState', [
      state( 'void', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition(':enter',[
        animate(500,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class PokemonDetailComponent implements OnInit {
  pokemonId: string;
  pokemonData: any;
  evolutions = [];
  constructor(private _pokemonService : PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get("id");
    this._pokemonService.getPokemon(environment.urlApi+'pokemon/'+this.pokemonId).subscribe((response)=>{
      this.pokemonData = response;
      this.getSpecies(this.pokemonId);
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
        this.getPokemonDetail(chain.species.name);
        chain = chain.evolves_to[0];        
      }
        this.getPokemonDetail(chain.species.name);
    }, 
    (err: any)=>{
      console.log("Error.",err);
    });
  }

  getPokemonDetail(pokemonName: string){
    this._pokemonService.getPokemon(environment.urlApi+'pokemon/'+pokemonName).subscribe((response)=>{
        this.evolutions.push(response);
        if(this.evolutions.length === 3){
          this.evolutions.sort((a,b) => a.order-b.order);
        }
      },
      (err: any)=>{
        console.log("Error.",err);
      });
  }

}
