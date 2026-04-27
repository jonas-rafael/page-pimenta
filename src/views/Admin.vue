<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const reservas = ref<any[]>([])
const loading = ref(true)

async function fetchReservas() {
  loading.value = true
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!error) {
    reservas.value = data
  }
  loading.value = false
}

async function updateStatus(id: string, status: string) {
  const { error } = await supabase
    .from('reservas')
    .update({ status })
    .eq('id', id)
  
  if (!error) {
    await fetchReservas()
  }
}

async function handleLogout() {
  await supabase.auth.signOut()
  router.push('/login')
}

const stats = computed(() => {
  const total = reservas.value.length
  const pendentes = reservas.value.filter(r => r.status === 'Pendente' || !r.status).length
  const confirmadas = reservas.value.filter(r => r.status === 'Confirmada').length
  const receita = reservas.value
    .filter(r => r.status !== 'Cancelada')
    .reduce((acc, curr) => acc + Number(curr.valor_total), 0)
  
  return { total, pendentes, confirmadas, receita }
})

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}`
}

onMounted(() => {
  fetchReservas()
})
</script>

<template>
  <div class="min-h-screen bg-stone-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-stone-900 text-white p-8 flex flex-col hidden md:flex">
      <div class="mb-12">
        <h1 class="text-xl font-black uppercase tracking-[0.2em]">Casa Pimenta</h1>
        <p class="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mt-1 text-center">Painel Admin</p>
      </div>

      <nav class="flex-1 space-y-4">
        <a href="#" class="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white bg-white/10 p-4 rounded-xl">
          <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> Reservas
        </a>
      </nav>

      <button @click="handleLogout" class="text-stone-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
        Sair do Painel
      </button>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-6 md:p-12 overflow-y-auto">
      <header class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-2xl font-black text-stone-900 uppercase tracking-tighter">Gerenciamento de Reservas</h2>
          <p class="text-stone-400 text-sm font-light italic">Visualize e controle a agenda da casa.</p>
        </div>
        <button @click="fetchReservas" class="p-3 bg-white rounded-xl shadow-sm border border-stone-100 hover:bg-stone-50 transition-all">
          <svg class="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      </header>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <p class="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Total Pedidos</p>
          <p class="text-3xl font-black text-stone-900">{{ stats.total }}</p>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <p class="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2">Confirmadas</p>
          <p class="text-3xl font-black text-stone-900">{{ stats.confirmadas }}</p>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <p class="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-2">Pendentes</p>
          <p class="text-3xl font-black text-stone-900">{{ stats.pendentes }}</p>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <p class="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Receita Prevista</p>
          <p class="text-3xl font-black text-stone-900 text-center">R$ {{ stats.receita }}</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-stone-50/50 border-b border-stone-100">
                <th class="p-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Cliente</th>
                <th class="p-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Período</th>
                <th class="p-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Valor</th>
                <th class="p-6 text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">Status</th>
                <th class="p-6 text-[10px] font-black text-stone-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-50">
              <tr v-for="reserva in reservas" :key="reserva.id" class="hover:bg-stone-50/30 transition-colors">
                <td class="p-6">
                  <p class="font-bold text-stone-900 text-sm">{{ reserva.nome }}</p>
                  <p class="text-stone-400 text-[10px]">{{ reserva.telefone }}</p>
                </td>
                <td class="p-6">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-stone-600">{{ formatDate(reserva.check_in) }}</span>
                    <span class="text-stone-300">→</span>
                    <span class="text-xs font-medium text-stone-600">{{ formatDate(reserva.check_out) }}</span>
                  </div>
                </td>
                <td class="p-6">
                  <span class="text-sm font-black text-stone-900">R$ {{ reserva.valor_total }}</span>
                </td>
                <td class="p-6 text-center">
                  <span :class="{
                    'bg-amber-50 text-amber-600 border-amber-100': reserva.status === 'Pendente' || !reserva.status,
                    'bg-emerald-50 text-emerald-600 border-emerald-100': reserva.status === 'Confirmada',
                    'bg-stone-50 text-stone-500 border-stone-200': reserva.status === 'Cancelada'
                  }" class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border">
                    {{ reserva.status || 'Pendente' }}
                  </span>
                </td>
                <td class="p-6 text-right">
                  <div class="flex justify-end gap-2">
                    <button @click="updateStatus(reserva.id, 'Confirmada')" class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Confirmar">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                    <button @click="updateStatus(reserva.id, 'Cancelada')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancelar">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="reservas.length === 0 && !loading">
                <td colspan="5" class="p-20 text-center text-stone-400 text-xs italic uppercase tracking-widest">Nenhuma reserva encontrada.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
