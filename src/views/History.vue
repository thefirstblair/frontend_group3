<template>
  <div>
    <v-container fill-height>
      <v-row align="center" class="white--text" justify="center">
        <v-col class="white--text text-center" cols="12" tag="h1">
          <span class="font-weight-black" style="font-size: 350%">
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
              <th class="text-left" scope="col">Date</th>

              <th class="text-left" scope="col">Detail</th>

              <th class="text-left" scope="col">Amount</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.date">
              <td>{{ timeFormat(item.created_at) }}</td>
              <td>{{ item.detail }}</td>
              <td :style="{color: + (item.detail == 'EarnPoints') ? 'green' : 'red'}" >{{ (item.detail == 'EarnPoints') ? "+" + item.amount : "-" + item.amount }}</td>
              <!-- <td>{{ displayReward(item) }}</td> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import HistoryStore from "@/store/History";
import moment from "moment";
export default {
  data() {
    return {
      items: [],
    };
  },

  methods: {
    // displayReward(item) {
    //   console.log(item);
    //   return item.reward ? item.reward.name : "";
    // },
    async fetchHistories() {
      try {
        await HistoryStore.dispatch("fetchHistories");
        this.items = HistoryStore.getters.histories;
        console.log(HistoryStore.getters.history);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    },
    timeFormat(createAt) {
      return moment(createAt).format("DD/MM/YYYY HH:mm:SS");
    },
  },
  created() {
    console.log(moment().format("MMM Do YYY"));
    this.fetchHistories();
  },
};
</script>

<style>
.leaderboard {
  width: 80%;
  height: 80vh;
  border-radius: 1vh;
  padding: 3vh;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
}
</style>

