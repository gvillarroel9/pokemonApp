import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './views/pokemon/pokemon-list/pokemon-list.component';


const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
