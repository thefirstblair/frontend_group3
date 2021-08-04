<template>
<div>
  
    <div class="leaderboard">
      
    <v-simple-table
        fixed-header 
        height="600px"
    >
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
            <tr v-for="(item,index) in sortedArray" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.Username }}</td>
            <td>{{ item.Points }}</td>
            </tr>
        </tbody>
    </v-simple-table>
  </div>
</div>
</template>

<script>
    import axios from "axios";

    export default {
        props:['headtext'],
        async created(){
            let response = await axios.post("http://localhost:1337/auth/local",{ 
                identifier: "admin", 
                password: "admin1"
            });

            const token = response.data.jwt;

            let header = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
            let res = await axios.get(`http://localhost:1337/leaderboards?Content=${this.headtext}`,header);
            this.data_array = res.data
        },
        computed:{
            sortedArray(){
                return this.data_array.sort((a, b) => b.Points - a.Points );
            }
        },
        data(){
            return {
                data_array:[]
            }
        }
    }

</script>

<style>

</style>