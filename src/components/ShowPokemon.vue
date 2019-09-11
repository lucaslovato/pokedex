<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Pokemon
        <b-link href="#/">(Pokemon List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{pokemon.name}}
        </template>
        <template slot="lead">
          Name: {{pokemon.name}}<br>
          Order: {{pokemon.number}}<br>
          Type: {{pokemon.type}}<br>
          Evolution: {{pokemon.evolution}}<br>
          Weakness: {{pokemon.weakness}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{pokemon.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editPokemon(pokemon._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletePokemon(pokemon._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'ShowPokemon',
    data() {
      return {
        pokemon: []
      }
    },
    created() {
      axios.get(`http://localhost:3000/pokemon/${this.$route.params.id}`)
        .then(response => {
          this.pokemon= response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      editPokemon(pokemonId) {
        this.$router.push({
          name: 'EditPokemon',
          params: {id: pokemonId}
        })
      },
      deletePokemon(pokemonId) {
        axios.delete(`http://localhost:3000/pokemon/${pokemonId}`)
          .then((result) => {
            this.$router.push({
              name: 'PokemonList'
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
