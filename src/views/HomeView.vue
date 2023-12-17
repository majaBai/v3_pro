<template>
    <div class="home-page">
        <div  class="todo-list">
            <div v-if="!todoList?.length">还没有代办事件，请添加</div>
            <div v-else>
                <SingleTodo 
                v-for="item in todoList" 
                :key="item.id" 
                :todo="item"
                @editTodo="edit(item)"
                @finishTodo="finish(item.id)"
                @deleteTodo="delTodo(item.id)"
                @click="seeDetail(item)"
                />
            </div>
        </div>
        <div class="btn-line">
            <el-button 
            @click="state.dialogVisible = true" 
            type="primary">
            +添加待办事项
            </el-button>
        </div>
        <el-dialog v-model="state.dialogVisible" title="添加待办事项" @closed="closeDialog">
            <el-form :model="state.form" label-width="60px">
                <el-form-item label="事件名">
                <el-input v-model="state.form.title" />
                </el-form-item>
                <el-form-item label="内容">
                <el-input
                :rows="2"
                type="textarea"
                v-model="state.form.content" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAdd">
                确定
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, reactive,getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import SingleTodo  from '../components/SingleTodo.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia';
// import { toRefs } from 'vue';

const { proxy } = getCurrentInstance() // proxy 相当于 this，可以获取APP全局注入的属性方法

import useStore from '../stores/index';
const { todoStore } = useStore()

const { todoList } = storeToRefs(todoStore)

console.log('todlist---', todoStore, todoList)
const router = useRouter()


const state = reactive({
    // todoList:[],
    dialogVisible:false,
    form:{
        title:'',
        content: '',
        id: null,
    },
    editedTodo: {},
})
const closeDialog = () => {
    clearForm()
}
const clearForm = () => {
    state.form.title = ''
    state.form.content = ''
    state.form.id = null
}
const fillForm = (t, c, id) => {
    state.form = {
        title: t,
        content: c,
        id
    }
}
const edit = (item) => {
    clearForm()
    state.dialogVisible = true
    fillForm(item.title, item.content, item.id)
}

const confirmAdd = () => {
    let temp = todoList.value
    console.log('add', temp.length)
    if(state.form.id != null) {
        // 编辑
        let id = state.form.id
        let idx = temp.findIndex(item => item.id == id)
        temp[idx].title = state.form.title
        temp[idx].content = state.form.content
    } else {
        let t = {
            title: state.form.title,
            content: state.form.content,
            state: 0,
            id: state.form.title + temp.length,
        }
        if(temp) {
            temp.unshift(t)
        } else {
            temp = [t]
        }
    }
    todoStore.$patch({
        todoList: temp
    })
    state.dialogVisible = false
    clearForm()
}
const finish = (id) => {
    console.log('finish', id)
    let temp = todoList.value
    let idx = temp.findIndex(item => item.id == id)
    temp[idx].state = 1
    todoStore.$patch({
        todoList: temp
    })
}
const delTodo = (id) => {
    ElMessageBox.confirm(
    '确定删除?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
    let temp = todoList.value
    let idx = temp.findIndex(item => item.id == id) 
    temp.splice(idx, 1)
    console.log('del: id idx', id, idx, temp)

    todoStore.$patch({
        todoList: temp
    })
    ElMessage({
        type: 'success',
        message: '已删除',
      })
    })
    .catch((err) => {
        console.log('del todo**', err)
    })
}
const seeDetail = (item) => {
    router.push({
        // path:`/detail/${item.id}`
    name: "detail",
    query: {
        id: item.id,
    },
    });
}
onMounted(() => {
    // console.log('proxy.$api', proxy.$api)
    proxy.$api.getTodoList('google.com').then(res => console.log('put', res))

    let tl = JSON.parse(localStorage.getItem('todoList'))
    tl?.sort((a, b) => a.state - b.state)
    console.log('mouted', tl)
    if(tl?.length){
        todoStore.$patch({
        todoList: tl
    })
    }
})
</script>


<style scoped>
.btn-line {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>