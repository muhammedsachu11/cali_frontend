<template>
  <fixed-header>
    <div class="navbar">
      <nav class="navbar navbar-dark navbar-expand-md w-100">
        <a class="navbar-brand" href="/"> </a>
        <div class="form-inline ml-md-auto order-md-last">
          <form>
            <input
              class="form-control search"
              type="text"
              id="search-bar"
              :placeholder="icon"
              autocomplete="off"
              spellcheck="false"
              autocorrect="off"
              style="font-family: Arial, FontAwesome"
            />
          </form>
          <button
            class="navbar-toggler ml-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
          >
            <i class="fa fa-reorder toggler"></i>
          </button>
          <div class="pl-2"><i class="fa fa-envelope-o mail-icon"></i></div>
        </div>
        <div class="collapse navbar-collapse flex-column" id="navbar">
          <ul class="navbar-nav nav">
            <li class="nav-item">
              <router-link tag="li" to="/hrslotplanner"
                ><a class="nav-link" data-toggle="tab" href="#"
                  >HOME</a
                ></router-link
              >
            </li>
            <li class="nav-item">
              <router-link tag="li" to="/hrslotplanner"
                ><a class="nav-link" data-toggle="tab" href="#"
                  >BOOK SLOT FOR HR</a
                ></router-link
              >
            </li>
            <li class="nav-item">
              <router-link tag="li" to="/candidateslot"
                ><a class="nav-link" data-toggle="tab" href="#"
                  >BOOK SLOT FOR CANDIDATE</a
                ></router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </fixed-header>
</template>

<script>
import FixedHeader from "vue-fixed-header";

export default {
  name: "App",
  components: {
    FixedHeader,
  },
  data() {
    return {
      token: localStorage.getItem("access_token"),
      is_pro: "",
      valid_token: true,
      icon: "\uf002",
    };
  },
};
</script>

<style>
li {
  text-decoration: none;
}
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: white;
  width: 100%;
}
</style>