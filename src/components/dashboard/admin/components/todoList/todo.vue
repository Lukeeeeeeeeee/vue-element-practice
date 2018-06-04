<template>
    <li class="todo" :class="{ completed: todo.done }">
        <div class="view">
            <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo(todo)">
            <label v-text="todo.text"></label>
            <button class="destroy" @click="deleteTodo(todo)"></button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'todo',
    props: ['todo'],
    methods: {
        toggleTodo(todo) {
            this.$emit('toggleTodo', todo);
        },
        deleteTodo(todo) {
            this.$emit('deleteTodo', todo);
        }
    }
}
</script>

