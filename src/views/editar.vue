<template lang="">
  <div class="max-w-screen-xl w-max flex flex-col justify-center px-4 py-10">
    <router-link class="mb-5 w-30" :to="{name:'lista'}" >Volver a lista</router-link>
    <form
      class="flex flex-wrap p-2 bg-light-grey rounded-mb shadow-lg"
    >
      <div class="rounded-mb bg-light-grey block">
        <div>Add Client</div>
        <div>Personal Information</div>
      </div>

      <div class="w-full">
        <div class="flex flex-wrap">
          <div class="w-96">
            <label class="w-20 pr-2">First Name</label>
            <input class="w-72" type="text" v-model="user.name" />
          </div>
          <div class="w-96">
            <label class="w-20 pr-2">Last Name</label>
            <input class="w-72" type="text" v-model="user.lastname" />
          </div>
          <div class="w-96">
            <label class="w-20 pr-8">DOB</label>
            <input class="w-72" type="date" v-model="user.bod" />
          </div>
        </div>
        <div class="w-full pt-8">
          <div class="flex flex-wrap">
            <div class="w-96">
              <label class="w-20 pr-9">Phone</label>
              <input class="w-72" type="text" v-model="user.phone" />
            </div>
            <div class="w-96">
              <label class="w-20 pr-10">Email</label>
              <input class="w-72" type="text" v-model="user.email" />
            </div>
            <div class="w-96">
              <label class="w-20 pr-2">Address</label>
              <input class="w-72" type="text" v-model="user.address" />
            </div>
          </div>
        </div>
        <div class="my-5 flex justify-center content-center mb-3">
        <button
          @click="updatePersonalData(id)"
          type="button"
          class="py-2 px-4 bg-orange-500 rounded-md font-bold hover:bg-orange-400"
        >
          Editar
        </button>
      </div>
        <div class="rounded-mb bg-light-grey block pt-10">PAYMENTS</div>
        <div class="flex justify-center content-center mb-3">
          <button
            type="button"
            @click="addTransaction"
            class="text-3xl px-5 py-3 rounded-full bg-green-500"
          >
            +
          </button>
        </div>
        <div
          class="flex flex-wrap mb-5"
          v-for="(item, index) in user.transactions"
          :key="index"
        >
          <div class="w-96">
            <label class="w-20 pr-1">Transaction</label>
            <input class="w-72" type="text" v-model="item.transaction" />
          </div>
          <div class="w-96">
            <label class="w-20 pr-6">Amount</label>
            <input class="w-72" type="text" v-model="item.amount" />
          </div>
          <div class="w-96">
            <label class="w-20 pr-7">Date</label>
            <input class="w-72" type="date" v-model="item.date" />
          </div>
          <div>
            <button
              type="button"
              @click="deleteTransaction(item.id)"
              class="bg-red-600 block text-white py-1 px-2"
            >
              Delete
            </button>
            <button
              type="button"
              v-if="!item.status"
              @click="updateTransaction(item.id)"
              class="bg-orange-600 block text-white py-1 px-2"
            >
              Edit
            </button>
            <button
              type="button"
              v-if="item.status"
              @click="createNew(item.id)"
              class="bg-green-600 block text-white py-1 px-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { useTodoStore } from "../store/todo";
import { useRoute } from "vue-router";
import { uid } from "uid";
import type { User, Transactions } from "@/models/person.models";
export default defineComponent({
  setup() {
    const route = useRoute();

    const id = ref(0);
    const todoStore = useTodoStore();

    let transactions: any[] = [];
    const user = ref({
      id: 0,
      name: "",
      lastname: "",
      bod: "",
      phone: "",
      email: "",
      address: "",
      transactions,
    });

    async function updatePersonalData(indice: number): Promise<void>{
      console.log(indice)
      await todoStore.updateUser(indice, user.value)
      user.value = await todoStore.listarT(id.value);
    }

    async function createNew(indice: string): Promise<void> {
      const transac = user.value.transactions.filter(
        (item: any) => item.id === indice
      );
      await todoStore.createTransaction(transac[0])
      user.value = await todoStore.listarT(id.value);
    }

    function addTransaction(): void {
        user.value.transactions.push({
            id:uid(),
            user_id:user.value.id,
            transaction: 0,
            amount: 0,
            date: "",
            status:true,
      });
      console.log(user.value.transactions)
    }

    async function updateTransaction(indice: any): Promise<void>{
      const transac = user.value.transactions.filter(
        (item: any) => item.id === indice
      );
      console.log(transac);
      await todoStore.updateTransaction(transac[0])
      user.value = await todoStore.listarT(id.value);
    }

    function deleteTransaction(id: number): void {
      todoStore.deleteTransaction(id)
      user.value.transactions = user.value.transactions.filter(
        (item: any) => item.id !== id
      );
    }

    return {
      id,
      todoStore,
      updatePersonalData,
      createNew,
      user,
      updateTransaction,
      deleteTransaction,
      addTransaction,
      transactions,
    };
  },

  async created() {
    this.id = Number(this.$route.params.id);
    this.user = await this.todoStore.listarT(this.id);
    
  },
});
</script>
<style>
input {
  color: black;
}
</style>
