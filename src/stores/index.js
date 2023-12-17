import { defineStore } from 'pinia'

import useCounterStore from './counter'
import useTodoStore from './todostore'

export default function useStore() {
    return {
      todoStore: useTodoStore(),
      counter: useCounterStore(),
    }
  }
// const useTodoStore = defineStore('todolist', {
//     persist:{
//         enabled:true,
//         strategies:[
//           {
//             key: 'todolist',
//             storage:localStorage,//存储方式
//           }
//         ]
//       },
//     state: () => {
//         return {
//             todoList: [],
//         };
//       },
//       //   计算 cpmputed
//       getters: {},
//       //   方法 methods
//       actions: {
//         updateTodos(newtodos) {
//             this.todoList = newtodos
//             // localStorage.setItem('todolist', this.todoList)
//         }
//       },

      
// })

// export default useTodoStore