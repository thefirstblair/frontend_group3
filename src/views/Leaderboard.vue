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
                
                  <v-card>
                    
                    <TableCompo :headtext="item.content" />
                      
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
        { tab: 'Earn Points', content: 'EarnPoints',},
        { tab: 'Loss Points', content: 'LossPoints',},
      ]
    }
  }
}
  
</script>

<style>

</style>