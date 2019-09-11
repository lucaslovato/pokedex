<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Pokemon
        <b-link href="#/">(Pokemon List)</b-link>
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
                      label="Enter type">
          <b-form-input id="author" :state="state" v-model.trim="pokemon.type"></b-form-input>
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
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'CreatePokemon',
    data() {
      return {
        pokemon: {}
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        axios.post(`http://localhost:3000/pokemon`, this.pokemon)
          .then(response => {
            this.$router.push({
              name: 'ShowPokemon',
              params: {id: response.data._id}
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>
