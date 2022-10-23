<template lang="">
    <div class="overflow-x-auto relative">
        <router-link class="mb-5 w-30" :to="{name:'addcliente'}" >Agregar Usuario</router-link>
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scoped="col" class="py-3 pg-6">Client Name</th>
                    <th scoped="col" class="py-3 pg-6">DOB</th>
                    <th scoped="col" class="py-3 pg-6">Phone</th>
                    <th scoped="col" class="py-3 pg-6">Email</th>
                    <th scoped="col" class="py-3 pg-6">Address</th>
                    <th scoped="col" class="py-3 pg-6">Payments</th>
                    <th scoped="col" class="py-3 pg-6">Total</th>
                    <th scoped="col" class="py-3 pg-6">Actions</th>
                </tr>
            </thead>
            <tbody class="">
                <tr class="border-b bg-gray-800 border-gray-700 " v-for="person in todoStore.persons" :key="person.id">
                    <td class="py-4 px-6 font-medium text-white whitespace-nowrap">{{person.name}}</td>
                    <td class="py-4 px-6">{{person.bod}}</td>
                    <td class="py-4 px-6">{{person.phone}}</td>
                    <td class="py-4 px-6">{{person.email}}</td>
                    <td class="py-4 px-6">{{person.address}}</td>
                    <td class="py-4 px-6">{{person.payments}}</td>
                    <td class="py-4 px-6">{{person.total}}</td>
                    <td class="py-4 px-6"><button type="button" v-on:click.prevent="deleteData(person.id)"> ❌ </button><router-link class="ml-4" :to="{name:'editar', params:{id: person.id}}"> ✏ </router-link></td> 
                </tr> 
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { defineStore, acceptHMRUpdate } from 'pinia';
import { supabase } from '../config/supabaseCliente';
import { defineComponent, ref } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useTodoStore } from '../store/todo';
export default defineComponent({
    setup() {

    const todoStore = useTodoStore();
        
    async function deleteData(id:number): Promise<void>{
        await todoStore.deleteAll(id);
        await todoStore.listar();
    }
    return {
      todoStore,
      deleteData,
    };
  },
  mounted() {
    this.todoStore.listar();
    
  },
  
})
</script>
