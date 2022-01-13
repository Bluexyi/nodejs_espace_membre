<template>
  <div>
    <h1>Hi {{ user.username }}!</h1>
    <p>
      You're logged in {{ user.firstName }} {{ user.lastName }}! & Basic HTTP
      Authentication!!
    </p>
    <h3>Users from secure api end point:</h3>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { router } from "../_helpers";
import { userService } from "../_services";

export default {
  data() {
    return {
      user: {},
    };
  },

  created() {},

  beforeCreate() {
    let userFound = null;
    this.userFound = userService.getCurrent().then((res) => {
      console.log("RES ", res);
      if (res) {
        this.user = res;
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
    });
  },
};
</script>