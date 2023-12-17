import { defineStore } from 'pinia'

const useTodoStore = defineStore('todolist', {
    persist:{
        enabled:true,
        strategies:[
          {
            key: 'todolist',
            storage:localStorage,//存储方式
          }
        ]
      },
    state: () => {
        return {
            todoList: [],
        };
      },
      //   计算 cpmputed
      getters: {},
      //   方法 methods
      actions: {
       
      },

      
})

export default useTodoStore