<template>
  <div>
    <v-container fill-height>
      <v-row align="center" class="white--text" justify="center">
        <v-col class="white--text text-center" cols="12" tag="h1">
          <span class="font-weight-black" style="font-size: 250%">
            Leaderboard
          </span>
        </v-col>

        <template>
          <v-row class="tw-flex">
            <v-col class="tw-m-auto tw-flex tw-justify-center" cols="12" sm="6">
              <v-date-picker
                header-color="green lighten-1"
                v-model="dates"
                range
              ></v-date-picker>
            </v-col>
          </v-row>
        </template>

        <v-col class="white--text text-center" cols="12" tag="h1">
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
    </v-container>
  </div>
</template>

<script>
import TableCompo from "../components/TableCompo.vue";

export default {
  components: { TableCompo },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  data() {
    return {
      dates: ["2019-09-10", "2019-09-20"],
      tab: null,
      items: [
        { tab: "Earn Points", content: "EarnPoints" },
        { tab: "Loss Points", content: "LossPoints" },
      ],
    };
  },
};
</script>

<style>
</style>