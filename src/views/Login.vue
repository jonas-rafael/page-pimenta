<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = 'Credenciais inválidas. Verifique seu e-mail e senha.'
    loading.value = false
  } else {
    router.push('/admin')
  }
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 border border-stone-100">
      <div class="text-center mb-10">
        <h1 class="text-2xl font-black uppercase tracking-[0.3em] text-stone-900">Admin</h1>
        <p class="text-stone-400 text-xs mt-2 uppercase tracking-widest font-bold">Casa Pimenta</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-2">E-mail</label>
          <input v-model="email" type="email" required placeholder="admin@email.com" class="w-full p-4 bg-stone-50 border-b border-stone-200 focus:border-emerald-500 outline-none transition-all text-sm" />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-2">Senha</label>
          <input v-model="password" type="password" required placeholder="••••••••" class="w-full p-4 bg-stone-50 border-b border-stone-200 focus:border-emerald-500 outline-none transition-all text-sm" />
        </div>

        <p v-if="errorMsg" class="text-red-500 text-[10px] font-bold uppercase text-center animate-pulse">{{ errorMsg }}</p>

        <button type="submit" :disabled="loading" class="w-full bg-stone-900 hover:bg-emerald-700 text-white p-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl disabled:bg-stone-300">
          {{ loading ? 'Autenticando...' : 'Entrar no Painel' }}
        </button>
      </form>
      
      <div class="mt-12 text-center">
        <router-link to="/" class="text-stone-400 hover:text-stone-600 text-[10px] font-bold uppercase tracking-widest transition-colors">← Voltar para o site</router-link>
      </div>
    </div>
  </div>
</template>
