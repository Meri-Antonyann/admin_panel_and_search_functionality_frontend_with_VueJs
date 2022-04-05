<template>
  <section class="section about-section gray-bg  " id="about">
    <div class="container">
      <b-row class="m-0 m-auto p-5" style="width: 700px; height: auto;">
        <b-col>
          <h4 class="text-center">Edit Post</h4>

          <b-form @submit.prevent="updatepost(data.id)" >
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="4"
              label-cols-lg="3"
              label="Enter Title"
              label-for="input-horizontal"
            >
              <b-form-input
                v-model="data.title"
                id="input-horizontal">

              </b-form-input>
            </b-form-group>

            <b-form-group
              id="desc"
              label-cols-sm="4"
              label-cols-lg="3"
              label="Short description"
              label-for="input-horizontal"
            >
              <b-form-input
                v-model="data.description"
                id="desc">
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="text"
              label-cols-sm="4"
              label-cols-lg="3"
              label="Text"
              label-for="input-horizontal"
            >
              <b-form-textarea
                v-model="data.text"
                id="desc">
              </b-form-textarea>
            </b-form-group>

            <b-form-group

              label-cols-sm="4"
              label-cols-lg="3"
              label="File"
              label-for="file"

            >
              <b-form-file
                id="file"
                type="file"
                v-on:change="changefile"
                v-model="files"
                multiple
                placeholder="Choose a file or drop it here..." >

              </b-form-file>

            </b-form-group>
            <p v-for="(file,key) in files" :key="key">{{ file.name }} </p>
            <p v-for="(file,key) in data.files" :key="key">
              <b-icon @click="deletefile(file.id)"   icon="x-circle" scale="2" variant="danger" style="width: 10px; height: 10px" class="m-2"></b-icon>
              {{ file.name }}
            </p>

            <button class="btn btn-primary" >Update</button>
          </b-form>

        </b-col>
      </b-row>
    </div>


  </section>
</template>

<script>


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
  this.showdata()

  },
  methods: {

    changefile(e) {
      let file = e.target.files;

      for (let i=0; i<file.length; i++){
        this.files.push(file[0])
      }

    },



    async showdata(){
      await this.axios.get(`showpost/${this.$route.params.id}`).then(response=> {
        this.data = response.data.posts[0]
        console.log(this.data)
      })
    },

    deletefile(id){
      this.axios.post(`filedelete/${id}`).then(response=> {
        this.showdata()
        console.log(response.data)
      })
    },



    async updatepost(id) {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }

      let formData = new FormData();

      formData.append('title', this.data.title);
      formData.append('description', this.data.description);
      formData.append('text', this.data.text);

      for(let i=0; i<this.files.length; i++){
        if(this.files.length<20) {
          formData.append('file[]', this.files[i]);

        }else{
          alert("Sorry! There are more than 20 files ")
          break;
        }
      }

      if(this.files.length<20)
        await this.axios.post(`updatepost/${id}`, formData, config).then(response => {
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
