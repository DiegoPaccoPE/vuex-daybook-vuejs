<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar entrada" v-model="term"/>
    </div>

    <div class="mt-2 d-flex flex-column">
      <button @click="$router.push({name: 'entry', params: {id: 'new'}})"
        class="btn btn-primary mx-3">
        <i class="fa fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>

    <div class="entry-scroll-area">
      <EntryCard v-for="entry in entriesByTerm" :key="entry.id" :entry="entry"/>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
export default {
  components: {
    EntryCard: defineAsyncComponent(() => import("./EntryCard.vue")),
  },
  data(){
    return {
      term: '',
    }
  },
  computed: {
    ...mapGetters('journal', {
      entries: 'getEntryByTerm'
    }),
    entriesByTerm(){
      return this.entries(this.term)
    }
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scroll-area {
  height: calc(100vh - 102px);
  overflow-y: scroll;
}
</style>
