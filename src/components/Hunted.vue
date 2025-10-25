<template>
  <div class="hunted-container">
    <!-- Header Section -->
    <section class="hunted-header">
      <div class="container">
        <h1 class="page-title">⚔️ Hunted List</h1>
        <p class="page-subtitle">Lista personalizada de inimigos monitorados</p>
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
                Inimigos Monitorados
              </h3>
              <button 
                @click="manualRefresh" 
                :disabled="isLoading"
                class="refresh-btn"
                title="Atualizar todos"
              >
                <span class="refresh-icon" :class="{ 'spinning': isLoading }">🔄</span>
              </button>
            </div>
            
            <div class="add-enemy-section">
              <div class="enemy-input-row">
                <input 
                  v-model="newEnemyName" 
                  @keyup.enter="addEnemy"
                  type="text" 
                  placeholder="Digite o nome do personagem inimigo..."
                  class="enemy-input"
                />
                <button @click="addEnemy" :disabled="!newEnemyName.trim() || isLoading" class="add-btn">
                  <span v-if="isLoading">🔄</span>
                  <span v-else>➕</span>
                  {{ isLoading ? 'Adicionando...' : 'Adicionar' }}
                </button>
              </div>
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

          <div v-if="enemies.length > 0" class="members-list">
            <div class="members-count">
              <span class="online-indicator">🔴</span>
              {{ onlineEnemies.length }} inimigos online de {{ enemies.length }} monitorados
            </div>
            
            <div class="members-grid">
              <div 
                v-for="enemy in enemies" 
                :key="enemy.name"
                class="member-card enemy"
                :class="{ 'offline': enemy.status !== 'online' }"
              >
                <div class="member-avatar">
                  <img 
                    v-if="enemy.vocation"
                    :src="getVocationGif(enemy.vocation)" 
                    :alt="enemy.vocation"
                    class="vocation-gif"
                    @error="handleGifError"
                  />
                  <span v-else class="avatar-placeholder">❓</span>
                </div>
                <div class="member-info">
                  <div class="member-name">{{ enemy.name }}</div>
                  <div class="member-details" v-if="enemy.level">
                    <span class="member-level">Lv. {{ enemy.level }}</span>
                    <span v-if="enemy.vocation" class="member-vocation">{{ enemy.vocation }}</span>
                  </div>
                  <div class="member-world" v-if="enemy.world">Mundo: {{ enemy.world }}</div>
                  <div class="member-status-text" v-if="enemy.lastCheck">
                    Verificado: {{ formatTime(enemy.lastCheck) }}
                  </div>
                </div>
                <div class="member-actions">
                  <div class="member-status" :class="enemy.status">
                    <span class="status-dot" :class="{ 'online': enemy.status === 'online', 'offline': enemy.status === 'offline' }"></span>
                  </div>
                  <button @click="removeEnemy(enemy.name)" class="remove-btn" title="Remover inimigo">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="isLoading" class="guild-loading">
            <span class="loading-spinner">�</span>
            <p>Atualizando status dos inimigos...</p>
          </div>

          <div v-else class="no-enemies">
            <span class="no-enemies-icon">🎯</span>
            <p>Nenhum inimigo adicionado ainda</p>
            <small>Use o campo acima para adicionar personagens à lista de inimigos</small>
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
      enemies: [],
      newEnemyName: '',
      isLoading: false,
      lastUpdate: null,
      nextUpdate: null,
      countdown: 30,
      refreshTimer: null,
      countdownTimer: null
    }
  },
  computed: {
    onlineEnemies() {
      return this.enemies.filter(enemy => enemy.status === 'online')
    }
  },
  mounted() {
    // Carregar lista de inimigos salva
    this.loadEnemiesList()
    
    // Configurar atualização automática a cada 30 segundos
    this.startAutoRefresh()
  },
  beforeUnmount() {
    // Limpar timers quando o componente for destruído
    this.stopAutoRefresh()
  },
  methods: {
    loadEnemiesList() {
      // Carregar lista de inimigos do localStorage
      const saved = localStorage.getItem('huntedEnemies')
      if (saved) {
        try {
          this.enemies = JSON.parse(saved)
          if (this.enemies.length > 0) {
            this.updateAllEnemies()
          }
        } catch (err) {
          console.error('Erro ao carregar lista de inimigos:', err)
          this.enemies = []
        }
      }
    },
    saveEnemiesList() {
      // Salvar lista de inimigos no localStorage
      localStorage.setItem('huntedEnemies', JSON.stringify(this.enemies))
    },
    async addEnemy() {
      const name = this.newEnemyName.trim()
      if (!name) return

      // Verificar se já existe
      if (this.enemies.find(enemy => enemy.name.toLowerCase() === name.toLowerCase())) {
        alert('Este personagem já está na lista de inimigos!')
        return
      }

      this.isLoading = true

      try {
        const response = await fetch(`https://api.tibiadata.com/v4/character/${encodeURIComponent(name)}`)
        const data = await response.json()

        if (data.character && data.character.character) {
          const char = data.character.character
          const newEnemy = {
            name: char.name,
            level: char.level,
            vocation: char.vocation,
            world: char.world,
            status: char.status || 'offline',
            lastCheck: new Date(),
            addedAt: new Date()
          }
          
          this.enemies.push(newEnemy)
          this.enemies.sort((a, b) => b.level - a.level)
          this.saveEnemiesList()
          this.newEnemyName = ''
        } else {
          alert('Personagem não encontrado!')
        }
      } catch (err) {
        alert('Erro ao buscar personagem. Tente novamente.')
        console.error('Erro na API:', err)
      } finally {
        this.isLoading = false
      }
    },
    removeEnemy(name) {
      if (confirm(`Remover ${name} da lista de inimigos?`)) {
        this.enemies = this.enemies.filter(enemy => enemy.name !== name)
        this.saveEnemiesList()
      }
    },
    async updateAllEnemies() {
      if (this.enemies.length === 0) return

      this.isLoading = true
      this.lastUpdate = new Date()

      for (const enemy of this.enemies) {
        try {
          const response = await fetch(`https://api.tibiadata.com/v4/character/${encodeURIComponent(enemy.name)}`)
          const data = await response.json()

          if (data.character && data.character.character) {
            const char = data.character.character
            enemy.level = char.level
            enemy.vocation = char.vocation
            enemy.world = char.world
            enemy.status = char.status || 'offline'
            enemy.lastCheck = new Date()
          }
        } catch (err) {
          console.error(`Erro ao atualizar ${enemy.name}:`, err)
        }
      }

      this.enemies.sort((a, b) => b.level - a.level)
      this.saveEnemiesList()
      this.isLoading = false
    },
    startAutoRefresh() {
      // Timer para atualizar dados dos inimigos a cada 30 segundos
      this.refreshTimer = setInterval(() => {
        this.updateAllEnemies()
        this.countdown = 30
      }, 30000)

      // Timer para countdown visual a cada segundo
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          this.countdown = 30
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
      this.countdown = 30
      await this.updateAllEnemies()
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

.add-enemy-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(68, 68, 68, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(85, 85, 85, 0.3);
}

.enemy-input-row {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.enemy-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #1a1a1a;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.enemy-input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.5);
}

.add-btn {
  padding: 0.8rem 1.5rem;
  background: rgba(220, 38, 38, 0.8);
  border: 1px solid rgba(220, 38, 38, 1);
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) {
  background: rgba(220, 38, 38, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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

.member-card.offline {
  opacity: 0.6;
  border-color: rgba(85, 85, 85, 0.3);
}

.member-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.remove-btn {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 6px;
  padding: 0.3rem;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.4);
  border-color: rgba(239, 68, 68, 0.6);
  transform: scale(1.1);
}

.avatar-placeholder {
  font-size: 1.5rem;
  color: #666;
}

.member-world {
  font-size: 0.8rem;
  color: #999999;
  margin-bottom: 0.2rem;
}

.member-status-text {
  font-size: 0.75rem;
  color: #777777;
  font-style: italic;
}

.status-dot.online {
  background: #10b981;
}

.status-dot.offline {
  background: #666666;
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

.no-enemies {
  text-align: center;
  padding: 3rem 2rem;
  color: #cccccc;
  background: rgba(68, 68, 68, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(85, 85, 85, 0.4);
}

.no-enemies-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
  opacity: 0.7;
}

.no-enemies small {
  display: block;
  margin-top: 0.5rem;
  color: #999999;
  font-size: 0.9rem;
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
  
  .enemy-input-row {
    flex-direction: column;
    gap: 0.6rem;
  }
  
  .add-btn {
    width: 100%;
    justify-content: center;
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
  
  .add-enemy-section {
    padding: 0.8rem;
  }
  
  .enemy-input {
    font-size: 0.9rem;
    padding: 0.7rem 0.8rem;
  }
  
  .add-btn {
    font-size: 0.85rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>