<template lang="">
  <div class="max-w-screen-xl w-max flex flex-col justify-center px-4 py-10">
    <router-link class="mb-5 w-30" :to="{name:'lista'}" >Volver a lista</router-link>
    <form
      @submit.prevent=""
      class="flex flex-wrap p-2 bg-light-grey rounded-mb shadow-lg"
      v-on:submit.prevent="createTask"
    >
    <prueba></prueba> 
      <div class="rounded-mb bg-light-grey block">
        <div>Add Client</div>
        <div>Personal Information</div>
      </div>

      <div class="w-full">
        <div class="flex flex-wrap">
          <div class="w-96">
            <label class="w-20 pr-2">First Name</label>
            <input class="w-72" type="text" v-model="user.name" :error="errors.name "/>
          </div>
          <div class="invalid-feedback">{{ errors.title }}</div>  
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
          <button
            type="button"
            @click="deleteTransaction(item.id)"
            class="bg-red-600 block text-white py-1 px-2"
          >
            Delete
          </button>
        </div>
      </div>
      <button @click="handleSubmit(onSubmit)">Create</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTodoStore } from "../store/todo";
import { uid } from "uid";
import {useRoute, useRouter} from 'vue-router';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import type { User } from "@/models/person.models";
export default defineComponent({
  setup() {
    const user: any = ref({
      name: "",
      lastname: "",
      bod: "",
      phone: "",
      email: "",
      address: "",
      transactions: [],
    });

    const todoStore = useTodoStore();
    const router = useRouter()

    const schema:any = Yup.object().shape({
    name: Yup.string()
        .required('First Name is required'),
    lastname: Yup.string()
        .required('Last name is required'),
    dob: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    phone: Yup.string()
        .min(9, 'The phone number need at least 9 numbers')
        .required('Phone is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    address: Yup.string()
        .required('Address is required'),
    transactions:{
      transaction: Yup.string()
          .required('Transaction is required'),
      amount: Yup.string()
          .required('Amount is required'),
      date: Yup.string()
          .required('Date is required')
          .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    }

    
});


    async function createTask(): Promise<void> {
      await todoStore.addTask(user.value);
      todoStore.listar();
        router.push('lista');
    }

    function addTransaction(): void {
        user.value.transactions.push({
            id:uid(),
            transaction: 0,
            amount: 0,
            date: "",
      }); 
      console.log(user.value)
    }

    function deleteTransaction(id: number): void {
      user.value.transactions = user.value.transactions.filter(
        (item: any) => item.id !== id
      );
    }

    return {
      user,
      createTask,
      todoStore,
      addTransaction,
      deleteTransaction,
      schema
    };
  },
  mounted() {
    this.todoStore.listar();
  },
});
</script>
<style>
input {
  color: black;
}
</style>
