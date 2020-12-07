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
        email: "",
        in: true,
        out: false,
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
        getEmail: state => {
            return state.email;
        },
        getIn: state => {
            return state.in;
        },
        getOut: state => {
            return state.out;
        }
    },
    mutations: {
        addNote: (state, payload) => {
            state.notes.push({ title: payload.title, text: payload.text, theme: payload.theme, idx: state.notenum, date: payload.date, writer: payload.writer, category: payload.category, html: payload.html, display: payload.display, moreOpen: false });
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
        setEmail: (state, payload) => {
            state.email = payload;
        },
        setIn: (state, payload) => {
            state.in = payload;
        },
        setOut: (state, payload) => {
            state.out = payload;
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
        }
    },
    actions: {
        // clearAll: (context, time) => {
        //     setTimeout(() => context.commit('clearAll'), time);
        // }
    }
})