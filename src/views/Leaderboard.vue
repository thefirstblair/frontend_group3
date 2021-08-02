<template>
  <div>
    <v-container fill-height>
        <v-row
          align="center"
          class="white--text"
          justify="center"
        >
          <v-col
            class="white--text text-center"
            cols="12"
            tag="h1"
          >
            <span class="font-weight-black" style="font-size: 250%" >
              Leaderboard
            </span>
          </v-col>
          <v-col
            class="white--text text-center"
            cols="12"
            tag="h1"
          >
          <v-card color="basil">
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
              <v-tab v-for="item in items"
                :key="item.tab"
              >
                {{ item.tab }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="item in items"
                :key="item.tab"
              >
                <v-card
                  color="basil"
                  flat
                >
                
                  <v-card >
                    
                    <TableCompo :data="item.data" :headtext="item.content" />
                      
                  </v-card>
                  
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>

import TableCompo from '../components/TableCompo.vue'

export default {
    components:{TableCompo},
    data () {
      return {
        tab: null,
        items: [
          { tab: 'Earn Points', content: 'EarnPoints', 
          data: [
            { username: 'Player 1', point:1000 },
            { username: 'Player 2', point:250 },
            { username: 'Player 3', point:30},
            { username: 'Player 4', point:10},
            { username: 'Player 5', point:500},
            { username: 'Player 6', point:900},
            { username: 'Player 7', point:1200}
          ]},
          { tab: 'Loss Points', content: 'LossPoints',
          data:[
            { username: 'Player 1', point:1000 },
            { username: 'Player 2', point:250 },
            { username: 'Player 3', point:30},
            { username: 'Player 4', point:10},
            { username: 'Player 5', point:500},
            { username: 'Player 6', point:900},
            { username: 'Player 7', point:1200}
          ] }, 
        ],
      }
    }

}
</script>

<style>

</style>