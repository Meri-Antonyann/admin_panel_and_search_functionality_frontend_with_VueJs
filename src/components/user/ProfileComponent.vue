<template>
    <section class="section about-section gray-bg  " id="about">
     <div class="container">
       <div class="row text-center  ">
         <div class="col-lg-6">
           <div class="about-text go-to">
             <h3 class="dark-color"> {{ data.name }}</h3>
             <h6 class="theme-color lead">{{ data.email }}</h6>
           </div>
         </div>
       </div>


       <b-row class="m-0 m-auto p-5" style="width: 700px; height: auto;">
         <b-col>
           <h4 class="text-center">Add Post</h4>
           <validation-observer ref="observer">
          <b-form @submit.prevent="savepost" >
            <validation
              name="title"
              rules="required|min:4"
            >
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="4"
              label-cols-lg="3"
              label="Enter Title"
              label-for="input-horizontal"
              v-slot="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                v-model="title"
                id="input-horizontal">
                :state="errors[0] ? false : null"
                trim
              </b-form-input>
            </b-form-group>
            </validation>
            <validation
              name="description"
              rules="required|min:4"
            >
            <b-form-group
              id="desc"
              label-cols-sm="4"
              label-cols-lg="3"
              label="Short description"
              label-for="input-horizontal"
              v-slot="{ errors }"
              :invalid-feedback="errors[0]"

            >
              <b-form-input
                v-model="description"
                id="desc">
                :state="errors[0] ? false : null"
                trim
              </b-form-input>
            </b-form-group>
            </validation>

            <validation
              name="description"
              rules="required"
            >
            <b-form-group
              id="text"
              label-cols-sm="4"
              label-cols-lg="3"
              label="Text"
              label-for="input-horizontal"
              v-slot="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-textarea
                v-model="text"
                id="desc">
                :state="errors[0] ? false : null"
                trim
              </b-form-textarea>
            </b-form-group>
            </validation>
              <validation
                name="image"
                rules="required"
              >
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              label="File"
              label-for="file"
              v-slot="{ errors }"
              :invalid-feedback="errors[0]"

            >
              <b-form-file
                id="file"
                type="file"
                v-on:change="changefile"
                v-model="files"
                multiple
                placeholder="Choose a file or drop it here..." >
                :state="errors[0] ? false : null"
                trim
              </b-form-file>

            </b-form-group>
              </validation>
            <p v-for="(file,key) in files" :key="key">{{ file.name }} </p>

            <button class="btn btn-primary" >Save</button>
             <router-link to="/posts" class="btn btn-primary">Posts</router-link>
          </b-form>
           </validation-observer>

         </b-col>
       </b-row>
     </div>


   </section>
 </template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data(){
    return {
      data: {},
      title:"",
      description: "",
      text:"",
      files: [],

    }
  },

  mounted() {
    this.UserData()

  },
  methods: {
    ...mapActions(["GET_USER_DATA"]),
    ...mapGetters(['getUser']),
    async UserData() {
      await this.GET_USER_DATA()
        .then(res => {
          if(res) {
            console.log(res)
            this.data = this.getUser()
            console.log(this.getUser())
          }
          localStorage.setItem('email', this.data.email)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    changefile(e) {
       let file = e.target.files;

      for (let i=0; i<file.length; i++){
        this.files.push(file[0])
      }

    },

    async savepost() {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }

      let formData = new FormData();

      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('text', this.text);

      for(let i=0; i<this.files.length; i++){
        if(this.files.length<20) {
          formData.append('file[]', this.files[i]);

        }else{
          alert("Sorry! There are more than 20 files ")
          break;
        }
      }

      if(this.files.length<20)
      await this.axios.post('savepost', formData, config).then(response => {
        this.$router.push({name: "Posts"})
      }).catch(error => {
        alert("Ooops! There is an error!")
        console.log(error)
      })
    },



  }
}
</script>

<style scoped>

</style>
