import { defineStore, acceptHMRUpdate } from "pinia";
import type { Person, User } from "../models/person.models";
import { supabase } from "../config/supabaseCliente";

interface TodoState {
  persons: Person[];
  bol: boolean;
}

export const useTodoStore = defineStore({
  id: "todo",
  state: (): TodoState => ({
    persons: [],
    bol: true,
  }),
  getters: {},
  actions: {
    async addTask(items: any): Promise<void> {
      try {
        const { data: user, error } = await supabase
          .from("users")
          .insert([
            {
              name: items.name,
              lastname: items.lastname,
              bod: items.bod,
              phone: items.phone,
              email: items.email,
              address: items.address,
            },
          ])
          .select();

        if (user !== null) {
          items.transactions.forEach(async (element: any) => {
            await supabase.from("transactions")
            .insert([
              {
                user_id: user[0].id,
                transaction: element.transaction,
                amount: element.amount,
                date: element.date,
                status: false,
              },
            ]);
          });

          console.log(items);
        }
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
      console.log(items.address);
    },

    async deleteAll(id:number):Promise<void>{
      const data = this.persons.find((item:any) => item.id === id)
      console.log(data);
      data?.transactions.forEach(async (element:any) => {
        console.log(element.id);
        await this.deleteTransaction(element.id)
      });
      const { data: users, error } = await supabase
        .from("users")
        .delete()
        .match({ id: id });
      if (error) throw error;
      
    },

    async listar(): Promise<void> {
      const { data: users, error } = await supabase
        .from("users")
        .select("*,transactions(id, user_id,transaction,amount,date,status)")
        .order("id", { ascending: false });
      if (error) throw error;
      console.log(users);
      const result = users.map((element: any) => {
        let payments = element.transactions.length;
        let total = 0;
        element.transactions.forEach((transaction: any) => {
          total += transaction.amount;
        });
        return {
          id: element.id,
          name: element.name,
          lastname: element.lastname,
          bod: element.bod,
          phone: element.phone,
          email: element.email,
          address: element.address,
          payments: payments,
          total: total,
          transactions: element.transactions
        };
      });
      this.persons = result;
    },

    async listarT(id: number): Promise<User> {
      const { data: users, error } = await supabase
        .from("users")
        .select("*,transactions(*)")
        .match({ id: id });
      if (error) throw error;
      return users[0];
    },

    async createTransaction(transac: any): Promise<void> {
      const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: transac.user_id,
        transaction: transac.transaction,
        amount: transac.amount,
        date: transac.date,
        status: !transac.status,
      });
      if (error) throw error;
    },

    async updateTransaction(transac: any): Promise<void> {
      const { data, error } = await supabase
        .from("transactions")
        .update({
          transaction: transac.transaction,
          amount: transac.amount,
          date: transac.date,
        })
        .eq("id", transac.id);
        if(error) throw error;
    },

    async deleteTransaction(id: number): Promise<void> {
      const { data: transactions, error } = await supabase
        .from("transactions")
        .delete()
        .match({ id: id });
      if (error) throw error;
      console.log(transactions);
    },
    async updateUser( id: number, user: any): Promise<void> {
      const { data, error } = await supabase
        .from("users")
        .update({
          name: user.name,
          lastname: user.lastname,
          bod: user.bod,
          phone: user.phone,
          email: user.email,
          address: user.address,
        })
        .eq("id", id);
        if(error) throw error;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
