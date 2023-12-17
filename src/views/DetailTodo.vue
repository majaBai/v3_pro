<template>
    <div>
        <div @click="router.back()">
            <el-icon><ArrowLeftBold /></el-icon>
            返回
        </div>
        <el-table :data="curTodo" style="width: 100%">
            <el-table-column prop="title" label="待办事件" width="180" />
            <el-table-column prop="stateTxt" label="状态" width="180" />
            <el-table-column prop="content" label="内容"  />

        </el-table>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia';
// import useTodoStore from '../stores/index';

// const  todoStore = useTodoStore()
import useStore from '../stores/index';
const { todoStore } = useStore()

const { todoList } = storeToRefs(todoStore)

console.log('todoList', todoList.value)

const router = useRouter()
const id = router.currentRoute.value.query.id
console.log('cur route::' ,router.currentRoute.value)
// const id = router.currentRoute.value.params.id
console.log('todo id', id)

const curTodo = [todoList.value.find(item => item.id == id)]
console.log('cur todo', curTodo)
curTodo[0].stateTxt = curTodo[0].state == 0 ? '未完成' : '已完成'


</script>

<style scoped>

</style>