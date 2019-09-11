import Vue from 'vue'
import Router from 'vue-router'
import PokemonList from "../components/PokemonList";
import ShowPokemon from "../components/ShowPokemon";
import CreatePokemon from "../components/CreatePokemon";
import EditPokemon from "../components/EditPokemon";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PokemonList',
      component: PokemonList
    },
    {
      path: '/show-pokemon/:id',
      name: 'ShowPokemon',
      component: ShowPokemon
    },
    {
      path: '/add-pokemon',
      name: 'CreatePokemon',
      component: CreatePokemon
    },
    {
      path: '/edit-pokemon/:id',
      name: 'EditPokemon',
      component: EditPokemon
    }
  ]
})
