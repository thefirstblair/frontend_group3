<template>
  <div class="leaderboard">
    <v-container fill-height style="padding-top:5vh">
      <v-row align="center" class="white--text" justify="center">
        <v-col class="white--text text-center" cols="12" tag="h1">
          <span class="font-weight-black" style="font-size: 350%">
            Leaderboard
          </span>
        </v-col>

        <template>
          <v-row>
            <v-col cols="4">
              <v-date-picker
                header-color="green lighten-1"
                v-model="dates"
                range
              ></v-date-picker>
            </v-col>

            <v-col class="white--text text-center" cols="8" tag="h1">
              <v-card color="basil">
                <v-tabs
                  v-model="tab"
                  background-color="transparent"
                  color="basil"
                  grow
                >
                  <v-tab v-for="item in items" :key="item.tab">
                    {{ item.tab }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="item in items" :key="item.tab">
                    <v-card color="basil" flat>
                      <v-card>
                        <TableCompo
                          :headtext="item.content"
                          :startDate="dates[0]"
                          :endDate="dates[1]"
                        />
                      </v-card>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import TableCompo from "../components/TableCompo.vue";

export default {
  components: { TableCompo },
  data() {
    return {
      dates: ["2021-08-05", this.getToday()],
      tab: null,
      items: [
        { tab: "Earn Points", content: "EarnPoints" },
        { tab: "Loss Points", content: "LossPoints" },
      ],
    };
  },
  methods: {
    getToday() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
  },
};
</script>

<style></style>
