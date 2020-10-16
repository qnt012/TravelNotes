<template>
    <div class="noteSearchMenu">
        <input type="search" v-model="keyword" @change="searchKeyword" placeholder="  검색"/>
        <i @click="searchKeyword" class="fas fa-search"></i>
        <i @click="deleteKeyword" class="fas fa-undo"></i>  
    </div>
</template>

<script>
export default {
data: function() {
    return {
      keyword: ""
    };
  },
  methods:{
    searchKeyword() {
      this.$emit('getKeyword', this.keyword);
    },
    deleteKeyword() {
      this.$emit('getKeyword', "");
      this.keyword ="";
    }
  },
}
</script>