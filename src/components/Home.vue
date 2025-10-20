<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <!-- Guild Info Column -->
        <div class="hero-content">
          <div class="guild-emblem-large">⚔️</div>
          <h1 class="hero-title">Midnight Hunters</h1>
          <p class="hero-subtitle">"Unidos na caçada, fortes na amizade"</p>
          <p class="hero-description">
            Uma guilda élite dedicada à excelência em Tibia, combinando estratégia, cooperação e amizade 
            para conquistar os maiores desafios do jogo.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Membros Ativos</span>
            </div>
            <div class="stat-divider">|</div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Atividade</span>
            </div>
            <div class="stat-divider">|</div>
            <div class="stat-item">
              <span class="stat-number">2025</span>
              <span class="stat-label">Fundada</span>
            </div>
          </div>
          <div class="hero-actions">
            <button class="cta-primary">
              <span class="button-icon">⚔️</span>
              Junte-se à Guilda
            </button>
            <button class="cta-secondary">
              <span class="button-icon">📊</span>
              Ver Boss List
            </button>
          </div>
        </div>

        <!-- Guild Members Online Column -->
        <div class="guild-members-section">
          <div class="members-header">
            <div class="members-title-row">
              <h3 class="members-title">
                <span class="members-icon">👥</span>
                Midnight Hunters - Membros Online
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
              <span class="online-indicator">🟢</span>
              {{ onlineMembers.length }} online de {{ guildData.guild.members_total }} membros
            </div>
            
            <div class="members-grid">
              <div 
                v-for="member in onlineMembers" 
                :key="member.name"
                class="member-card"
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
                <div class="member-status online">
                  <span class="status-dot"></span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="guildData && onlineMembers.length === 0" class="no-members">
            <span class="no-members-icon">😴</span>
            <p>Nenhum membro online no momento</p>
          </div>

          <div v-else-if="guildError" class="guild-error">
            <span class="error-icon">❌</span>
            <span>{{ guildError }}</span>
          </div>

          <div v-else-if="guildLoading" class="guild-loading">
            <span class="loading-spinner">🔄</span>
            <p>Carregando membros da Midnight Hunters...</p>
          </div>

          <div v-else class="guild-placeholder">
            <span class="placeholder-icon">🏰</span>
            <p>Carregando dados da guild...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Por que escolher a Midnight Hunters?</h2>
          <p class="section-subtitle">Descubra os diferenciais que nos tornam uma das melhores guildas do servidor Inabra</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">Estratégia Avançada</h3>
            <p class="feature-description">
              Planejamento detalhado para boss hunts e conquistas, maximizando resultados e minimizando riscos.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🤝</div>
            <h3 class="feature-title">Comunidade Unida</h3>
            <p class="feature-description">
              Ambiente respeitoso e colaborativo onde todos se ajudam a crescer e alcançar seus objetivos.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3 class="feature-title">Crescimento Acelerado</h3>
            <p class="feature-description">
              Hunts organizadas, sharing de experiência e conhecimento para evolução rápida de todos.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">�️</div>
            <h3 class="feature-title">Proteção Total</h3>
            <p class="feature-description">
              Sistema de proteção contra PKs e suporte 24/7 para todos os membros da guilda.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Character Lookup Section -->
    <section class="character-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🔍 Consulta de Personagem</h2>
          <p class="section-subtitle">Verifique informações detalhadas de qualquer personagem do Tibia</p>
        </div>
        
        <div class="character-lookup">
          <div class="search-container">
            <input 
              v-model="characterName" 
              @keyup.enter="searchCharacter"
              type="text" 
              placeholder="Digite o nome do personagem..."
              class="character-input"
            />
            <button @click="searchCharacter" :disabled="loading" class="search-btn">
              <span v-if="loading">🔄</span>
              <span v-else>🔍</span>
              {{ loading ? 'Buscando...' : 'Buscar' }}
            </button>
          </div>

          <div v-if="characterData" class="character-result">
            <div class="character-card">
              <div class="character-header">
                <h3 class="character-name">{{ characterData.character.name }}</h3>
                <span class="character-level">Level {{ characterData.character.level }}</span>
              </div>
              
              <div class="character-info">
                <div class="info-row">
                  <span class="info-label">Vocação:</span>
                  <span class="info-value">{{ characterData.character.vocation }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Mundo:</span>
                  <span class="info-value">{{ characterData.character.world }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Residência:</span>
                  <span class="info-value">{{ characterData.character.residence || 'Não informado' }}</span>
                </div>
                <div v-if="characterData.character.guild" class="info-row">
                  <span class="info-label">Guild:</span>
                  <span class="info-value guild-name">{{ characterData.character.guild.name }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Status:</span>
                  <span class="info-value" :class="{ 'status-online': characterData.character.status === 'online', 'status-offline': characterData.character.status === 'offline' }">
                    {{ characterData.character.status === 'online' ? '🟢 Online' : '🔴 Offline' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="error" class="error-message">
            <span class="error-icon">❌</span>
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Section -->
    <section class="activities-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Nossas Atividades</h2>
          <p class="section-subtitle">Experiências épicas que vivemos juntos</p>
        </div>
        
        <div class="activities-grid">
          <div class="activity-card featured">
            <div class="activity-header">
              <span class="activity-icon-large">🐉</span>
              <div>
                <h3 class="activity-title">Boss Hunts Épicos</h3>
                <span class="activity-badge">Atividade Principal</span>
              </div>
            </div>
            <p class="activity-description">
              Enfrentamos os bosses mais desafiadores do Tibia com estratégias coordenadas e teamwork impecável.
            </p>
            <div class="activity-stats">
              <span class="activity-stat">15+ Bosses Semanais</span>
              <span class="activity-stat">100% Taxa de Sucesso</span>
            </div>
          </div>
          
          <div class="activity-card">
            <div class="activity-header">
              <span class="activity-icon-large">�</span>
              <div>
                <h3 class="activity-title">Hunts de Profit</h3>
                <span class="activity-badge">Alta Rentabilidade</span>
              </div>
            </div>
            <p class="activity-description">
              Sessões organizadas de caça com foco em maximizar lucros e experiência para todos os participantes.
            </p>
          </div>
          
          <div class="activity-card">
            <div class="activity-header">
              <span class="activity-icon-large">🏆</span>
              <div>
                <h3 class="activity-title">Eventos Especiais</h3>
                <span class="activity-badge">Exclusivos</span>
              </div>
            </div>
            <p class="activity-description">
              Competições internas, celebrações e eventos únicos que fortalecem os laços da comunidade.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Guild Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="info-grid">
          <div class="info-card">
            <h3 class="info-title">🏰 Informações da Guilda</h3>
            <div class="info-list">
              <div class="info-item">
                <span class="info-label">Servidor:</span>
                <span class="info-value">Inabra</span>
              </div>
              <div class="info-item">
                <span class="info-label">Fundada em:</span>
                <span class="info-value">Março 2025</span>
              </div>
              <div class="info-item">
                <span class="info-label">Membros:</span>
                <span class="info-value status-active">50+ Ativos</span>
              </div>
              <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="info-value status-recruiting">Recrutando</span>
              </div>
            </div>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">📊 Estatísticas</h3>
            <div class="stats-list">
              <div class="stat-bar">
                <span class="stat-label">Atividade Diária</span>
                <div class="stat-progress">
                  <div class="stat-fill" style="width: 95%"></div>
                </div>
                <span class="stat-percentage">95%</span>
              </div>
              <div class="stat-bar">
                <span class="stat-label">Boss Success Rate</span>
                <div class="stat-progress">
                  <div class="stat-fill" style="width: 100%"></div>
                </div>
                <span class="stat-percentage">100%</span>
              </div>
              <div class="stat-bar">
                <span class="stat-label">Satisfação Membros</span>
                <div class="stat-progress">
                  <div class="stat-fill" style="width: 98%"></div>
                </div>
                <span class="stat-percentage">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Pronto para a Aventura?</h2>
          <p class="cta-description">
            Junte-se à elite dos caçadores e faça parte de uma comunidade que valoriza excelência, 
            amizade e conquistas épicas em Tibia.
          </p>
          <div class="cta-buttons">
            <button class="cta-primary-large">
              <span class="button-icon">⚔️</span>
              Aplicar Agora
              <span class="button-arrow">→</span>
            </button>
          </div>
          <p class="cta-note">
            * Aceitamos jogadores de todos os níveis que compartilhem nossos valores
          </p>
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
  name: 'Home',
  data() {
    return {
      characterName: '',
      characterData: null,
      loading: false,
      error: null,
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
    this.loadMidnightHunters()
    
    // Configurar atualização automática a cada 60 segundos
    this.startAutoRefresh()
  },
  beforeUnmount() {
    // Limpar timers quando o componente for destruído
    this.stopAutoRefresh()
  },
  methods: {
    async searchCharacter() {
      if (!this.characterName.trim()) {
        this.error = 'Por favor, digite um nome de personagem'
        return
      }

      this.loading = true
      this.error = null
      this.characterData = null

      try {
        const response = await fetch(`https://api.tibiadata.com/v4/character/${encodeURIComponent(this.characterName.trim())}`)
        const data = await response.json()

        if (data.character && data.character.character) {
          this.characterData = data.character
        } else {
          this.error = 'Personagem não encontrado'
        }
      } catch (err) {
        this.error = 'Erro ao buscar personagem. Tente novamente.'
        console.error('Erro na API:', err)
      } finally {
        this.loading = false
      }
    },
    async loadMidnightHunters() {
      this.guildLoading = true
      this.guildError = null

      try {
        const response = await fetch(`https://api.tibiadata.com/v4/guild/Midnight%20Hunters`)
        const data = await response.json()

        if (data.guild && data.guild.name) {
          this.guildData = data
          this.lastUpdate = new Date()
          this.guildError = null
        } else {
          this.guildError = 'Guild Midnight Hunters não encontrada'
        }
      } catch (err) {
        this.guildError = 'Erro ao carregar dados da guild'
        console.error('Erro na API Guild:', err)
      } finally {
        this.guildLoading = false
      }
    },
    startAutoRefresh() {
      // Timer para atualizar dados da guild a cada 60 segundos
      this.refreshTimer = setInterval(() => {
        this.loadMidnightHunters()
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
      await this.loadMidnightHunters()
    },
    async searchGuild() {
      // Método mantido para compatibilidade, mas não usado
      return this.loadMidnightHunters()
    }
  }
}
</script>

<style scoped>
/* Global Styles */
.home-container {
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

/* Subtle Guild Logo Watermark */
.home-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/images/backgrounds/backgroud-guild.jpeg');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.03;
  pointer-events: none;
  z-index: -1;
}

/* Hero Section */
.hero-section {
  padding: 6rem 0 8rem 0;
  background: linear-gradient(135deg, #333333 0%, #2a2a2a 50%, #1a1a1a 100%);
  position: relative;
  color: white;
  border-bottom: 1px solid rgba(68, 68, 68, 0.5);
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.hero-content {
  text-align: center;
  padding: 2rem;
}

.guild-emblem-large {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  letter-spacing: -1px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  margin-bottom: 2rem;
  font-weight: 400;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.stat-divider {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* Buttons */
.cta-primary, .cta-secondary, .cta-primary-large {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.cta-primary, .cta-primary-large {
  background: #8b5cf6;
  color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.cta-primary:hover, .cta-primary-large:hover {
  background: #7c3aed;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

.cta-secondary {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: #ffffff;
}

.cta-primary-large {
  padding: 1rem 2.5rem;
  font-size: 1rem;
}

.button-icon {
  font-size: 1.2rem;
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.cta-primary-large:hover .button-arrow {
  transform: translateX(5px);
}

/* Section Styles */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', serif;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #9ca3af;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Guild Members Section */
.guild-members-section {
  background: rgba(51, 51, 51, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(51, 51, 51, 0.5);
  height: 100%;
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

.refresh-btn {
  background: rgba(68, 68, 68, 0.6);
  border: 1px solid rgba(85, 85, 85, 0.5);
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
  background: rgba(85, 85, 85, 0.8);
  border-color: rgba(119, 119, 119, 0.7);
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
  border: 1px solid rgba(85, 85, 85, 0.4);
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
  background: rgba(68, 68, 68, 0.4);
  border-radius: 8px;
  border: 1px solid rgba(85, 85, 85, 0.3);
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
  background: rgba(119, 119, 119, 0.6);
  border-radius: 3px;
}

.members-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(136, 136, 136, 0.8);
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

.member-card:hover {
  background: rgba(85, 85, 85, 0.8);
  border-color: rgba(119, 119, 119, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.member-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(119, 119, 119, 0.5);
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
  color: #fbbf24;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

/* Character Lookup Section */
.character-section {
  padding: 6rem 0;
  background: #2a2a2a;
}

.character-lookup {
  max-width: 800px;
  margin: 0 auto;
}

.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.character-input {
  flex: 1;
  max-width: 400px;
  padding: 1rem 1.5rem;
  border: 2px solid #444444;
  border-radius: 8px;
  background: #333333;
  color: #e5e5e5;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.character-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.character-input::placeholder {
  color: #888888;
}

.search-btn {
  padding: 1rem 2rem;
  background: #8b5cf6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-btn:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.character-result {
  display: flex;
  justify-content: center;
}

.character-card {
  background: #333333;
  border: 1px solid #444444;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

.character-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #444444;
}

.character-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #8b5cf6;
  margin: 0;
}

.character-level {
  background: #8b5cf6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.character-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.info-label {
  color: #b3b3b3;
  font-weight: 500;
}

.info-value {
  color: #e5e5e5;
  font-weight: 600;
}

.guild-name {
  color: #8b5cf6 !important;
  font-weight: 700;
}

.status-online {
  color: #10b981 !important;
}

.status-offline {
  color: #ef4444 !important;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #dc2626;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
}

.error-icon {
  font-size: 1.2rem;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: #2a2a2a;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #333333;
  border: 1px solid #444444;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #8b5cf6;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 1rem;
}

.feature-description {
  color: #b3b3b3;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Activities Section */
.activities-section {
  padding: 6rem 0;
  background: #1a1a1a;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.activity-card {
  background: #333333;
  border: 1px solid #444444;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.activity-card.featured {
  background: linear-gradient(145deg, #444444, #555555);
  border-color: #8b5cf6;
  transform: scale(1.02);
}

.activity-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: #8b5cf6;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.activity-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.activity-icon-large {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.7));
}

.activity-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 0.2rem;
}

.activity-badge {
  background: linear-gradient(145deg, #8b5cf6, #c084fc);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-description {
  color: #b3b3b3;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.activity-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.activity-stat {
  background: #444444;
  color: #8b5cf6;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #555555;
}

/* Info Section */
.info-section {
  padding: 6rem 0;
  background: #2a2a2a;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.info-card {
  background: #333333;
  border: 1px solid #444444;
  border-radius: 12px;
  padding: 2.5rem;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #444444;
}

.info-label {
  color: #b3b3b3;
  font-weight: 500;
}

.info-value {
  color: #e5e5e5;
  font-weight: 600;
}

.status-active {
  color: #10b981;
}

.status-recruiting {
  color: #f59e0b;
}

/* Stats */
.stats-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-label {
  color: #9ca3af;
  font-weight: 500;
  min-width: 120px;
}

.stat-progress {
  flex: 1;
  height: 8px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #c084fc);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.stat-percentage {
  color: #8b5cf6;
  font-weight: 700;
  min-width: 40px;
  text-align: right;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #7c3aed, #8b5cf6);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.1rem;
  color: #e0e7ff;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  margin-bottom: 1.5rem;
}

.cta-note {
  color: #c7d2fe;
  font-size: 0.9rem;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .stat-divider {
    display: none;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .guild-members-section {
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
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .activities-grid {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .stat-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .cta-title {
    font-size: 2.2rem;
  }
  
  .home-container::before {
    background-size: 60%;
  }
  
  /* Character Lookup Responsive */
  .search-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-input {
    min-width: unset;
  }
  
  .character-info {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .basic-info h3 {
    font-size: 1.3rem;
  }
  
  .level-badge {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }
  
  .guild-info, .status-info {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-container {
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .guild-members-section {
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
  
  .feature-card, .activity-card, .info-card {
    padding: 1.5rem;
  }
  
  /* Character Lookup Mobile */
  .character-lookup {
    padding: 1.5rem;
  }
  
  .search-input {
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
  
  .search-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
  
  .character-card {
    padding: 1.5rem;
  }
  
  .basic-info h3 {
    font-size: 1.2rem;
  }
  
  .character-details {
    font-size: 0.95rem;
  }
  
  .level-badge {
    font-size: 0.85rem;
    padding: 0.25rem 0.7rem;
  }
  
  .guild-info h4, .status-info h4 {
    font-size: 1.1rem;
  }
  
  .loading-spinner {
    font-size: 1rem;
  }
  
  .error-message {
    font-size: 0.95rem;
    padding: 1rem;
  }
}
</style>
