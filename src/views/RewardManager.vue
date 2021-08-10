<template>
  <div class="wrapper">
    <v-data-table
      :headers="headers"
      :items="rewards"
      sort-by="name"
      class="elevation-1"
      :items-per-page="5"
      style="margin-bottom: 100px"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Reward Manager</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-subtitle>
                <br />
                <span>โปรดกรอกข้อมูลให้ครบ มิฉะนั้นระบบจะไม่เพิ่มให้ </span>
              </v-card-subtitle>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        required
                        :rules="[
                          () => editedItem.name.length > 0 || 'Required field',
                        ]"
                        v-model="editedItem.name"
                        label="Reward name"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        required
                        :rules="[
                          () =>
                            editedItem.points.length > 0 || 'Required field',
                        ]"
                        v-model="editedItem.points"
                        label="Points"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        required
                        :rules="[
                          () =>
                            editedItem.amount.length > 0 || 'Required field',
                        ]"
                        v-model="editedItem.amount"
                        label="Amount"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.image"
                        label="Image URL"
                      ></v-text-field>

                      <input type="file" @change="handleChange" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.image="{ item }">
        <v-img
          :src="'http://localhost:1337' + item.picture.url"
          :alt="item.name"
          class="mx-auto"
          height="100"
          width="100"
        />
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Axios from "axios";
import RewardStore from "@/store/Reward";
import AuthService from "../services/AuthService";
let api_endpoint = "http://localhost:1337";
export default {
  name: "Rewards",
  data: () => ({
    resData: "",
    file: "",
    tokenData: "",
    uploadPercentage: 0,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Rewards Image",
        value: "image",

        sortable: false,
        align: "center",
      },
      { text: "Rewards Name", value: "name", align: "center" },
      { text: "Points", value: "points", align: "center" },
      { text: "Amount", value: "amount", align: "center" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    rewards: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      points: 0,
      amount: 0,
      picture: "",
    },
    defaultItem: {
      name: "",
      points: 0,
      amount: 0,
      image: "",
    },
  }),

  computed: {
    isDisabled() {
      return this.editItem.name.length > 0;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    async initialize() {
      await RewardStore.dispatch("fetchRewards");
      this.rewards = RewardStore.getters.rewards;
      console.log(this.rewards);
    },

    editItem(item) {
      this.editedIndex = this.rewards.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.editedIndex);
    },

    deleteItem(item) {
      this.editedIndex = this.rewards.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      let res = await RewardStore.dispatch("deleteRewards", {
        index: this.editedIndex,
        payload: this.editedItem,
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      // if file not null then upload file to DB first
      if (this.file) {
        console.log("saved", this.editedIndex);
        await this.uploadPicture();
        console.log("resdata save", this.resData);
        this.editedItem.picture = this.resData.data[0].id;
      }
      // update or create object
      if (this.editedIndex > -1) {
        Object.assign(this.rewards[this.editedIndex], this.editedItem);
        await RewardStore.dispatch("updateRewards", {
          index: this.editedIndex,
          data: this.editedItem,
        });
      } else {
        this.postReward();
        console.log("else", this.rewards);
      }
      // fetch new rewards data to update picture id with object picture
      await RewardStore.dispatch("fetchRewards");
      this.rewards = RewardStore.getters.rewards;
      this.dialog = false;
    },
    // update picture when user choose file
    handleChange(event) {
      this.file = event.target.files[0];
    },
    async uploadPicture() {
      // append pic to formdata
      const data = new FormData();
      data.append("files", this.file);

      // upload picture to database
      // get response data to use with relation
      this.resData = await Axios.post(
        api_endpoint + "/upload",
        data,
        AuthService.getApiHeader()
      );
    },
    async postReward() {
      let payload = {
        name: this.editedItem.name,
        points: this.editedItem.points,
        amount: this.editedItem.amount,
        picture: this.resData.data[0].id,
      };
      await RewardStore.dispatch("createRewards", payload);
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 80%;
  max-width: 980px;
  margin: 60px auto 0;
}
</style>
