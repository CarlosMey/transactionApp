<template lang="">
    <div>
        <form v-slot="{handleSubmit, errors}"></form>
        <ul>
            <li v-for="error in errors">{{error}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'prueba',
}
</script>
<style lang="">
    
</style>