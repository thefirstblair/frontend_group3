<template>
  <div>
    <div class="leaderboard">
      <v-simple-table fixed-header height="600px">
        <thead>
          <tr>
            <th scope="col">Rank</th>

            <th scope="col">Username</th>

            <th scope="col">
              {{ headtext }}
            </th>
          </tr>
        </thead>
        <tbody style="text-align: left">
          <tr v-for="(item, index) in sortedArray" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.users.username }}</td>
            <td>{{ item.amount }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import HistoryService from "@/service/HistoryService";

export default {
  props: ["headtext"],
  async created() {
    let res = await HistoryService.getLeaderBoard(this.headtext);
    console.log(res);
    this.data_array = res.data;
  },
  computed: {
    sortedArray() {
      return this.data_array.sort((a, b) => b.amount - a.amount);
    },
  },
  data() {
    return {
      data_array: [],
    };
  },
};
</script>

<style>
</style>