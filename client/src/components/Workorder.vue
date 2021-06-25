<template>
  <div class="workorders">
    <div class="create">
      <button @click="toggleCreate">Create an Order</button>

      <transition name="fade" mode="out-in">
      <div class="details" v-if="creating">
        <b>Creation Details</b>
        <div class="detail-container">

          <select name="key" id="key" v-model="key_id">
            <option selected disabled>Key ID</option>
            <option v-for="key in keys" :key="key.id" :value="key.id">
              {{key.name}}, {{key.description}}
            </option>
          </select>

          <select name="technician" id="technician" v-model="tech_id">
            <option selected disabled>Technicians</option>
            <option v-for="tech in technicians" :key="tech.id" :value="tech.id">
              {{tech.last_name}}, {{tech.first_name}}
            </option>
          </select>
        </div>

        <button class="create-button" @click="createWorkorder">Create!</button>
      </div>
      </transition>
    </div>

    <h2 v-if="orders.length"> Current Workorders: </h2>
    <h2 v-else>No Workorders!</h2>
    <div class="current-workorders" v-for="order in orders" :key="order.order_id">
      <div class="order">
        <b>Order ID:</b> {{order.order_id}} 
        <b>Description:</b> {{order.description}} 
        <b>Tech Name:</b> {{order.first_name}} {{order.last_name}}
        <b>Price:</b> {{order.price}}
        <b>Make/Model/Year:</b> {{order.make}}, {{order.model}}, {{order.year}}
        <button @click="toggleUpdate">Update Order</button>
        <button v-if="updating" @click="updateOrder(order.order_id)">Update!</button>
        <button @click="deleteOrder(order.order_id)">Delete Order</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Workorder',
  data: function () {
    return {
      creating: false,
      updating: false,
      url: 'http://localhost:3000/', //change this url when moving to production
      orders: null,
      keys: null,
      technicians: null,
      key_id: "",
      tech_id: "",
    }
  },
  created: function(){
    this.getOrders();

    // Then get all of the keys
    axios.get(this.url+"findKeys")
    // assign the Promise data to our orders variable
    .then(response => this.keys = response.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    // Then get all of the technicians
    axios.get(this.url+"findTechs")
    // assign the Promise data to our orders variable
    .then(response => this.technicians = response.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },
  methods: {
    toggleCreate () {
      this.creating = !this.creating;
    },
    toggleUpdate(){
      this.updating = !this.updating;
      this.creating = true;
    },
    getOrders(){
      // Get all orders
      axios.get(this.url)
      // assign the Promise data to our orders variable
      .then(response => this.orders = response.data)
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    },
    createWorkorder(){
      axios.post(this.url+"createOrder", null, {params: {key_id: this.key_id, tech_id: this.tech_id}})
      .then(this.getOrders())
    },
    deleteOrder(order_id){
      axios.delete(this.url+"deleteOrder", {params: {order_id: order_id}})
      .then(this.getOrders())
      this.orders = this.orders.filter(function( obj ) {
      return obj.order_id !== order_id;
});
    },
    updateOrder(order_id){
      // We can just delete the order and create it again, when we are updating
      this.deleteOrder(order_id);
      this.createWorkorder();
      this.toggleUpdate();
    }
    
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.current-workorders {
  display:flex;
  justify-content: stretch;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  border: #2c3e50 2px solid;
  border-radius: 5px;
  height: 2.5rem;
  color: #2c3e50;
  font-weight: bold;
  background:whitesmoke;
  margin: 1%;
}

button:hover {
  cursor: pointer;
}

.details {
  height:7rem;
  width:60%;
  padding:.5rem;
  border: #2c3e50 2px solid;
  border-radius:5px;
  margin: 1rem auto;
  background:whitesmoke;
}

.detail-container {
  display:flex;
  height:2rem;
  justify-content: space-evenly;
}

select {
  margin: .5rem;
  width:10rem;
  height:2rem;
  border: #2c3e50 2px solid;
  border-radius:5px;
}

.current-workorders {
  display:flex;
  justify-content: space-evenly;
  flex-wrap:wrap;
}

.order {
  width: 50%;
  height:5rem;
  margin: .5rem 0;
  border: #2c3e50 2px solid;
  border-radius: 5px;
  background:whitesmoke;
}
</style>
