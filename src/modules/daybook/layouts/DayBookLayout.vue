<template>
  <Navbar />

  <div v-if="isLoading" 
  class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere porfavor... 
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div class="d-flex" v-else>
    <div class="col-4">
        <EntryList />
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Navbar: defineAsyncComponent(() => import('../components/Navbar')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList')),
  },
  computed: {
    ...mapState('journal', ['isLoading']) 
  },
  methods: {
    ...mapActions('journal', ['loadEntries'])
  },
  watch: {
    entries() {

    }
  },
  created() {
    this.loadEntries()
  }
};
</script>