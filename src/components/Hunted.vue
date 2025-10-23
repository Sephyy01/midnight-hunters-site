<template>
  <div class="hunted-container">
    <!-- Header Section -->
    <section class="hunted-header">
      <div class="container">
        <h1 class="page-title">⚔️ Hunted List</h1>
        <p class="page-subtitle">Lista de inimigos online da guild Quinta Seriec</p>
      </div>
    </section>

    <!-- Enemy Guild Members Section -->
    <section class="enemy-section">
      <div class="container">
        <div class="enemy-guild-section">
          <div class="members-header">
            <div class="members-title-row">
              <h3 class="members-title">
                <span class="members-icon">🎯</span>
                Quinta Seriec - Inimigos Online
              </h3>
              <button 
                @click="manualRefresh" 
                :disabled="guildLoading"
                class="refresh-btn"
                title="Atualizar agora"
              >
                <span class="refresh-icon" :class="{ 'spinning': guildLoading }">🔄</span>
              </button>
            </div>
            <div class="update-info">
              <span v-if="lastUpdate" class="last-update">
                🕐 Última atualização: {{ formatTime(lastUpdate) }}
              </span>
              <span v-if="nextUpdate" class="next-update">
                ⏱️ Próxima em: {{ countdown }}s
              </span>
            </div>
          </div>

          <div v-if="guildData && onlineMembers.length > 0" class="members-list">
            <div class="members-count">
              <span class="online-indicator">🔴</span>
              {{ onlineMembers.length }} inimigos online de {{ guildData.guild.members_total }} membros
            </div>
            
            <div class="members-grid">
              <div 
                v-for="member in onlineMembers" 
                :key="member.name"
                class="member-card enemy"
              >
                <div class="member-avatar">
                  <img 
                    :src="getVocationGif(member.vocation)" 
                    :alt="member.vocation"
                    class="vocation-gif"
                    @error="handleGifError"
                  />
                </div>
                <div class="member-info">
                  <div class="member-name">{{ member.name }}</div>
                  <div class="member-details">
                    <span class="member-level">Lv. {{ member.level }}</span>
                    <span class="member-vocation">{{ member.vocation }}</span>
                  </div>
                  <div class="member-rank">{{ member.rank }}</div>
                </div>
                <div class="member-status enemy-online">
                  <span class="status-dot enemy-dot"></span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="guildData && onlineMembers.length === 0" class="no-members">
            <span class="no-members-icon">😴</span>
            <p>Nenhum inimigo online no momento</p>
          </div>

          <div v-else-if="guildError" class="guild-error">
            <span class="error-icon">❌</span>
            <span>{{ guildError }}</span>
          </div>

          <div v-else-if="guildLoading" class="guild-loading">
            <span class="loading-spinner">🔄</span>
            <p>Carregando inimigos da Quinta Seriec...</p>
          </div>

          <div v-else class="guild-placeholder">
            <span class="placeholder-icon">🎯</span>
            <p>Carregando dados da guild inimiga...</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HunterMaleGif from '../assets/HunterMale.gif'
import KnightMaleGif from '../assets/KnightMale.gif'
import DruidMaleGif from '../assets/DruidMale.gif'
import MasterMaleGif from '../assets/MasterMale.gif'

export default {
  name: 'Hunted',
  data() {
    return {
      guildData: null,
      guildLoading: false,
      guildError: null,
      lastUpdate: null,
      nextUpdate: null,
      countdown: 60,
      refreshTimer: null,
      countdownTimer: null
    }
  },
  computed: {
    onlineMembers() {
      if (!this.guildData || !this.guildData.guild || !this.guildData.guild.members) {
        return []
      }
      return this.guildData.guild.members
        .filter(member => member.status === 'online')
        .sort((a, b) => b.level - a.level) // Ordenar por level (maior primeiro)
    }
  },
  mounted() {
    // Carregar dados da guild imediatamente
    this.loadQuintaSeriec()
    
    // Configurar atualização automática a cada 60 segundos
    this.startAutoRefresh()
  },
  beforeUnmount() {
    // Limpar timers quando o componente for destruído
    this.stopAutoRefresh()
  },
  methods: {
    async loadQuintaSeriec() {
      this.guildLoading = true
      this.guildError = null

      try {
        const response = await fetch(`https://api.tibiadata.com/v4/guild/Quinta%20Seriec`)
        const data = await response.json()

        if (data.guild && data.guild.name) {
          this.guildData = data
          this.lastUpdate = new Date()
          this.guildError = null
        } else {
          this.guildError = 'Guild Quinta Seriec não encontrada'
        }
      } catch (err) {
        this.guildError = 'Erro ao carregar dados da guild inimiga'
        console.error('Erro na API Guild:', err)
      } finally {
        this.guildLoading = false
      }
    },
    startAutoRefresh() {
      // Timer para atualizar dados da guild a cada 60 segundos
      this.refreshTimer = setInterval(() => {
        this.loadQuintaSeriec()
        this.countdown = 60
      }, 60000)

      // Timer para countdown visual a cada segundo
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          this.countdown = 60
        }
      }, 1000)
    },
    stopAutoRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
    },
    formatTime(date) {
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      })
    },
    getVocationGif(vocation) {
      // Normalizar a vocação para comparação (remover espaços e converter para lowercase)
      const normalizedVocation = vocation.toLowerCase().trim()
      
      // Paladin vocations
      if (normalizedVocation.includes('paladin')) {
        return HunterMaleGif
      }
      // Knight vocations  
      else if (normalizedVocation.includes('knight')) {
        return KnightMaleGif
      }
      // Druid vocations
      else if (normalizedVocation.includes('druid')) {
        return DruidMaleGif
      }
      // Sorcerer vocations
      else if (normalizedVocation.includes('sorcerer')) {
        return MasterMaleGif
      }
      // Default fallback
      else {
        return HunterMaleGif
      }
    },
    handleGifError(event) {
      // Fallback caso o GIF não carregue
      event.target.src = HunterMaleGif
      console.warn('GIF não encontrado, usando fallback:', event.target.src)
    },
    async manualRefresh() {
      // Reset do countdown quando refresh manual
      this.countdown = 60
      await this.loadQuintaSeriec()
    }
  }
}
</script>

<style scoped>
/* Global Styles */
.hunted-container {
  background: #1a1a1a;
  min-height: 100vh;
  margin-top: 70px;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header Section */
.hunted-header {
  padding: 4rem 0 3rem 0;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
  text-align: center;
  color: white;
  border-bottom: 1px solid rgba(220, 38, 38, 0.3);
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  letter-spacing: -1px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
}

/* Enemy Section */
.enemy-section {
  padding: 4rem 0;
}

/* Enemy Guild Members Section */
.enemy-guild-section {
  background: rgba(51, 51, 51, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(220, 38, 38, 0.3);
  min-height: 500px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.members-header {
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.members-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.members-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.members-icon {
  font-size: 1.3rem;
}

.update-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #cccccc;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: rgba(68, 68, 68, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.last-update {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #999999;
}

.next-update {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #fbbf24;
  font-weight: 500;
}

.refresh-btn {
  background: rgba(68, 68, 68, 0.6);
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 8px;
  padding: 0.5rem;
  color: #cccccc;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(220, 38, 38, 0.2);
  border-color: rgba(220, 38, 38, 0.6);
  color: #ffffff;
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.refresh-icon {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.refresh-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.members-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.members-count {
  color: #dddddd;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.online-indicator {
  font-size: 0.8rem;
}

.members-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Custom Scrollbar for Members Grid */
.members-grid::-webkit-scrollbar {
  width: 6px;
}

.members-grid::-webkit-scrollbar-track {
  background: rgba(68, 68, 68, 0.3);
  border-radius: 3px;
}

.members-grid::-webkit-scrollbar-thumb {
  background: rgba(220, 38, 38, 0.4);
  border-radius: 3px;
}

.members-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(220, 38, 38, 0.6);
}

.member-card {
  background: rgba(68, 68, 68, 0.7);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(85, 85, 85, 0.5);
  transition: all 0.3s ease;
}

.member-card.enemy {
  border-color: rgba(220, 38, 38, 0.4);
}

.member-card.enemy:hover {
  background: rgba(85, 85, 85, 0.8);
  border-color: rgba(220, 38, 38, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.member-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(220, 38, 38, 0.5);
  background: rgba(85, 85, 85, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vocation-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.member-card:hover .vocation-gif {
  transform: scale(1.1);
}

.member-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-weight: 600;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-details {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.2rem;
  flex-wrap: wrap;
}

.member-level {
  color: #fbbf24;
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(251, 191, 36, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(251, 191, 36, 0.3);
  white-space: nowrap;
}

.member-vocation {
  color: #a78bfa;
  font-size: 0.85rem;
  background: rgba(167, 139, 250, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(167, 139, 250, 0.3);
  white-space: nowrap;
}

.member-rank {
  color: #cccccc;
  font-size: 0.8rem;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-status {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.enemy-dot {
  background: #dc2626;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.no-members {
  text-align: center;
  padding: 2rem;
  color: #cccccc;
  background: rgba(68, 68, 68, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(85, 85, 85, 0.4);
}

.no-members-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.guild-error {
  text-align: center;
  padding: 1rem;
  color: #ef4444;
  background: rgba(68, 68, 68, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.guild-loading {
  text-align: center;
  padding: 2rem;
  color: #dddddd;
  background: rgba(68, 68, 68, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(85, 85, 85, 0.4);
}

.loading-spinner {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
  animation: spin 1s linear infinite;
  color: #dc2626;
}

.guild-placeholder {
  text-align: center;
  padding: 2rem;
  color: #cccccc;
  background: rgba(68, 68, 68, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(85, 85, 85, 0.4);
}

.placeholder-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
  opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .enemy-guild-section {
    max-height: 50vh;
    min-height: 400px;
    padding: 1.5rem;
  }
  
  .members-title {
    font-size: 1.3rem;
  }
  
  .refresh-btn {
    width: 32px;
    height: 32px;
    padding: 0.4rem;
  }
  
  .refresh-icon {
    font-size: 0.9rem;
  }
  
  .member-details {
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .member-avatar {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .enemy-guild-section {
    padding: 1rem;
    max-height: 40vh;
    min-height: 300px;
  }
  
  .members-title {
    font-size: 1.2rem;
  }
  
  .refresh-btn {
    width: 30px;
    height: 30px;
    padding: 0.3rem;
  }
  
  .refresh-icon {
    font-size: 0.85rem;
  }
  
  .update-info {
    font-size: 0.75rem;
  }
  
  .member-card {
    padding: 0.8rem;
    gap: 0.8rem;
  }
  
  .member-avatar {
    width: 36px;
    height: 36px;
  }
  
  .member-name {
    font-size: 0.95rem;
  }
  
  .member-level, .member-vocation {
    font-size: 0.8rem;
  }
}
</style>