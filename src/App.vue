<script setup lang="ts">
import { ref } from 'vue'

const phone = "558498652678"
const instagram = "casadepraiadopimenta"
const airbnbLink = "https://www.airbnb.com.br/rooms/1433348251706832731"
const whatsappLink = `https://wa.me/${phone}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20disponibilidade%20da%20Casa%20Pimenta.`

const bookingForm = ref({
  nome: '',
  telefone: '',
  dataInicio: '',
  dataFim: '',
  horario: ''
})

const isBooking = ref(false)
const bookingStatus = ref('')

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

async function submitBooking() {
  isBooking.value = true
  try {
    const msg = `Olá! Gostaria de solicitar uma reserva na Casa Pimenta:
- *Nome:* ${bookingForm.value.nome}
- *Check-in:* ${formatDate(bookingForm.value.dataInicio)}
- *Check-out:* ${formatDate(bookingForm.value.dataFim)}
- *Chegada prevista:* ${bookingForm.value.horario}
- *Contato:* ${bookingForm.value.telefone}`

    const encodedMsg = encodeURIComponent(msg)
    const dynamicWhatsAppLink = `https://wa.me/${phone}?text=${encodedMsg}`

    setTimeout(() => {
      bookingStatus.value = 'success'
      isBooking.value = false
      window.open(dynamicWhatsAppLink, '_blank')
    }, 1200)
  } catch (error) {
    bookingStatus.value = 'error'
    isBooking.value = false
  }
}

const amenities = [
  { name: 'Beira Mar', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Piscina Privativa', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z' },
  { name: 'Churrasqueira', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'Wi-Fi 5G', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M5.283 13.576a9.5 9.5 0 0113.434 0M2.454 10.747a13.5 13.5 0 0119.092 0' },
  { name: 'Estacionamento', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0z M19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1' }
]
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100">
    <!-- Navbar -->
    <nav class="absolute top-0 left-0 w-full z-20 p-8 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
      <span class="text-white font-bold text-xl tracking-[0.2em] uppercase">Casa Pimenta</span>
      <div class="hidden md:flex gap-10 text-white/80 text-sm font-bold uppercase tracking-widest">
        <a href="#galeria" class="hover:text-white transition-colors text-xs">Galeria</a>
        <a href="#comodidades" class="hover:text-white transition-colors text-xs">Comodidades</a>
        <a href="#localizacao" class="hover:text-white transition-colors text-xs">Localização</a>
        <a href="#agendar" class="hover:text-white transition-colors text-xs text-emerald-400">Reservar</a>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative h-screen w-full overflow-hidden">
      <video :autoplay="true" :muted="true" :loop="true" playsinline class="absolute inset-0 w-full h-full object-cover brightness-[0.4]">
        <source src="/media/insta_casadepraiadopimenta_4.mp4" type="video/mp4">
      </video>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p class="text-lg md:text-2xl text-stone-200 mb-12 max-w-2xl leading-relaxed font-light tracking-[0.3em] uppercase drop-shadow-lg">
          Conforto e natureza em harmonia perfeita.
        </p>
        <div class="flex flex-col sm:flex-row gap-6">
          <a :href="whatsappLink" target="_blank" class="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all transform hover:scale-105 shadow-xl flex items-center justify-center">
            Reservar Agora
          </a>
          <a :href="airbnbLink" target="_blank" class="bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center">
            Ver no Airbnb
          </a>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-24 px-6">
      <!-- Galeria -->
      <section id="galeria" class="mb-40">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-4xl md:text-6xl font-light text-stone-900 tracking-[0.1em] uppercase text-center">Experiência <span class="font-bold italic">Pimenta</span></h2>
          <div class="h-px w-24 bg-emerald-600 mx-auto opacity-50"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px]">
          <div class="md:col-span-8 overflow-hidden rounded-3xl shadow-2xl group">
            <img src="/media/insta_casadepraiadopimenta_1.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          </div>
          <div class="md:col-span-4 overflow-hidden rounded-3xl shadow-2xl group relative text-center">
            <video :muted="true" :loop="true" :autoplay="true" playsinline class="w-full h-full object-cover">
               <source src="/media/insta_casadepraiadopimenta_10.mp4" type="video/mp4">
            </video>
          </div>
          <div class="md:col-span-4 overflow-hidden rounded-3xl shadow-2xl group text-center">
            <img src="/media/insta_casadepraiadopimenta_5.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          </div>
          <div class="md:col-span-8 overflow-hidden rounded-3xl shadow-2xl group relative text-center">
             <video :muted="true" :loop="true" :autoplay="true" playsinline class="w-full h-full object-cover">
               <source src="/media/insta_casadepraiadopimenta_2.mp4" type="video/mp4">
            </video>
          </div>
        </div>
      </section>

      <!-- Comodidades -->
      <section id="comodidades" class="mb-40">
        <div class="text-center mb-20 space-y-4">
          <h2 class="text-3xl md:text-4xl font-light text-stone-900 tracking-[0.15em] uppercase text-center">Essencial para sua <span class="font-bold italic">estadia</span></h2>
          <p class="text-sm text-stone-500 font-medium tracking-[0.2em] uppercase text-center">Conforto total para você e sua família.</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="item in amenities" :key="item.name" class="bg-white p-12 rounded-[3.5rem] shadow-sm border border-stone-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col items-center text-center group">
            <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" :d="item.icon"></path>
              </svg>
            </div>
            <h3 class="text-sm font-bold text-stone-800 tracking-[0.2em] uppercase">{{ item.name }}</h3>
          </div>
        </div>
      </section>

      <!-- Localização -->
      <section id="localizacao" class="mb-40">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-light text-stone-900 tracking-[0.15em] uppercase text-center italic">Localização</h2>
          <p class="text-sm text-stone-500 font-medium tracking-[0.1em] uppercase text-center">A melhor da vizinhança da Redinha.</p>
        </div>
        <div class="w-full h-[500px] rounded-[4rem] overflow-hidden shadow-2xl border border-stone-100">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.9450679056422!2d-35.21024881395113!3d-5.72896105971288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b307da9af77a67%3A0x3e14d02a9fcb839!2sRedinha!5e0!3m2!1spt-BR!2sbr!4v1777047185480!5m2!1spt-BR!2sbr" class="w-full h-full border-0 grayscale-[0.3] contrast-[1.1]" :allowfullscreen="true" loading="lazy"></iframe>
        </div>
      </section>

      <!-- Agendamento -->
      <section id="agendar" class="mb-40">
        <div class="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-stone-100 flex flex-col lg:flex-row max-w-6xl mx-auto">
           <div class="lg:w-2/5 bg-stone-900 p-16 text-white flex flex-col justify-center space-y-8">
              <h3 class="text-4xl font-light italic text-white uppercase tracking-tighter">Agendamento <br><span class="font-black not-italic text-emerald-500">Online</span></h3>
              <p class="text-stone-400 leading-relaxed font-light text-sm">Selecione o período desejado e nossa equipe entrará em contato para confirmar sua reserva.</p>
              <ul class="space-y-6 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
                 <li class="flex items-center gap-4"><span class="w-6 h-px bg-emerald-500"></span> Disponibilidade VIP</li>
                 <li class="flex items-center gap-4"><span class="w-6 h-px bg-emerald-500"></span> Suporte Direto</li>
                 <li class="flex items-center gap-4"><span class="w-6 h-px bg-emerald-500"></span> Pagamento Seguro</li>
              </ul>
           </div>
           <form @submit.prevent="submitBooking" class="lg:w-3/5 p-16 bg-white space-y-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-3">
                    <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Check-in</label>
                    <input v-model="bookingForm.dataInicio" type="date" required class="w-full p-5 bg-stone-50 border-b border-stone-200 focus:border-emerald-500 outline-none transition-all text-sm font-medium" />
                 </div>
                 <div class="space-y-3">
                    <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Check-out</label>
                    <input v-model="bookingForm.dataFim" type="date" required class="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-emerald-500" />
                 </div>
              </div>
              <div class="space-y-3">
                 <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Horário Previsto de Chegada</label>
                 <input v-model="bookingForm.horario" type="time" required class="w-full p-5 bg-stone-50 border-b border-stone-200 focus:border-emerald-500 outline-none transition-all text-sm font-medium" />
              </div>
              <div class="space-y-3">
                 <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Seu Nome</label>
                 <input v-model="bookingForm.nome" type="text" placeholder="NOME COMPLETO" required class="w-full p-5 bg-stone-50 border-b border-stone-200 focus:border-emerald-500 outline-none transition-all text-sm font-medium" />
              </div>
              <div class="space-y-3">
                 <label class="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">WhatsApp</label>
                 <input v-model="bookingForm.telefone" type="tel" placeholder="(84) 90000-0000" required class="w-full p-5 bg-stone-50 border-b border-stone-200 focus:border-emerald-500 outline-none transition-all text-sm font-medium" />
              </div>
              <button type="submit" :disabled="isBooking" class="w-full bg-stone-900 hover:bg-emerald-700 disabled:bg-stone-300 text-white p-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.4em] transition-all shadow-2xl">
                {{ isBooking ? 'Processando...' : 'Solicitar Reserva' }}
              </button>
              <p v-if="bookingStatus === 'success'" class="text-emerald-600 text-center text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">✅ Pedido enviado com sucesso!</p>
           </form>
        </div>
      </section>

      <!-- Chamada Final -->
      <section class="bg-stone-900 rounded-[4rem] p-20 lg:p-32 text-center text-white overflow-hidden relative">
        <div class="relative z-10 space-y-10">
          <h2 class="text-4xl md:text-6xl font-light uppercase tracking-[0.2em] leading-tight text-center">Pronto para o <br><span class="font-black italic">paraíso?</span></h2>
          <p class="text-stone-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">Garanta sua data e venha viver a melhor experiência no litoral potiguar.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-8 pt-6">
            <a :href="whatsappLink" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all text-center">Chamar no WhatsApp</a>
            <a :href="airbnbLink" target="_blank" class="bg-white text-stone-900 hover:bg-stone-200 px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all text-center">Ver Airbnb</a>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full"></div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-stone-100 py-32 px-10">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left">
        <div class="space-y-8">
          <span class="font-bold text-2xl tracking-[0.3em] uppercase text-stone-900 block">Casa Pimenta</span>
          <p class="text-stone-500 leading-relaxed font-light text-sm">Sua casa de praia na Redinha. <br> Conforto e exclusividade a poucos passos do mar.</p>
        </div>
        <div class="space-y-8">
          <h4 class="font-bold text-stone-400 uppercase text-[10px] tracking-[0.4em]">Contato</h4>
          <div class="space-y-4 flex flex-col">
             <a :href="`tel:+${phone}`" class="text-stone-600 hover:text-emerald-600 transition-colors text-sm font-medium">Tel: (84) 98652-6784</a>
             <a :href="whatsappLink" class="text-stone-600 hover:text-emerald-600 transition-colors text-sm font-medium tracking-wide">WhatsApp</a>
          </div>
        </div>
        <div class="space-y-8">
          <h4 class="font-bold text-stone-400 uppercase text-[10px] tracking-[0.4em]">Social</h4>
          <div class="space-y-4 flex flex-col">
             <a :href="`https://instagram.com/${instagram}`" target="_blank" class="text-stone-600 hover:text-emerald-600 transition-colors text-sm font-medium flex items-center justify-center md:justify-start gap-3 tracking-wide">Instagram @{{ instagram }}</a>
             <a :href="airbnbLink" target="_blank" class="text-stone-600 hover:text-emerald-600 transition-colors text-sm font-medium tracking-wide">Airbnb</a>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-32 pt-10 border-t border-stone-100 text-center text-stone-400 text-[9px] uppercase tracking-[0.4em]">
        <p>© 2026 Casa de Praia do Pimenta. Todos os direitos reservados.</p>
      </div>
    </footer>

    <!-- WhatsApp Flutuante -->
    <a :href="whatsappLink" target="_blank" class="fixed bottom-10 right-10 z-50 bg-emerald-500 text-white p-5 rounded-full shadow-2xl hover:bg-emerald-400 transition-all hover:scale-110 flex items-center justify-center group">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.565.933 3.176 1.423 4.742 1.423 5.405 0 9.803-4.397 9.805-9.805.002-2.624-1.022-5.09-2.885-6.956-1.864-1.863-4.329-2.886-6.953-2.886-5.407 0-9.809 4.397-9.812 9.802-.001 1.817.498 3.593 1.442 5.132l-1.029 3.756 3.86-1.014z"/>
      </svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-4 transition-all duration-700 whitespace-nowrap font-bold text-[10px] uppercase tracking-[0.3em]">Reservar</span>
    </a>
  </div>
</template>

<style>
@import './style.css';
html { scroll-behavior: smooth; }
body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
