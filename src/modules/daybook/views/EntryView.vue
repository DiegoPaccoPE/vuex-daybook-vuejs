<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
      </div>
      <div>

        <input type="file" accept="image/jpg, image/png, image/jpeg" ref="imageSelector" v-show="false" @change="handleImage">
        <button v-if="this.entry.id" class="btn btn-danger mx-2" @click="removeEntry">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click="imageButtonSelector">
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
      v-if="entry.picture && !loadImage"
      :src="entry.picture"
      alt="entry-pictre"
      class="img-thumbnail"
    />
    <img
      v-if="loadImage"
      :src="loadImage"
      alt="entry-pictre"
      class="img-thumbnail"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

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
      loadImage: null,
      file: null
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
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
    loadEntry(){
      let entry;
      if(this.id === 'new'){
        entry = {}
        entry.date = new Date().toDateString();
        entry.text = ''
      } else {
        entry = this.entrySelected(this.id);
        if(!entry) return this.$router.push({name: 'no-entry'});
      }
      this.entry = entry
    },
    async saveEntry(){
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()

      this.entry.picture = await uploadImage( this.file )

      if(this.entry.id){
        await this.updateEntry(this.entry)
      } else {
        const newId = await this.createEntry(this.entry)
        this.$router.push({name: 'entry', params: {id: newId}})
      }
      this.loadImage = null
      Swal.fire('Guardado', 'Entrada registrada con éxtio', 'success')
    },
    async removeEntry(){
      const { isConfirmed } = await Swal.fire({
        title: '¿Está seguro?',
        text: 'Una vez borrado no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro'
      })
      if( isConfirmed){
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()
        await this.deleteEntry(this.entry.id)
        this.$router.push({name: 'no-entry'})
        Swal.fire('Eliminado','','success')
      }
    },
    handleImage(event){
      const file = event.target.files[0]
      if(!file){
        this.loadImage = null
        this.file = null
        return
      }

      this.file = file

      const fr = new FileReader()
      fr.onload = () => this.loadImage = fr.result
      fr.readAsDataURL( file )
    },
    imageButtonSelector(){
      this.$refs.imageSelector.click()
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
