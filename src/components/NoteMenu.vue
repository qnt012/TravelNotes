<template>
    <select style="z-index:2;" class="menuselect" v-model="selected">
        <option selected disabled value="">목록 선택</option>
        <option value="recolor">색상 변경</option>
        <option value="category">카테고리 선택</option>
    </select>
</template>