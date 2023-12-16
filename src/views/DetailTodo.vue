<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const id = router.currentRoute.value.query.id

console.log('todo id', id)
</script>

<template>
    <div>
        todo details
    </div>
</template>

<style scoped>

</style>