<script setup>
import { computed } from "vue"

const props = defineProps({
  todo: Object,
})
const isFinish = computed(() => props.todo.state)
</script>

<template>
    <div class="single-todo">
        <div :class="{'finish': isFinish }">{{ todo.title }}</div>
        <div class="ops">
            <div v-if="todo.state == 0" @click.stop="$emit('editTodo')">编辑</div>
            <div @click.stop="$emit('deleteTodo')">删除</div>
            <div v-if="todo.state == 0" @click.stop="$emit('finishTodo')">完成</div>
        </div>
    </div>
</template>

<style scoped>
.single-todo {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    min-height: 70px;
}
.finish{
    text-decoration: line-through;
    color: gray;
}

</style>