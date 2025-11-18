<template>
  <div class="streamers-container">
    <div class="container">
      <h1 class="page-title">🎮 Streamers da Guild</h1>
      <p class="page-subtitle">Membros que fazem live e compartilham suas aventuras</p>
      
      <div class="streamers-grid">
        <!-- Streamer 1: Kaiiomy -->
        <div class="streamer-card">
          <div class="streamer-avatar">
            <img src="../assets/Rage_Heavykit.gif" alt="Kaiiomy" class="avatar-image">
          </div>
          <div class="streamer-actions">
            <a href="https://www.twitch.tv/kaiiomy" target="_blank" class="twitch-btn">
              <span class="twitch-icon">📺</span>
              Assistir na Twitch
            </a>
          </div>
        </div>

        <!-- Streamer 2: Dansinsz -->
        <div class="streamer-card">
          <div class="streamer-avatar">
            <img src="../assets/Dansinsz.gif" alt="Dansinsz" class="avatar-image">
          </div>
          <div class="streamer-actions">
            <a href="https://www.twitch.tv/Dansinsz" target="_blank" class="twitch-btn">
              <span class="twitch-icon">📺</span>
              Assistir na Twitch
            </a>
          </div>
        </div>

        <!-- Streamer 3: Matheus -->
        <div class="streamer-card">
          <div class="streamer-avatar">
            <img src="../assets/Macanuudo.gif" alt="Matheeusz_" class="avatar-image">
          </div>
          <div class="streamer-actions">
            <a href="https://www.twitch.tv/matheeusz_" target="_blank" class="twitch-btn">
              <span class="twitch-icon">📺</span>
              Assistir na Twitch
            </a>
          </div>
        </div>
      </div>

      <div class="streamers-info">
        <h2 class="info-title">📺 Sobre os Streamers</h2>
        <div class="info-content">
          <p>
            Nossos líderes compartilham suas aventuras em Tibia ao vivo! Acompanhe a liderança em ação 
            através de hunts épicas, boss fights e estratégias avançadas da guild.
          </p>
          <div class="info-features">
            <div class="feature-item">
              <span class="feature-icon">👑</span>
              <span class="feature-text">Liderança da Guild</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon"><img :src="guildLogo" alt="Guild Logo" class="feature-icon-img" /></span>
              <span class="feature-text">Boss Hunts Épicos</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎯</span>
              <span class="feature-text">Estratégias Avançadas</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🛡️</span>
              <span class="feature-text">Knight Tank</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🌿</span>
              <span class="feature-text">Druid Healing</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔥</span>
              <span class="feature-text">Sorcerer Damage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guildLogo from '../assets/images/logos/guild-logo.png'

export default {
  name: 'Streamers',
  data() {
    return {
      guildLogo
    }
  }
}
</script>

<style scoped>
.streamers-container {
  background: #1a1a1a;
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
  color: #e5e5e5;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #b3b3b3;
  margin-bottom: 3rem;
}

/* Streamers Grid */
.streamers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* Streamer Cards */
.streamer-card {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #444444;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.streamer-card:hover {
  transform: translateY(-4px);
  border-color: #8b5cf6;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.streamer-avatar {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

/* Twitch Button */
.streamer-actions {
  text-align: center;
}

.twitch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #9146ff;
  color: white;
  text-decoration: none;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.twitch-btn:hover {
  background: #7c4dff;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  background: #2a2a2a;
  border-radius: 12px;
  padding: 2.5rem;
  border: 1px solid #444444;
  max-width: 800px;
  margin: 0 auto;
}

.info-title {
  font-size: 2rem;
  color: #e5e5e5;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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

.feature-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
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
  opacity: 0.05;
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
