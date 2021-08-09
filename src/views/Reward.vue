<template>
  <div>
    <div>
      <v-row align="justify-center" class="white--text" justify="center">
        <v-col class="white--text text-center" cols="12" tag="h1">
          <span class="font-weight-black" style="font-size: 350%">
            <br />
            Redeem Reward
          </span>
        </v-col>
      </v-row>
    </div>
    <div class="reward">
      <br />
      <br />

      <v-main>
        <v-container>
          <v-row>
            <v-col
              ref="vcol"
              v-for="item in items"
              :key="item.id"
              sm="4"
              md="3"
              lg="3"
            >
              <v-card
                class="mx-auto"
                color="white"
                height="339px"
                width="220px"
              >
                <v-img
                  :src="'http://localhost:1337' + item.picture.url"
                  height="180px"
                  class="mx-auto white--text align-end"
                  aspect-ratio="1"
                ></v-img>

                <div class="center">
                  <v-card-title class="justify-center">
                    <label for="name">
                      <td>{{ item.name }}</td>
                    </label>
                  </v-card-title>

                  <v-card-subtitle>
                    <label for="points"
                      >แต้ม:
                      <td>{{ item.points }}</td></label
                    >
                    <br />
                    <label for="amount"
                      >เหลือ
                      <td>{{ item.amount }} ชิ้น</td>
                    </label>
                  </v-card-subtitle>
                </div>

                <div class="center">
                  <v-btn
                    height="50px"
                    block
                    @click="redeemReward(item)"
                    :disabled="item.amount === 0"
                    >Redeem Reward</v-btn
                  >
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </div>
</template>

<script>
import RewardStore from "@/store/Reward";
export default {
  data() {
    return {
      items: [],
      token: "",
      user: [],
    };
  },
  async created() {
    await this.fetchReward();
  },
  methods: {
    async fetchReward() {
      await RewardStore.dispatch("fetchRewards");
      this.items = RewardStore.getters.rewards;
    },
    async redeemReward(item) {
      this.$swal
        .fire({
          title: "โปรดยืนยันการแลกของรางวัล",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let res = await RewardStore.dispatch("redeemRewards", item);
            if (res.status == 200) {
              this.$swal(
                "แลกของรางวัลเรียบร้อย",
                "คุณได้ใช้แต้มไป " + item.points + " แต้ม",
                "success"
              );
            } else if (res === "Sorry, You don't have enough point") {
              this.$swal(
                "เกิดข้อผิดพลาดระหว่างการแลกรางวัล",
                "คุณมีแต้มไม่เพียงพอ",
                "error"
              );
            } else {
              this.$swal("Oops...", "Something went wrong!", "error");
            }
          }
        });
    },
  },
};
</script>

<style>
.reward {
  width: 80%;
  height: 80vh;
  border-radius: 1vh;
  padding: 3vh;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;

  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(231, 234, 217, 1) 50%,
    rgba(0, 87, 255, 0) 100%
  );
}

.reward::-webkit-scrollbar {
  width: 0 !important;
}

.center {
  text-align: center;
}
</style>
