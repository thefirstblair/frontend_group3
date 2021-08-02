<template>
<div class="wrapper">
  <v-data-table
    :headers="headers"
    :items="rewards"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Reward Manager</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Reward name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.points"
                      label="Points"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.amount"
                      label="Amount"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.image"
                      label="Image URL"
                    ></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.image = "{ item }">
      <img class="rewards-image" :src="item.image" :alt="item.name" align-center>
    </template>

    <template v-slot:item.actions="{item}">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
    
</div>
</template>


<script>

export default {
    name: 'Rewards',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: 
      [{ text: "Rewards Image", value: 'image', align: 'center', sortable: false},
        { text: 'Rewards Name', value: 'name' },
        { text: 'Points', value: 'points' },
        { text: 'Amount', value: 'amount' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rewards: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        points: 0,
        amount: 0,
        image:''
      },
      defaultItem: {
          name: '',
        points: 0,
        amount: 0,
        image:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'  
      },
    
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.rewards = [
          {
            image: "https://s-media-cache-ak0.pinimg.com/originals/d9/81/bf/d981bfc4892112521efb88e880f86e20.png",
            name: 'My Melody Doll',
            points: 5000,
            amount: 2,
          },
          {
            image: "https://sites.google.com/site/tawkartunsanrixoyxdhit04/_/rsrc/1517160022195/kuromi/a0410c5472371291fe4e4d7028610550.png"
            ,name: 'Kuromi Doll',
            points: 3000,
            amount: 10,
          },          
          {
            image: "http://f.lnwfile.com/7mgmwg.png" ,
            name: 'Kitty Doll',
            points: 1000,
            amount: 4,
          },
        
        ]
      },

      editItem (item) {
        this.editedIndex = this.rewards.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.rewards.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.rewards.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.rewards[this.editedIndex], this.editedItem)
        } else {
          this.rewards.push(this.editedItem)
        }
        this.close()
      },
    },
  

}
</script>

<style scoped>
.rewards-image{
  height: 70px;
}
.wrapper{
  width: 80%;
  max-width:980px;
  margin: 60px auto;
}

</style>