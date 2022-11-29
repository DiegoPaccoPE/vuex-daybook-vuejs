<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
      </div>
      <div>
        <button class="btn btn-danger mx-2">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedio hoy?" v-model="entry.text"></textarea>
    </div>

    <FabIcon icon="fa-save" @on:click="saveEntry" />

    <img
      src="https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320"
      alt="entry-pictre"
      class="img-thumbnail"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      entry: null,
    }
  },
  components: {
    FabIcon: defineAsyncComponent(() => import("../components/FabIcon.vue")),
  },
  computed: {
    ...mapGetters('journal', {
      entrySelected: 'getEntryById'
    }),
    day(){
      const { day } = getDayMonthYear(this.entry.date)
      return day
    },
    month(){
      const { month } = getDayMonthYear(this.entry.date)
      return month
    },
    yearDay(){
      const { yearDay } = getDayMonthYear(this.entry.date)
      return yearDay
    }
  },
  methods: {
    ...mapActions('journal', ['updateEntry']),
    loadEntry(){
      const entry = this.entrySelected(this.id);
      if(!entry) return this.$router.push({name: 'no-entry'});
      this.entry = entry
    },
    saveEntry(){
      this.updateEntry(this.entry)
    }
  },
  created(){
    this.loadEntry()
  },
  watch: {
    id(){
      this.loadEntry()
    }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
