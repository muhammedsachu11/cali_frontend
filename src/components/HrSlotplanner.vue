<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-between">
            <div>
              <h2 class="pre_head">
                This is the section for HR to book their available slot
              </h2>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div class="container">
      <div>
        <div class="col-md-6">
          <div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <button
                    onclick="document.getElementById('id011').style.display='block'"
                    type="button"
                    class="btn btn-orange btn-block mt-3"
                    @click="display_rec_id(recipe.mp_detail_id)"
                  >
                    <h3>Mark your available slots here</h3>
                  </button>
                  <div id="id011" class="w3-modal">
                    <div class="w3-modal-content">
                      <header class="w3-container w3-teal">
                        <span
                          onclick="document.getElementById('id011').style.display='none'"
                          class="w3-button w3-display-topright"
                          >&times;</span
                        >
                        <h2>Mark your available slots here</h2>
                      </header>
                      <div class="w3-container">
                        <br />
                        Date :
                        <input
                          type="date"
                          v-model="slot_item_date"
                          data-date-inline-picker="true"
                        />
                        <br />
                        <br />

                        ROUND TYPE : Technical
                        <input
                          type="radio"
                          v-model="interviewtype"
                          name="interviewtype"
                          class="cheker"
                          autocomplete="off"
                          v-bind:value="'technical'"
                          checked
                        />

                        HR<input
                          type="radio"
                          v-model="interviewtype"
                          name="interviewtype"
                          class="cheker"
                          v-bind:value="'hr'"
                        />

                        Manager
                        <input
                          type="radio"
                          v-model="interviewtype"
                          name="interviewtype"
                          class="cheker"
                          v-bind:value="'manager'"
                        />

                        Other<input
                          type="radio"
                          v-model="interviewtype"
                          name="interviewtype"
                          class="cheker"
                          v-bind:value="'other'"
                        />

                        <div class="container mt-4">
                          <table class="table table-borderless">
                            <thead>
                              <tr>
                                <th>Time Slot</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(key, index) in user_timings_list"
                                v-bind:key="key.id"
                              >
                                <td>
                                  <input
                                    :id="key.slot"
                                    :value="key.slot"
                                    v-model="checkedNames"
                                    type="checkbox"
                                  />
                                  <label> {{ key.slot }}</label>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    step="0.5"
                                    v-model="amount[index]"
                                    @input="setUser(index, key.user_assc_id)"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <button
                            type="button"
                            class="btn btn-orange btn-block mt-3"
                            @click="addyourSlottoCalendar()"
                          >
                            OK
                          </button>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <button
                            type="button"
                            class="btn btn-orange btn-block mt-3"
                            onclick="document.getElementById('id011').style.display='none'"
                          >
                            Cancel
                          </button>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="col-md-12">
        <div class="card mb-4 mt-4 pre_card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <button
                  @click="getFirstDate"
                  type="button"
                  class="btn btn-orange btn-block mt-3"
                >
                  Go to first date available
                </button>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <button
                  @click="toggle = !toggle"
                  type="button"
                  class="btn btn-orange btn-block mt-3"
                >
                  Select a date
                </button>
              </div>
            </div>
            <br />
            <div class="row" v-show="toggle">
              <div style="margin: auto">
                <label for="">From</label>
                <input type="date" v-model="startDate" />
                &nbsp;
                <label for="">To</label>
                <input type="date" v-model="date" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-3 col-sm-3 col-xs-3">
                <button
                  @click="prev"
                  class="btn btn-orange fa fa-chevron-left float-left f-35"
                >
                  Prev date
                </button>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12 text-center">
                <h2>
                  <strong>Week of {{ date | formatDate }} </strong>
                </h2>
              </div>
              <div class="col-md-3 col-sm-3 col-xs-3">
                <button
                  @click="next"
                  class="btn btn-orange fa fa-chevron-right float-right f-35"
                >
                  Next date
                </button>
              </div>
            </div>
            <hr />
            <div
              class="row"
              v-for="(created_date, index) in makes"
              v-bind:key="index"
            >
              <div class="col-md-2 col-sm-4 col-xs-4 text-center">
                <h2>
                  <strong>{{ created_date }}</strong>
                </h2>
              </div>
              <div class="col-md-10 col-sm-8 col-xs-8 table-response">
                <table class="table cal-table">
                  <tbody>
                    <tr>
                      <th>Interview Type</th>
                      <th>Time</th>
                      <th>Interviewer</th>
                      <th>Candidate name</th>
                    </tr>

                    <tr>
                      <td>
                        <li
                          v-for="(weekitem, innerIndex) in models(created_date)"
                          :key="innerIndex"
                        >
                          <span>
                            <td>{{ weekitem.slot_type }}</td>
                          </span>
                        </li>
                      </td>

                      <td>
                        <li
                          v-for="(weekitem, innerIndex) in models(created_date)"
                          :key="innerIndex"
                        >
                          <span>
                            <td>
                              {{ weekitem.slot_timing }}
                            </td>
                          </span>
                        </li>
                      </td>
                      <td>
                        <li
                          v-for="(weekitem, innerIndex) in models(created_date)"
                          :key="innerIndex"
                        >
                          <span>
                            <td>
                              {{ weekitem.recruiter_name }}
                            </td>
                          </span>
                        </li>
                      </td>

                      <td>
                        <li
                          v-for="(weekitem, innerIndex) in models(created_date)"
                          :key="innerIndex"
                        >
                          <span>
                            <td>
                              {{ weekitem.candidate_name }}
                            </td>
                          </span>
                        </li>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <br />
                <br />
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="text-center">
        <ul class="list-inline mt-2">
          Share Calendar:
          <li class="list-inline-item">
            <i class="fa fa-facebook" aria-hidden="true"></i>
          </li>
          <li class="list-inline-item">
            <i class="fa fa-envelope" aria-hidden="true"></i>
          </li>
          <li class="list-inline-item">
            <i class="fa fa-pinterest-p" aria-hidden="true"></i>
          </li>
          <li class="list-inline-item">
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisibleMealPlanAddedtoCalendar" width="30%">
      <span>
        Slot already added to calendar and the candidates will be able to
        <br />
        see your availabilitites
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleMealPlanAddedtoCalendar = false"
          >Ok</el-button
        >
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleMealPlantoCalendar" width="30%">
      <span
        >Slot added to calendar and the candidates will be able to see your
        availabilitites</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleMealPlantoCalendar = false"
          >Ok</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

 <script>
import uniq from "lodash/uniq";
import axios from "axios";
import { format, subDays, addDays } from "date-fns";
import Vue from "vue";

import moment from "moment";
Vue.config.productionTip = false;

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MMMM DD, YYYY");
  }
});
export default {
  name: "HrSlotplanner",
  data: function () {
    return {
      details: [],
      pageOfItems: [],

      dialogVisibleFavoriteRemove: false,
      fooddetails: [],
      diarydetails: [],
      recipedetails: [],
      showLess: true,
      showLessfood: true,
      displayArray: [],
      shopping_list: [],
      user_timings_list: [],
      dialogVisibleShoppingList: false,
      dialogVisibleShoppingListAdded: false,
      dialogVisibleMealPlanAdded: false,
      dialogVisibleMealPlanAvailable: false,
      dialogVisibleMealPlanAlreadyAvailable: false,
      dialogVisibleMealPlanCreated: false,
      dialogVisibleMealPlanNotCreated: false,
      dialogVisibleMealPlantoCalendar: false,
      dialogVisibleMealPlanAddedtoCalendar: false,
      dialogVisibleMealPlan: false,
      dialogVisibleDeleteItemAlready: false,
      dialogVisibleDeleteItem: false,
      slottype: "technical",
      checkedNames: [],

      amount: [],
      time: "",

      checkedNames1: [],
      servings1: [],
      amount1: [],
      time1: "",
      mp_date1: "",

      units: [],
      selectedType: "",
      date: new Date().toISOString().substr(0, 10),
      startDate: new Date(new Date().setDate(new Date().getDate() - 7))
        .toISOString()
        .substr(0, 10),
      items: [],
      toggle: false,
      recipe_calendar: [],
      food_calendar: [],
      recipe_calendar_dateserv: [],
      food_calendar_dateserv: [],
      diary_cal_dateserv: [],
    };
  },

  components: {},
  props: {},

  mounted() {
    this.getSlotDetail();
    this.getDiaryCalDateServ();
    this.getDiaryData();
  },
  computed: {
    makes() {
      const makes = new Set();
      this.filterItem.forEach((weekitem) => makes.add(weekitem.created_date));
      return Array.from(makes);
    },

    filterItem() {
      var vueData = {};
      vueData.mydate = new Date();
      let filterType = this.selectedType;
      let startDate = this.localizeDate(this.startDate);

      let date = this.localizeDate(this.date);

      const itemsByType = filterType
        ? this.items.filter((item) => item.type === filterType)
        : this.items;
      return itemsByType.filter((item) => {
        const itemDate = new Date(item.date);
        if (startDate && date) {
          return startDate <= itemDate && itemDate <= date;
        }
        if (startDate && !date) {
          return startDate <= itemDate;
        }
        if (!startDate && date) {
          return itemDate <= date;
        }
        return true;
      });
    },
    createdDate() {
      return uniq(this.diarydetails.map(({ created_date }) => created_date));
    },

    createdDay() {
      return uniq(this.diarydetails.map(({ created_day }) => created_day));
    },

    Item_name() {
      return uniq(this.diarydetails.map(({ mp_item_name }) => mp_item_name));
    },
    Servings_list() {
      return uniq(this.diarydetails.map(({ servings }) => servings));
    },

    assc_Name() {
      return uniq(
        this.diarydetails.map(({ user_assc_name }) => user_assc_name)
      );
    },
    item_Type() {
      return uniq(this.diarydetails.map(({ mp_item_type }) => mp_item_type));
    },
  },
  methods: {
    next() {
      console.log(this.startDate, "hooooooo");
      this.startDate = format(
        addDays(new Date(this.startDate), 1),
        "yyyy-MM-dd"
      );

      this.date = format(addDays(new Date(this.date), 1), "yyyy-MM-dd");
    },
    prev() {
      this.startDate = format(
        subDays(new Date(this.startDate), 1),
        "yyyy-MM-dd"
      );

      this.date = format(subDays(new Date(this.date), 1), "yyyy-MM-dd");
    },

    getFirstDate() {
      this.startDate = this.init_date;
      this.date = format(addDays(new Date(this.init_date), 7), "yyyy-MM-dd");
    },

    models(created_date) {
      return this.filterItem
        .filter((weekitem) => weekitem.created_date === created_date)

        .map((weekitem) => weekitem);
    },
    localizeDate(date) {
      if (!date || !date.includes("-")) return date;
      const [yyyy, mm, dd] = date.split("-");
      return new Date(`${mm}/${dd}/${yyyy}`);
    },
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
    showL(event) {
      if (!this.displayArray.includes(event)) {
        this.displayArray.push(event);
      }
    },

    display_ndb_no: function (event) {
      console.log("event", event);
      return (this.get_ndb_no = event);
    },

    display_rec_id: function (event) {
      console.log("event", event);
      return (this.get_rec_id = event);
    },

    hideL(event) {
      this.displayArray.pop(event);
    },

    getSlotDetail() {
      var app = this;
      axios.get(app.$hostname + `/slot-list/`).then((response) => {
        this.details = response.data;

        this.getDiaryData();

        this.getCurrentDate();

        this.getUserTimings();

        this.getDiaryCalDateServ();
      });
    },

    getUserTimings() {
      var app = this;
      axios
        .get(app.$hostname + `/slot-list/getuser_timings/`)
        .then((response) => {
          this.user_timings_list = response.data;
          console.log(response.data, "user_timings_list");
        });
    },

    saveSlotplan(id) {
      var app = this;

      var postData = {
        mp_name: this.mp_name,
      };
      axios
        .post(app.$hostname + `/slot-list/` + id + `/save_mealplan/`, postData)
        .then((response) => {
          if (response.status == 200) {
            this.dialogVisibleMealPlan = true;
            this.getDiaryCalDateServ();
            this.getDiaryData();
          } else {
            this.dialogVisibleMealPlanAdded = true;
          }
          console.log(response.status);
        });
    },

    setUser(index, user_id) {
      this.amount[index]["user_id"] = user_id;
    },

    setUser1(index, user_id) {
      this.amount1[index]["user_id"] = user_id;
    },

    setUnits(index, user_id) {
      this.units[index]["user_id"] = user_id;
    },
    // #wwwwwwwwwwwwwwwwwwwwwwwwwwwww
    addyourSlottoCalendar() {
      var app = this;

      var postData = {
        slot_item_date: this.slot_item_date,
        slot_type: this.interviewtype,
        recruiter_name: "Ramesh",
        candidates: this.amount,
        checkedNames: this.checkedNames,
        recruiter_id: 1,
      };

      axios
        .post(app.$hostname + `/slot-list/addyour_recipetocalendar/`, postData)
        .then((response) => {
          if (response.status == 200) {
            this.dialogVisibleMealPlantoCalendar = true;

            this.getDiaryData();
          } else {
            this.dialogVisibleMealPlanAddedtoCalendar = true;
          }
          console.log(response.status);
        });
    },

    getDiaryData() {
      var app = this;
      const url = app.$hostname + `/slot-list/getweekplans/`;
      axios.get(url).then((response) => {
        this.items = response.data;

        this.init_date = format(new Date(response.data[0].date), "yyyy-MM-dd");
      });
    },

    getCurrentDate() {
      var app = this;
      const url = app.$hostname + `/slot-list/getcurrentdates/`;
      axios.get(url).then((response) => {
        this.currentdate = response.data;
      });
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

.cal-table {
  border: 0px;
}
.cal-table td {
  border-left: 0px;
  border-top: 0px;
  padding: 0px;
}
.cal-table li {
  border-bottom: 1px solid #c8c8c8;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
}
</style>