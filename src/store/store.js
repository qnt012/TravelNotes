import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        notes:[],
        categories: ["to-do", "meeting", "task"],
        filter: "",
    },
    getters:{
        getNotes: state => {
            return state.notes;
        },
        getCategories: state => {
            return state.categories;
        },
        getFilter: state => {
            return state.filter;
        }
    },
    mutations:{
        addNote: (state, payload) =>{
            state.notes.push({title: payload.title, text: payload.text, theme: payload.theme, date: payload.date, writer: payload.writer, category: payload.category, html: payload.html, display: payload.display, moreOpen: false});
        },
        deleteNote: (state, index) =>{
            state.notes.splice(index, 1);
        },
        restoreNote: (state) => {
            state.notes = JSON.parse(localStorage.getItem('notes'));
        },
        restoreCategory: (state) =>{
            state.categories = JSON.parse(localStorage.getItem('categories'));
        },
        restoreFilter: (state) => {
            state.filter = JSON.parse(localStorage.getItem('filter'));
        },
        clearAll: (state) => {
            state.notes=[];
        },
        newCategory: (state, payload) =>{
            state.categories.push(payload);
        },
        setFilter: (state, payload) => {
            state.filter = payload;
        }
    },
    actions:{
        clearAll: (context, time) =>{
            setTimeout(()=>context.commit('clearAll'),time);
        }
    }
})