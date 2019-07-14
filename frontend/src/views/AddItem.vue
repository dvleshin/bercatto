<template>
<section>
    <h1>Add/Edit Item</h1>
    {{this.item}}
    <div class="edit-form">
      <h1>{{item._id ? 'Edit Item' : 'Add Item'}}</h1>
      <div>
        <v-form @submit.prevent="saveItem">
          <v-text-field v-model="item.name" label="Name" required></v-text-field>
          <v-text-field v-model="item.condition" label="condition" required type="text"></v-text-field>
          <v-select :items="categories" v-model="item.category" label="Type"></v-select>
          <v-btn color="success" type="submit">{{item._id ? 'Save' : 'Add'}}</v-btn>
          <v-btn color="success" @click="goBack">
            <v-icon dark left>arrow_back</v-icon>back
          </v-btn>
        </v-form>
      </div>
    </div>
</section>
</template>

<script>
export default {
    created() {
        const itemId = this.$route.params.id;
        if (itemId){
        this.$store.dispatch({ type: "getItemById", itemId:itemId  })
      .then(item => {
          this.item = JSON.parse(JSON.stringify(item));
      
      })
        }
    },
    data() {
        return {
            item: {
        _id: '',
        name: '',
        category: '',
        ownerId: '',
        imgUrl: '',
        views: null,
        description: '',
        condition: '',
        tags: [],
        uploadedAt: null
            },
            categories: ['tech' , 'music', 'craft', 'arts', 'sport', 'tools', 'kids', 'home' , 'cars']
        }
    },
    computed: {
        
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="scss" scoped src="../styles/views/add-item.scss">
</style>


