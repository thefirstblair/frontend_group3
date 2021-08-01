<template>
<div>
  
    <div class="leaderboard">
      
    <v-simple-table fixed-header height="600px">
        <thead>
            <tr>
            <th scope="col">
                Rank
            </th>

            <th scope="col">
                Username
            </th>

            <th scope="col">
                {{ headtext }}
            </th>
            
            </tr>
        </thead>
        <tbody style="text-align:left;">
            <tr v-for="(item,index) in data" :key="index">
            <td>{{ index }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.point }}</td>
            </tr>
        </tbody>
    </v-simple-table>
  </div>
</div>
</template>

<script>
  export default {
      props:['data','headtext'],
  }

</script>

<style>

</style>