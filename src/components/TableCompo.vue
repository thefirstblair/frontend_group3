<template>
  <div>
    <div class="leaderboard">
      <v-simple-table fixed-header height="600px" fill-height>
        <thead>
          <tr>
            <th scope="col">
              <v-icon small>mdi-crown</v-icon>
              Rank
            </th>

            <!-- <th scope="col">Time Stamp</th> -->
            <th scope="col">Username</th>

            <th scope="col">
              {{ headtext }}
            </th>
          </tr>
        </thead>
        <tbody style="text-align: left">
          <tr v-for="(item, index) in sortedArray" :key="index">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ timeFormat(item.created_at) }}</td> -->
            <td>{{ item[0] }}</td>
            <td
              :style="{ color: +(headtext == 'EarnPoints') ? 'green' : 'red' }"
            >
              {{ headtext == "EarnPoints" ? item[1] : "-" + item[1] }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import HistoryService from "@/services/HistoryService";
import moment from "moment";

export default {
  props: ["headtext", "startDate", "endDate"],
  data() {
    return {
      data_array: [],
      dataCal: [],
      dataAfterCal: [],
    };
  },
  async created() {
    let res = await HistoryService.getLeaderBoard(this.headtext);
    this.dataAfterCal = this.calData(res.data);
  },
  computed: {
    sortedArray() {
      return this.dataAfterCal.sort((a, b) => b[1] - a[1]);
    },
    selectData() {
      let selectedDate = [];
      this.data_array.forEach((element) => {
        if (
          element.created_at >= this.startDate &&
          element.created_at <= this.endDate
        ) {
          selectedDate.push(element);
        }
      });
      return selectedDate;
    },
  },
  methods: {
    timeFormat(createAt) {
      return moment(createAt).format("DD/MM/YYYY HH:mm:SS");
    },
    calData(arr) {
      let leaderMap = new Map();
      arr.forEach((element) => {
        if (element.detail === this.headtext) {
          let score = 0;
          if (leaderMap.has(element.users.username)) {
            score += leaderMap.get(element.users.username) + element.amount;
          } else {
            score = element.amount;
          }
          leaderMap.set(element.users.username, score);
        }
      });
      return Array.from(leaderMap);
    },
  },
};
</script>

<style>
</style>