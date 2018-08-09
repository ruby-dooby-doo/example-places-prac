

/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      places: [],
      newPlace: {name: "", address: ""},
      errors: []
    };
  },
  created: function() {
    console.log('in the created');
    axios.get('/api/places').then(function(response) {
      console.log(response.data);
      console.log("in the callback for places index");
      this.places = response.data;
    }.bind(this));
  },
  methods: {
    addPlace: function() {
      console.log('adding the place');
      // tell the api to go make a new place
      var theParams = {
        name: this.newPlace.name,
        address: this.newPlace.address
      };
      axios.post('/api/places', theParams).then(function(response) {
        console.log('in the callback for post /places');
        this.places.push(response.data);
      }.bind(this)).catch(function(error) {
        console.log(error.response.data.errors);
        // show the user the errors
        this.errors = error.response.data.errors;
      }.bind(this));
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});

