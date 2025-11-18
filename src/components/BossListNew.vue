<template>
  <div class="boss-list-container">
    <div class="container">
      <h1 class="page-title"><img :src="guildLogo" alt="Guild Logo" class="title-icon" /> Times Final Ferumbras e GT</h1>
      <p class="page-subtitle">Cadastros e informações dos times da guild</p>
      
      <div class="actions-section">
        <div class="refresh-controls">
          <button @click="refreshData" class="refresh-btn" :disabled="loading">
            <span v-if="loading">🔄</span>
            <span v-else>↻</span>
            {{ loading ? 'Carregando...' : 'Atualizar Dados' }}
          </button>
          
          <div class="auto-refresh-control">
            <label class="auto-refresh-label">
              <input 
                type="checkbox" 
                v-model="autoRefreshEnabled" 
                @change="toggleAutoRefresh"
                class="auto-refresh-checkbox"
              />
              <span class="checkbox-custom"></span>
              Auto-refresh
            </label>
            
            <select 
              v-model="refreshInterval" 
              @change="updateRefreshInterval"
              :disabled="!autoRefreshEnabled"
              class="interval-select"
            >
              <option value="60">1 min</option>
              <option value="300">5 min</option>
              <option value="600">10 min</option>
              <option value="1800">30 min</option>
            </select>
          </div>
        </div>
        
        <a :href="spreadsheetUrl" target="_blank" class="view-full-btn">
          📊 Ver Planilha Completa
        </a>
        
        <div v-if="lastUpdate" class="last-update">
          <small>Última atualização: {{ formatTime(lastUpdate) }}</small>
          <small v-if="autoRefreshEnabled && nextUpdate">
            | Próxima: {{ formatTime(nextUpdate) }}
          </small>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"><img :src="guildLogo" alt="Guild Logo" class="spinner-icon" /></div>
        <p>Carregando dados da planilha...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <h3>❌ Erro ao carregar dados</h3>
        <p>{{ error }}</p>
        <button @click="refreshData" class="retry-btn">Tentar Novamente</button>
      </div>

      <div v-else-if="data.length > 0" class="data-section">
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-number">{{ data.length }}</span>
            <span class="stat-label">Total de Registros</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ headers.length }}</span>
            <span class="stat-label">Campos</span>
          </div>
          <div class="stat-item" v-if="autoRefreshEnabled">
            <span class="stat-number">{{ refreshInterval / 60 }}min</span>
            <span class="stat-label">Intervalo Auto</span>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header" class="table-header">
                  {{ formatHeader(header) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in data" :key="index" class="table-row">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="table-cell">
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="empty-state">
        <h3>📝 Nenhum dado encontrado</h3>
        <p>A planilha parece estar vazia ou não foi possível carregar os dados.</p>
      </div>

      <div class="info-section">
        <h2 class="info-title">📋 Informações</h2>
        <div class="info-content">
          <p><strong>🎯 Como usar:</strong></p>
          <ul>
            <li>Os dados são atualizados automaticamente da planilha do Google</li>
            <li>Ative o "Auto-refresh" para atualizar automaticamente</li>
            <li>Clique em "Atualizar Dados" para buscar informações mais recentes</li>
            <li>Use "Ver Planilha Completa" para acessar a planilha original</li>
          </ul>
          
          <p><strong>📊 Sobre os dados:</strong></p>
          <p>Esta tabela mostra as informações coletadas sobre os times para Final Ferumbras e GT da guild.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guildLogo from '../assets/images/logos/guild-logo.png'

export default {
  name: 'BossList',
  data() {
    return {
      guildLogo,
      data: [],
      headers: [],
      loading: false,
      error: null,
      csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkPumc5StGjCOnwkq_vnorgme3AE4RX2myf3mQWi4Z7si-MlRahFECfxBRyItYt2Ft1ibY9HdqzdWw/pub?output=csv',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkPumc5StGjCOnwkq_vnorgme3AE4RX2myf3mQWi4Z7si-MlRahFECfxBRyItYt2Ft1ibY9HdqzdWw/pubhtml',
      // Auto-refresh functionality
      autoRefreshEnabled: false,
      refreshInterval: 300, // 5 minutes in seconds
      refreshTimer: null,
      lastUpdate: null,
      nextUpdate: null
    }
  },
  mounted() {
    this.loadData()
  },
  beforeUnmount() {
    this.clearAutoRefresh()
  },
  methods: {
    async loadData() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(this.csvUrl)
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da planilha')
        }
        
        const csvText = await response.text()
        this.parseCSV(csvText)
        this.lastUpdate = new Date()
        this.updateNextUpdateTime()
      } catch (err) {
        this.error = err.message || 'Erro desconhecido ao carregar dados'
        console.error('Erro ao carregar dados:', err)
      } finally {
        this.loading = false
      }
    },
    
    parseCSV(csvText) {
      const lines = csvText.split('\n').filter(line => line.trim() !== '')
      
      if (lines.length === 0) {
        this.data = []
        this.headers = []
        return
      }
      
      // Parse headers
      this.headers = this.parseCSVLine(lines[0])
      
      // Parse data rows
      this.data = []
      for (let i = 1; i < lines.length; i++) {
        const row = this.parseCSVLine(lines[i])
        if (row.length > 0 && row.some(cell => cell.trim() !== '')) {
          // Ensure row has same length as headers
          while (row.length < this.headers.length) {
            row.push('')
          }
          this.data.push(row.slice(0, this.headers.length))
        }
      }
    },
    
    parseCSVLine(line) {
      const result = []
      let current = ''
      let inQuotes = false
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      
      result.push(current.trim())
      return result
    },
    
    formatHeader(header) {
      // Clean up header names
      return header
        .replace(/['"]/g, '')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    },
    
    formatTime(date) {
      if (!date) return ''
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      })
    },
    
    async refreshData() {
      await this.loadData()
    },
    
    toggleAutoRefresh() {
      if (this.autoRefreshEnabled) {
        this.startAutoRefresh()
      } else {
        this.clearAutoRefresh()
      }
    },
    
    updateRefreshInterval() {
      if (this.autoRefreshEnabled) {
        this.clearAutoRefresh()
        this.startAutoRefresh()
      }
    },
    
    startAutoRefresh() {
      this.clearAutoRefresh()
      this.updateNextUpdateTime()
      
      this.refreshTimer = setInterval(async () => {
        await this.loadData()
      }, this.refreshInterval * 1000)
    },
    
    clearAutoRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }
      this.nextUpdate = null
    },
    
    updateNextUpdateTime() {
      if (this.autoRefreshEnabled && this.lastUpdate) {
        this.nextUpdate = new Date(this.lastUpdate.getTime() + (this.refreshInterval * 1000))
      }
    }
  }
}
</script>

<style scoped>
.boss-list-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 100vh;
  color: #e0e6ed;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #d4af37;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-family: 'Cinzel', serif;
}

.page-subtitle {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #8b949e;
}

.actions-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.refresh-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.refresh-btn, .retry-btn {
  background: linear-gradient(135deg, #d4af37, #f4e17a);
  color: #2c1810;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.refresh-btn:hover, .retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auto-refresh-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.auto-refresh-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.auto-refresh-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  background: rgba(255,255,255,0.1);
  border: 2px solid #d4af37;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.auto-refresh-checkbox:checked + .checkbox-custom {
  background: #d4af37;
}

.auto-refresh-checkbox:checked + .checkbox-custom::after {
  content: '✓';
  color: #2c1810;
  font-weight: bold;
  font-size: 14px;
}

.interval-select {
  background: rgba(255,255,255,0.1);
  border: 1px solid #d4af37;
  color: #e0e6ed;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.interval-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.interval-select option {
  background: #1a1a2e;
  color: #e0e6ed;
}

.view-full-btn {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.view-full-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.last-update {
  color: #8b949e;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
  background: rgba(0,0,0,0.2);
  border-radius: 6px;
  min-width: 200px;
}

.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 3rem;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  margin: 2rem 0;
}

.loading-spinner {
  font-size: 3rem;
  animation: spin 2s linear infinite;
  margin-bottom: 1rem;
}

.spinner-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #d4af37;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #8b949e;
  margin-top: 0.5rem;
}

.table-container {
  overflow-x: auto;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background: rgba(212, 175, 55, 0.2);
  color: #d4af37;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid rgba(212, 175, 55, 0.3);
  white-space: nowrap;
}

.table-row:nth-child(even) {
  background: rgba(255,255,255,0.02);
}

.table-row:hover {
  background: rgba(212, 175, 55, 0.1);
}

.table-cell {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: #e0e6ed;
}

.info-section {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.info-title {
  color: #d4af37;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.info-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.info-content ul {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.info-content li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .actions-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-controls {
    justify-content: center;
  }
  
  .stats-bar {
    gap: 1rem;
  }
  
  .stat-item {
    flex: 1;
    min-width: 120px;
  }
  
  .table-container {
    font-size: 0.9rem;
  }
  
  .table-header, .table-cell {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .refresh-controls {
    flex-direction: column;
    width: 100%;
  }
  
  .auto-refresh-control {
    width: 100%;
    justify-content: space-between;
  }
  
  .interval-select {
    flex: 1;
    max-width: 120px;
  }
}
</style>
