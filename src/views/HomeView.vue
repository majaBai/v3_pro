<template>
    <div class="home-page">
        <div  class="todo-list">
            <div v-if="!state.todoList.length">还没有代办事件，请添加</div>
            <div v-else>
                <SingleTodo 
                v-for="(item, idx) in state.todoList" 
                :key="item.id" 
                :todo="item"
                @editTodo="edit(item)"
                @finishTodo="finish(idx)"
                @deleteTodo="delTodo(idx)"
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
                <el-button type="primary" @click="state.dialogVisible = false">
                确定
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import SingleTodo  from '../components/SingleTodo.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

const state = reactive({
    todoList:[],
    dialogVisible:false,
    form:{
        title:'',
        content: '',
        id: null,
    }
})
const closeDialog = () => {
    clearForm()
}
const clearForm = () => {
    state.form.title = ''
    state.form.content = ''
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
    console.log( state.form )

}
const finish = (idx) => {
    state.todoList[idx].state = 1
}
const delTodo = (idx) => {
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
    state.todoList.splice(idx, 1)
    ElMessage({
        type: 'success',
        message: '已删除',
      })
    })
    .catch(() => {
    //   ElMessage({
    //     type: 'info',
    //     message: 'Delete canceled',
    //   })
    })
}
const seeDetail = (item) => {
    router.push({
    name: "detail",
    query: {
        id: item.id,
    },
    });
}
onMounted(() => {
    state.todoList = [
        {
            title:'阅读',
            state: 0, // 0 未完成，1 已完成
            id: 1,
            content: 'xfsdfsdf'
        },
        {
            title:'阅读1',
            state: 1, // 0 未完成，1 已完成
            id: 2,
            content: 'sdfsdf'
        },
    ]
})
</script>


<style scoped>
.btn-line {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>