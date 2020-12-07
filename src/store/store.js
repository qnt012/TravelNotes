import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        notes: [],
        categories: ["to-do", "meeting", "task"],
        filter: "",
        notenum: 0,
        selected: -1,
        updaterOpen: false,
        updaterButton: true,
    },
    getters: {
        getNotes: state => {
            return state.notes;
        },
        getCategories: state => {
            return state.categories;
        },
        getFilter: state => {
            return state.filter;
        },
        getNoteNum: state => {
            return state.notenum;
        },
        getSelected: state => {
            return state.selected;
        },
        getUpdaterOpen: state => {
            return state.updaterOpen;
        },
        getUpdaterButton: state => {
            return state.updaterButton;
        },

    },
    mutations: {
        addNote: (state, payload) => {
            state.notes.push({ title: payload.title, text: payload.text, theme: payload.theme, idx: state.notenum, date: payload.date, writer: payload.writer, category: payload.category, html: payload.html, img: payload.img, predict: payload.predict, display: payload.display, moreOpen: false });
            state.notenum += 1;
        },
        deleteNote: (state, index) => {
            state.notes.splice(index, 1);
            if (state.notenum > 0)
                state.notenum -= 1;
            store.commit("reMatchIdx");
        },
        reMatchIdx: (state) => {
            for (var i = 0; i < state.notes.length; i++)
                state.notes[i].idx = i;
        },
        restoreNote: (state) => {
            state.notes = JSON.parse(localStorage.getItem('notes'));
        },
        restoreCategory: (state) => {
            state.categories = JSON.parse(localStorage.getItem('categories'));
        },
        restoreFilter: (state) => {
            state.filter = JSON.parse(localStorage.getItem('filter'));
        },
        clearAll: (state) => {
            state.notes = [];
        },
        newCategory: (state, payload) => {
            state.categories.push(payload);
        },
        setFilter: (state, payload) => {
            state.filter = payload;
        },
        setSelected: (state, payload) => {
            state.selected = payload;
        },
        updateNote: (state, payload) => {
            state.notes[state.selected].title = payload.title;
            state.notes[state.selected].text = payload.text;
            state.notes[state.selected].date = payload.date;
            state.notes[state.selected].writer = payload.writer;
            state.notes[state.selected].html = payload.html;
        },
        setUpdaterOpen: (state, payload) => {
            state.updaterOpen = payload;
        },
        setUpdaterButton: (state, payload) => {
            state.updaterButton = payload;
        },
        newPath: (state, payload) => {
            state.paths.push(payload);
        },
        restorePaths: (state) => {
            state.paths = JSON.parse(localStorage.getItem('paths'));
        }
    },
    actions: {
        // clearAll: (context, time) => {
        //     setTimeout(() => context.commit('clearAll'), time);
        // }
    }
})