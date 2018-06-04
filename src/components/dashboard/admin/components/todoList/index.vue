<template>
    <!-- 
                        自动完成允许浏览器预测对字段的输入。
        autocomplete    当用户在字段开始键入时，浏览器基于之前键入过的值，
                        应该显示出在字段中填写的选项
     -->
    <section class="todoapp">
        <!-- header -->
        <header class="header">
            <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
        </header>
        <!-- main -->
        <section class="main" v-show="todos.length">
            <input type="checkbox" class="toggle-all" id="toggle-all" :checked="allChecked"
                @change="toggleAll({ done: !allChecked })">
            <label for="toggle-all"></label>
            <ul class="todo-list">
                <todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"
                    @toggleTodo="toggleTodo" @deleteTodo="deleteTodo"></todo>
            </ul>
        </section>
        <!-- footer -->
        <footer class="footer" v-show="todos.length">
            <span class="todo-count">
                <strong>{{ remaining }}</strong>
                {{ remaining | pluralize('item')}} left
            </span>
            <ul class="filters">
                <li v-for="(val, key) in filters" :key="key">
                    <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
                </li>
            </ul>
        </footer>
    </section>
</template>

<script>
import Todo from './todo.vue';

const STORAGE_KEY = 'toods';

const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
}

const defaultList = [
    { text: 'vue', done: false },
    { text: 'angular', done: false },
    { text: 'react', done: false },
    { text: 'nodejs', done: true },
    { text: 'pwa', done: true },
    { text: 'element-ui', done: true },
    { text: 'axios', done: true },
    { text: 'webpack', done: true },
]

export default {
    components: { Todo },
    data() {
        return {
            todos: defaultList,
            filters,
            visibility: 'all'
        }
    },
    computed: {
        allChecked() {
            return this.todos.every(todo => todo.done);
        },
        filteredTodos() {
            return filters[this.visibility](this.todos)
        },
        remaining() {
            return this.todos.filter(todo => !todo.done).length;
        }
    },
    methods: {
        setLocalStorage() {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        },
        addTodo(e) {
            const text = e.target.value;
            if (text.trim()) {
                this.todos.push({
                    text,
                    done: false
                });
                this.setLocalStorage();
            }
            e.target.value = '';
        },
        toggleTodo(val) {
            val.done = !val.done;
            this.setLocalStorage();
        },
        deleteTodo(val) {
            this.todos.splice(this.todos.indexOf(val), 1);
            this.setLocalStorage();
        },
        toggleAll({ done }) {
            this.todos.forEach(todo => {
                todo.done = done;
                this.setLocalStorage();
            })
        }
    },
    filters: {
        pluralize: (n, w) => n === 1 ? w : w + 's',
        capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>


