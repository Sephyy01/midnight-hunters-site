<template>
  <div class="streamers-container">
    <div class="container">
      <h1 class="page-title">🎮 Streamers da Guild</h1>
      <p class="page-subtitle">Membros que fazem live e compartilham suas aventuras</p>
      
      <div class="coming-soon">
        <h2 class="coming-title">⚡ Em Breve!</h2>
        <p class="coming-text">
          Estamos organizando a lista dos streamers da guild. Em breve você poderá acompanhar as lives dos nossos membros aqui!
        </p>
        <div class="twitch-icon">📺</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Streamers'
}
</script>

<style scoped>
.streamers-container {
  background: linear-gradient(to bottom, rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.9));
  min-height: 100vh;
  padding: 2rem 0;
  margin-top: 70px;
}

.container {
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #c084fc;
  margin-bottom: 3rem;
  font-family: 'Georgia', serif;
  font-style: italic;
}

.coming-soon {
  background: rgba(26, 26, 46, 0.3);
  border-radius: 20px;
  padding: 4rem 2rem;
  border: 2px solid #6b46c1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.coming-title {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
}

.coming-text {
  font-size: 1.3rem;
  color: #e5e7eb;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
}

.twitch-icon {
  font-size: 5rem;
  filter: drop-shadow(0 0 10px rgba(107, 70, 193, 0.8));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .coming-soon {
    padding: 2rem 1rem;
  }
  
  .coming-title {
    font-size: 2rem;
  }
}
</style>
