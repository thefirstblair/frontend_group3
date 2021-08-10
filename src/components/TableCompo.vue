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
          <tr v-for="(item, index) in selecDate" :key="index">
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ timeFormat(item.created_at) }}</td> -->
            <td>{{ item[0] }}</td>
            <td
              :style="{ color: +(headtext == 'EarnPoints') ? 'green' : 'red' }"
            >
              {{ item[1] }}
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
    this.data_array = res.data;
  },
  computed: {
    selecDate() {
      let selectedDate = [];
      this.data_array.forEach((element) => {
        if (
          element.created_at >= this.startDate &&
          element.created_at <= this.endDate &&
          element.users.role !== 3
        ) {
          selectedDate.push(element);
        }
      });
      let leaderMap = new Map();
      selectedDate.forEach((element) => {
        let score = 0;
        if (leaderMap.has(element.users.username)) {
          score += leaderMap.get(element.users.username) + element.amount;
        } else {
          score = element.amount;
        }
        leaderMap.set(element.users.username, score);
      });
      let dataMap = Array.from(leaderMap);
      return dataMap.sort((a, b) => b[1] - a[1]);
    },
  },
  methods: {
    timeFormat(createAt) {
      return moment(createAt).format("DD/MM/YYYY HH:mm:SS");
    },
  },
};
</script>

<style></style>
