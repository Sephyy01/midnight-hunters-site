<template>
  <div class="streamers-container">
    <div class="container">
      <h1 class="page-title">🎮 Streamers da Guild</h1>
      <p class="page-subtitle">Membros que fazem live e compartilham suas aventuras</p>
      
      <div class="streamers-grid">
        <!-- Streamer 1: Kaiiomy -->
        <div class="streamer-card">
          <div class="streamer-header">
            <div class="streamer-avatar">🎮</div>
            <div class="streamer-info">
              <h3 class="streamer-name">Kaiiomy</h3>
              <p class="streamer-status">Membro da Guild</p>
            </div>
          </div>
          <div class="streamer-description">
            <p>Acompanhe as aventuras e hunts épicas do Kaiiomy ao vivo na Twitch!</p>
          </div>
          <div class="streamer-actions">
            <a href="https://www.twitch.tv/kaiiomy" target="_blank" class="twitch-btn">
              <span class="twitch-icon">📺</span>
              Assistir na Twitch
              <span class="external-link">🔗</span>
            </a>
          </div>
        </div>

        <!-- Streamer 2: Dansinsz -->
        <div class="streamer-card">
          <div class="streamer-header">
            <div class="streamer-avatar">🎯</div>
            <div class="streamer-info">
              <h3 class="streamer-name">Dansinsz</h3>
              <p class="streamer-status">Membro da Guild</p>
            </div>
          </div>
          <div class="streamer-description">
            <p>Entre no canal do Dansinsz e veja gameplay de alto nível e estratégias incríveis!</p>
          </div>
          <div class="streamer-actions">
            <a href="https://www.twitch.tv/Dansinsz" target="_blank" class="twitch-btn">
              <span class="twitch-icon">📺</span>
              Assistir na Twitch
              <span class="external-link">🔗</span>
            </a>
          </div>
        </div>
      </div>

      <div class="streamers-info">
        <h2 class="info-title">📺 Sobre os Streamers</h2>
        <div class="info-content">
          <p>
            Nossos streamers compartilham suas aventuras em Tibia ao vivo! Acompanhe hunts épicas, 
            boss fights e o dia a dia da guild através de suas transmissões.
          </p>
          <div class="info-features">
            <div class="feature-item">
              <span class="feature-icon">⚔️</span>
              <span class="feature-text">Boss Hunts ao Vivo</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎯</span>
              <span class="feature-text">Estratégias e Dicas</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">�</span>
              <span class="feature-text">Interação com a Comunidade</span>
            </div>
          </div>
        </div>
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

/* Streamers Grid */
.streamers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

/* Streamer Cards */
.streamer-card {
  background: linear-gradient(145deg, rgba(26, 26, 46, 0.4), rgba(45, 27, 105, 0.3));
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.streamer-card:hover {
  transform: translateY(-10px);
  border-color: #8b5cf6;
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
}

/* Streamer Header */
.streamer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.streamer-avatar {
  font-size: 3rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #8b5cf6, #c084fc);
  border-radius: 15px;
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.5));
}

.streamer-info {
  flex: 1;
}

.streamer-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.streamer-status {
  font-size: 0.9rem;
  color: #c084fc;
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Streamer Description */
.streamer-description {
  margin-bottom: 2rem;
}

.streamer-description p {
  color: #e5e7eb;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

/* Twitch Button */
.streamer-actions {
  text-align: center;
}

.twitch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(145deg, #9146ff, #6441a5);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(145, 70, 255, 0.4);
}

.twitch-btn:hover {
  background: linear-gradient(145deg, #a970ff, #7c4dff);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(145, 70, 255, 0.6);
  text-decoration: none;
  color: white;
}

.twitch-btn .twitch-icon {
  font-size: 1.2rem;
}

.twitch-btn .external-link {
  font-size: 1rem;
}

/* Info Section */
.streamers-info {
  background: rgba(26, 26, 46, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
  max-width: 800px;
  margin: 0 auto;
}

.info-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Times New Roman', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.info-content p {
  color: #e5e7eb;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  text-align: center;
}

.info-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: #8b5cf6;
}

.feature-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.5));
}

.feature-text {
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Watermark - Guild Logo Background */
.streamers-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/images/backgrounds/backgroud-guild.jpeg');
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 1;
  pointer-events: none;
  z-index: -1;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .streamers-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .streamer-card {
    padding: 1.5rem;
  }
  
  .streamer-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .streamer-avatar {
    margin: 0 auto;
  }
  
  .streamers-info {
    padding: 2rem 1.5rem;
  }
  
  .info-features {
    grid-template-columns: 1fr;
  }
  
  .feature-item {
    justify-content: center;
  }
  
  .streamers-container::before {
    background-size: 60%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .streamer-card {
    padding: 1rem;
  }
  
  .twitch-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
