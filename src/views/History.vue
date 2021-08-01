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
              History
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
            Date
          </th>

          <th class="text-left" scope="col">
            Detail
          </th>

          <th class="text-left" scope="col">
            Amount
          </th>

           <th class="text-left" scope="col">
            Balance
          </th>
          
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in items" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.detail }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ 'balance'}}</td>
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
              items: [
                  { date:"2021-08-01", detail:"Earn Points", amount: 1000},
                  { date:"2021-07-23", detail:"Earn Points", amount: 1000},
                  { date:"2021-05-05", detail:"Loss Points", amount: 1000},
                  { date:"2021-07-21", detail:"Earn Points", amount: 1000},
                  { date:"2021-07-19", detail:"Loss Points", amount: 1000 },
                  { date:"2021-08-12", detail:"Earn Points", amount: 1000},
                
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

