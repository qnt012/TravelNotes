<template>
    <div class="noteSearchMenu">
        <input type="search" v-model="keyword" @change="searchKeyword" placeholder="  검색"/><i @click="searchKeyword" class="fas fa-search"></i>  
    </div>
</template>

<script>
export default {
  methods:{
    searchKeyword() {
      this.$emit('getKeyword', this.keyword);
    //   this.keyword = ''
    },
  },
}
</script>