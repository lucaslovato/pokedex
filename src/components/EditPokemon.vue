<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Pokemon
        <router-link :to="{ name: 'ShowPokemon', params: { id: pokemon._id } }">(Show Pokemon)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Enter Name">
          <b-form-input id="name" :state="state" v-model.trim="pokemon.name"></b-form-input>
        </b-form-group>
        <b-form-group
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Enter Order">
          <b-form-input id="order" :state="state" v-model.trim="pokemon.order"></b-form-input>
        </b-form-group>
        <b-form-group
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Enter Type">
          <b-form-input id="type" :state="state" v-model.trim="pokemon.type"></b-form-input>
        </b-form-group>
        <b-form-group
          horizontal
          :label-cols="4"
          breakpoint="md"
          label="Enter Evolution">
          <b-form-input id="evolution" :state="state" v-model.trim="pokemon.evolution"></b-form-input>
        </b-form-group>
        <b-form-group
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Enter Weakness">
          <b-form-input id="weakness" :state="state" v-model.trim="pokemon.weakness"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'EditPokemon',
    data() {
      return {
        pokemon: {}
      }
    },
    created() {
      axios.get(`http://localhost:3000/pokemon/` + this.$route.params.id)
        .then(response => {
          this.pokemon = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        axios.put(`http://localhost:3000/pokemon/` + this.$route.params.id, this.pokemon)
          .then(response => {
            this.$router.push({
              name: 'ShowPokemon',
              params: {id: this.$route.params.id}
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>
