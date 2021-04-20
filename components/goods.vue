<template>
  <div class="goods">
    <template v-if="grouped.length !== 0">
      <goodType
        v-for="(value, name) in grouped"
        :arr_of_obj="value"
        :type="name"
        :key="name"
      />
    </template>
  </div>
</template>
<script>
import goodType from "~/components/goodType";
import { mapState } from "vuex";

export default {
  name: "goods",
  data() {
    return {
      grouped: [],
    };
  },
  components: {
    goodType,
  },
  computed: {
    ...mapState({
      goods: (state) => state.goods,
      names: (state) => state.names,
    }),
  },
  methods: {
    fetch_goods() {
      if (this.goods.length !== 0) {
        this.grouped = this.goods.reduce((r, a) => {
          r[a["G"]] = [...(r[a["G"]] || []), a];
          return r;
        }, {});
      }
    },
  },
  beforeMount() {
    this.fetch_goods();
  },
  watch: {
    goods() {
      this.fetch_goods();
    },
  },
};
</script>

<style scoped>
.goods {
  flex: 1;
  height: 900px;
  padding: 20px;
}

@media (max-width: 1080px) {
  .goods {
    flex: unset;
    max-width: 600px;
    margin: 0 auto;
    padding-top: 60px;
  }
}
</style>