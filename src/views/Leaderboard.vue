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
        </v-row>
  </v-container>

  
    <div class="leaderboard">
      
    <v-simple-table fixed-header height="600px">
    <template>
      <thead>
        <tr>
          <th class="text-left" scope="col">
            Rank
          </th>

          <th class="text-left" scope="col">
            Username
          </th>

          <th class="text-left" scope="col">
            Point
          </th>
          
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in item" :key="item.username">
          <td>{{++i}}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.point }}</td>
        </tr>
      </tbody>
    </template>
    </v-simple-table>
  </div>
</div>
</template>

<script>
  export default {
      data() {
          return {
              item: [
                  { username: 'Player 1', point:1000 },
                  { username: 'Player 2', point:250 },
                  { username: 'Player 3', point:30},
                  { username: 'Player 4', point:10},
                  { username: 'Player 5', point:500},
                  { username: 'Player 6', point:900},
                  { username: 'Player 7', point:1200}
              ]  
          }
      },
  }

</script>

<style>
    .leaderboard{
      
        width:80%;
        height:80vh;
        border-radius: 1vh;
        padding:3vh;
        overflow: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0px;   
    }
   
    

    
    

</style>

