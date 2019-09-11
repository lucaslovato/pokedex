<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Pokedex</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-btn color="primary" dark class="mb-2" @click="dialog = true">Add new Pokemon</v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="pokeId" label="SearchById" single-line>
      </v-text-field>
      <v-btn class=""
             @click="searchById(pokeId)"
      >
        Search
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select
                  v-model="editedItem.type"
                  :items="types"
                  attach
                  chips
                  label="Type"
                  multiple
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="editedItem.evolution" label="Evolution"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select
                  v-model="editedItem.weakness"
                  :items="types"
                  attach
                  chips
                  label="Weakness"
                  multiple
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="pokemon"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.order }}</td>
        <td class="text-xs-right">{{ splitArray(props.item.type)}}</td>
        <td class="text-xs-right">{{ props.item.evolution}}</td>
        <td class="text-xs-right">{{ splitArray(props.item.weakness) }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <template>
      <div class="text-xs-center">
        <v-dialog
          v-model="dialog2"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey"
              primary-title
            >
              Error
            </v-card-title>

            <v-card-text>
              {{ error }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="dialog2 = false"
              > Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>


<script>

  import axios from 'axios';

  export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      search: '',
      loader: null,
      pokemonSearch: {},
      error: {},
      pokeId: '',
      loading: false,
      selected: [],
      pagination: {
        rowsPerPage: 25
      },
      types: [
        "NORMAL",
        "FIGHT",
        "FLYING",
        "POISON",
        "GROUND",
        "ROCK",
        "BUG",
        "GHOST",
        "STEEL",
        "FIRE",
        "WATER",
        "GRASS",
        "ELECTRIC",
        "PSYCHIC",
        "ICE",
        "DRAGON",
        "DARK",
        "FAIRY"
      ],
      headers: [
        {
          text: 'Name',
          sortable: false,
          align: 'center',
          value: 'name'
        },
        {
          text: 'Order',
          align: 'right',
          value: 'order'
        },
        {
          text: 'type',
          sortable: false,
          align: 'right',
          value: 'type'
        },
        {
          text: 'Evolution',
          sortable: false,
          align: 'right',
          value: 'evolution'
        },
        {
          text: 'Weakness',
          sortable: false,
          align: 'right',
          value: 'weakness'
        },
        {text: 'Actions', value: 'actions', align: 'center'}
      ],
      createEditState: false,
      pokemon: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        order: null,
        type: '',
        evolution: null,
        weakness: '',
      },
      defaultItem: {
        name: '',
        order: null,
        type: '',
        evolution: '',
        weakness: '',
      }
    }),
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      pages() {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      loader() {
        const l = this.loader;
        this[l] = !this[l];
        setTimeout(() => (this[l] = false), 3000);
        this.loader = null;
      }
    },
    created() {
      this.getAllPokemon();
    },
    methods: {
      editItem(pokemon) {
        this.editedIndex = this.pokemon.indexOf(pokemon);
        this.editedItem = Object.assign({}, pokemon);
        this.dialog = true;
        this.changeState(true);
      },
      deleteItem(item) {
        axios.delete(`http://localhost:3000/pokemon/${item._id}`, item)
          .then(response => {
            console.log("pokemon deletado", response.data);
          })
          .catch(e => {
            this.errors.push(e)
          });
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1
        }, 300);
      },
      save() {
        if (this.createEditState) {
          axios.put(`http://localhost:3000/pokemon/${this.editedItem._id}`, this.editedItem)
            .then(response => {
              console.log("novo pokemon", response.data);
              this.getAllPokemon();
              this.close();
            })
            .catch(e => {
              this.errors.push(e)
            });
        } else if (!this.createEditState) {
          axios.post(`http://localhost:3000/pokemon`, this.editedItem)
            .then(response => {
              console.log("novo pokemon", response.data);
              this.close()
            })
            .catch(e => {
              this.errors.push(e)
            });
        }
      },
      splitArray(array) {
        let ret = "";
        if (array.length > 1) {
          for (let pedroArray of array) {
            ret += pedroArray + "/";
          }
        } else ret = array[0];
        return ret;
      },
      changeState(state) {
        this.createEditState = state;
      },
      searchById(id) {
        axios.get(`http://localhost:3000/pokemon/${id}`)
          .then(response => {
            console.log(response);
            if (response.data.name === "CastError") {
              this.dialog2 = true;
              this.error = "Pokemon não foi encontrado mermão";
            } else {
              this.pokemonSearch = response.data;
              this.editedItem = response.data;
              this.dialog = true;
            }
          })
          .catch(e => {
            this.dialog2 = true;
            this.error = e;
          })
      },
      async getAllPokemon(){
        axios.get(`http://localhost:3000/pokemon`)
          .then(response => {
            this.pokemon = response.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    },
  }
</script>
