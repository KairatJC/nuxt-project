<template>
  <div class="good-type" :class="{ 'good-type--collapsed': collapsed }">
    <template v-if="isReady">
      <div class="good-type__name" @click="collapsed = !collapsed">
        <span>></span>{{ name }}
      </div>
      <div class="good-type__items">
        <goodItem
          v-for="(good, index) in arr_of_obj"
          :dat="good"
          :key="index"
        />
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import goodItem from "~/components/goodItem";

export default {
  name: "good-type",
  data() {
    return {
      collapsed: false,
      isReady: false,
      name: "Loading...",
    };
  },
  props: {
    arr_of_obj: Array,
    type: String,
  },
  components: {
    goodItem,
  },
  computed: {
    ...mapState({
      names: (state) => state.names,
    }),
  },
  watch: {
    arr_of_obj() {
      if (this.type) {
        this.isReady = true;
      }
      if (this.names || this.name == "Loading...") {
        this.name = this.names[this.type].G;
      }
    },
    names() {
      if (this.name == "Loading...") {
        this.name = this.names[this.type].G;
      }
    }
  },
  beforeMount() {
    if (this.arr_of_obj && this.type) {
      this.isReady = true;
    }
    if (this.names || this.names[this.type].G) {
      this.name = this.names[this.type].G;
    }
  },
};
</script>
<style scoped>
.good-type {
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px 5px 0 0;
}
.good-type__name > span {
  font-family: monospace;
  margin-right: 5px;
  margin-left: 5px;
  font-weight: 900;
  display: inline-block;
  transition: 0.1s linear;
}
.good-type__name {
  padding: 5px;
  background-color: rgb(164 202 251);
  cursor: pointer;
  user-select: none;
}
.good-type--collapsed .good-type__name > span {
  transform: rotate(90deg);
}
.good-type--collapsed .good-type__items {
  height: 0;
  overflow: hidden;
}
</style>