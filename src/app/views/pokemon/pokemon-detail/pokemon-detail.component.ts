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
  constructor(private _pokemonService : PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get("id");
    this._pokemonService.getPokemon(environment.urlApi+'pokemon/'+this.pokemonId).subscribe((response)=>{
      console.log(response);
      this.pokemonData = response;
    },
    (err: any)=>{
      console.log("Error.",err);
    });

  }

}
