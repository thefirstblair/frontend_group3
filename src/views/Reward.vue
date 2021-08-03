<template>
  <div>
    <v-app id="inspire">
      <v-row align="center" class="white--text" justify="center">
        <v-col class="black--text text-center" cols="12" tag="h1">
          <span class="font-weight-black" style="font-size: 200%">
            Redeem Reward
          </span>
        </v-col>
      </v-row>

      <v-main>
        <v-container>
          <v-row>
            <v-col v-for="item in items" :key="item.id" cols="3">
              <v-card class="mb-2" height="200" width="200">
                <v-row align="start">
                  <v-col class="shrink">
                    <v-img
                      :src="'http://localhost:1337' + item.picture.url"
                      max-height="200"
                      max-width="200"
                      class="ml-3"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>

              <div>
                <br />
                <label for="name"
                  >Name:
                  <td>{{ item.name }}</td>
                </label>
                <br />
                <label for="points"
                  >Points:
                  <td>{{ item.points }}</td></label
                >
                <br />
                <label for="amount"
                  >Amount:
                  <td>{{ item.amount }}</td>
                </label>
              </div>

              <br />
              <v-btn @click="redeemReward">Redeem Reward</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <div class="rewardTable">
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left" scope="col">Name</th>

                <th class="text-left" scope="col">Points</th>

                <th class="text-left" scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.points }}</td>
                <td>{{ item.amount }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-app>
  </div>
</template>

<script>
import RewardStore from "@/store/Reward";
import Axios from "axios";
export default {
  data() {
    return {
      items: [],
      token: "",
      user: [],
      pictureInput: "",
    };
  },
  created() {
    this.fetchReward();
  },
  methods: {
    async fetchReward() {
      try {
        let response = await Axios.post("http://localhost:1337/auth/local", {
          identifier: "admin",
          password: "admin1",
        });
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        this.token = response.data.jwt;
        this.profile = response.data.user;
      } catch (error) {
        console.log("An error occurred:", error.response);
      }
      await RewardStore.dispatch("fetchRewards", this.token);
      this.items = RewardStore.getters.rewards;
    },
    redeemReward() {},
  },
};
</script>

<style>
.rewardTable {
  width: 80%;
  height: 50vh;
  border-radius: 1vh;
  padding: 3vh;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  background-color: beige;
}
</style>