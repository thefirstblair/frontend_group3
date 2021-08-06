<template>
  <div>
    <div class="leaderboard">
      <v-simple-table fixed-header height="600px" fill-height>
        <thead>
          <tr>
            <th scope="col">Rank</th>

            <th scope="col">Time Stamp</th>
            <th scope="col">Username</th>

            <th scope="col">
              {{ headtext }}
            </th>
          </tr>
        </thead>
        <tbody style="text-align: left">
          <tr v-for="(item, index) in selectData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ timeFormat(item.created_at) }}</td>
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
import moment from "moment";

export default {
  props: ["headtext", "startDate", "endDate"],
  data() {
    return {
      data_array: [],
    };
  },
  async created() {
    let res = await HistoryService.getLeaderBoard(this.headtext);
    console.log(res);
    this.data_array = res.data;
  },
  computed: {
    sortedArray() {
      return this.data_array.sort((a, b) => b.amount - a.amount);
    },
    selectData() {
      let selectedDate = [];
      this.sortedArray.forEach((element) => {
        if (
          element.created_at >= this.startDate &&
          element.created_at <= this.endDate
        ) {
          selectedDate.push(element);
        }
      });
      console.log("leader", selectedDate);
      return selectedDate;
    },
  },
  methods: {
    timeFormat(createAt) {
      return moment(createAt).format("DD/MM/YYYY HH:mm:SS");
    },
  },
};
</script>

<style>
</style>