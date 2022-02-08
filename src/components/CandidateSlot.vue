<template>
  <div>
    <div class="container">
      <div class="row">
        <h2 class="data_form_title">
          Dear candidate, Plase select your suitable slot
        </h2>

        <div class="col-md-12">
          <h3 class="text-center mt-3 mb-3">
            Slots covering:
            <strong> {{ startDate }} – {{ date }} </strong>
          </h3>

          <div class="row">
            <div style="margin: auto">
              <a
                @click="toggle = !toggle"
                style="text-align: center"
                class="btn btn-orange-outline"
                >Change Date
              </a>
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
          <br />
          <h3>Choose the possible slots below</h3>
          <div style="margin: auto">
            <div style="overflow-x: auto">
              <table>
                <thead>
                  <th>Book a slot</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Interview type</th>
                </thead>

                <tr
                  @click="Strike"
                  v-for="slots in filterItem"
                  v-bind:key="slots.date"
                >
                  <td :class="slots.slot_active == 1 ? 'grey' : 'text_color'">
                    <input
                      v-if="slots.slot_active == 1"
                      checked
                      type="checkbox"
                      @click="clickMySlot(slots.slot_id)"
                    />
                    <input
                      v-else
                      type="checkbox"
                      @click="clickMySlot(slots.slot_id)"
                    />
                  </td>
                  <td :class="slots.slot_active == 1 ? 'grey' : 'text_color'">
                    {{ slots.date }}
                  </td>
                  <td :class="slots.slot_active == 1 ? 'grey' : 'text_color'">
                    {{ slots.slot_timing }}
                  </td>

                  <td :class="slots.slot_active == 1 ? 'grey' : 'text_color'">
                    {{ slots.slot_type }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CandidateSlot",
  components: {},
  props: {},
  data() {
    return {
      mealplanlist: [],
      selectedType: "",
      date: new Date().toISOString().substr(0, 10),
      startDate: new Date(new Date().setDate(new Date().getDate() - 7))
        .toISOString()
        .substr(0, 10),

      items: [],
      toggle: false,
    };
  },

  computed: {
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
  },

  mounted() {
    this.getSlotList();
    this.getSlotList2();
    this.clickMyData();
  },

  methods: {
    getClass(id) {
      if (id == 1) {
        return "td1";
      } else if (id == 0) return "td2";
      else return "";
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

    getSlotList() {
      var app = this;

      axios
        .get(app.$hostname + `/slot-list/mealplanselection/`)
        .then((response) => {
          this.items = response.data;
        });
    },

    getSlotList2() {
      var app = this;

      axios
        .get(app.$hostname + `/slot-list/mealplanselection/`)
        .then((response) => {
          this.mealplanlist = response.data;
        });
    },

    Strike(event) {
      event.target.parentElement.parentElement.classList.toggle("grey");
    },
    clickMySlot(id) {
      console.log(id);
      var app = this;

      var postData = {
        slotid: parseInt(id),
        candidate_name: "ASHA",
      };
      axios
        .post(app.$hostname + `/slot-list/addtoclick/`, postData)
        .then((response) => {
          if (response.status == 200) {
            this.getSlotList();
            this.getSlotList2();
            app.dialogVisible = true;
          }
        });
    },
  },
};
</script>

<style>
.max-lines {
  display: block; /* or inline-block */
  text-overflow: ellipsis;

  overflow: hidden;
  max-height: 1.7em;
  line-height: 1.8em;
}
table {
  border-collapse: collapse;
  border-spacing: 1;
  width: 100%;
  border: 3px solid #ddd;
}

th,
td {
  text-align: center;
  padding: 8px;
  border-left: 1px solid #ddd;
}
thead {
  border: 1px solid #ddd;
  background: #ddd;
  font-size: 17px;
}
.td1 {
  background-color: green;
}
.td2 {
  background-color: blue;
}
.grey {
  background: #c8c1af;
  color: green;
  font-weight: bold;
}
.text_color {
  color: blue;
}

select,
input {
  background-color: #f8f8f8;
}
</style>