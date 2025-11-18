<template>
    <div class="boss-list-container">
        <div class="container">
            <div class="actions-section">
                <div class="refresh-controls">
                    <div class="auto-refresh-control">
                    </div>
                </div>
                <div v-if="lastUpdate" class="last-update">
                    <small>Última atualização: {{ formatTime(lastUpdate) }}</small>
                    <small v-if="autoRefreshEnabled && nextUpdate">
                        | Próxima: {{ formatTime(nextUpdate) }}
                    </small>
                </div>
            </div>
            <div class="container">
                <h1 class="page-title"><img :src="guildLogo" alt="Guild Logo" class="title-icon" /> Times Final Ferumbras e GT</h1>
                <p class="page-subtitle">Cadastros e informações dos times da guild</p>

                <div class="actions-section">
                    <button @click="refreshData" class="refresh-btn" :disabled="loading">
                        <span v-if="loading">🔄</span>
                        <span v-else>↻</span>
                        {{ loading ? 'Carregando...' : 'Atualizar Dados' }}
                    </button>

                    <a :href="spreadsheetUrl" target="_blank" class="view-full-btn">
                        📊 Ver Planilha Completa
                    </a>

                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtBc7AQmYfzbC0iqHnJlwRhZnrJqTQ8tWW-WTql63046n5nw/viewform" target="_blank" class="form-btn">
                        📝 Preencher Formulário
                    </a>
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

                <!-- Tabelas por Times -->
                <div v-if="data.length > 0 && teamColumnIndex !== -1" class="teams-section">
                    <h2 class="section-title">📅 Times Organizados</h2>
                    
                    <div class="teams-controls">
                        <button @click="toggleAdminMode" class="admin-btn" :class="{ 'admin-active': isAdmin }" title="Modo Administrador">
                            🔐
                        </button>
                        
                        <button v-if="isAdmin" @click="toggleEditMode" class="edit-btn teams-edit-btn">
                            <span v-if="editMode">✅</span>
                            <span v-else>✏️</span>
                            {{ editMode ? 'Finalizar Seleção' : 'Selecionar Principais' }}
                        </button>
                        
                        <button v-if="isAdmin" @click="resetTeamAssignments" class="edit-btn reset-btn" v-show="localTeamAssignments.size > 0">
                            🔄 Resetar Mudanças
                        </button>
                    </div>
                    
                    <div class="legend">
                        <p><strong>🔄</strong> Indica que o jogador está disponível para ambos os times</p>
                        <p v-if="!isAdmin" class="admin-notice"><strong>🔐</strong> Clique no ícone de cadeado para habilitar edição (apenas admin)</p>
                    </div>
                    
                    <div class="teams-grid">
                        <!-- Time Segunda -->
                        <div class="team-card" 
                             @dragover="onDragOver" 
                             @dragenter="onDragEnter" 
                             @dragleave="onDragLeave" 
                             @drop="onDrop($event, 'segunda')">
                            <h3 class="team-title">🗓️ Time Segunda</h3>
                            
                            <!-- Controles de seleção (visível apenas no modo de edição) -->
                            <div v-if="editMode && timeSegundaCompactData.length > 0" class="selection-controls">
                                <div class="selection-info">
                                    <strong>{{ getSelectedCount('segunda') }}</strong> de <strong>{{ getTotalCount('segunda') }}</strong> selecionados como principais
                                </div>
                                <div class="selection-buttons">
                                    <button @click="selectAllPlayers('segunda')" class="select-all-btn">Selecionar Todos</button>
                                    <button @click="clearAllSelections('segunda')" class="clear-all-btn">Limpar Seleção</button>
                                </div>
                            </div>
                            
                            <div v-if="timeSegundaCompactData.length > 0" class="team-table-container">
                                <table class="team-table">
                                    <thead>
                                        <tr>
                                            <th v-if="editMode" class="team-table-header checkbox-header">Principal</th>
                                            <th v-for="header in compactHeaders" :key="header.name" class="team-table-header">
                                                {{ header.name }}
                                            </th>
                                            <th v-if="!editMode && getSelectedCount('segunda') > 0" class="team-table-header">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, index) in timeSegundaCompactData" 
                                            :key="index" 
                                            class="team-table-row" 
                                            :class="{ 'selected-player': !editMode && isPlayerSelected('segunda', index) }"
                                            :draggable="isAdmin"
                                            @dragstart="onDragStart($event, timeSegundaData[index], 'segunda')"
                                            @dragend="onDragEnd">
                                            <td v-if="editMode" class="team-table-cell checkbox-cell">
                                                <input 
                                                    type="checkbox" 
                                                    :checked="isPlayerSelected('segunda', index)"
                                                    @change="togglePlayerSelection('segunda', index)"
                                                    class="player-checkbox"
                                                />
                                            </td>
                                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="team-table-cell">
                                                {{ cell }}
                                            </td>
                                            <td v-if="!editMode && getSelectedCount('segunda') > 0" class="team-table-cell status-cell">
                                                <span v-if="isPlayerSelected('segunda', index)" class="status-principal">⭐ Principal</span>
                                                <span v-else class="status-suplente">🔄 Suplente</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="team-stats">
                                    <span class="team-count">{{ timeSegundaCompactData.length }} membro(s)</span>
                                    <span v-if="getSelectedCount('segunda') > 0" class="selection-count">
                                        | {{ getSelectedCount('segunda') }} principais, {{ getTotalCount('segunda') - getSelectedCount('segunda') }} suplentes
                                    </span>
                                </div>
                            </div>
                            <div v-else class="empty-team">
                                <p>Nenhum membro no Time Segunda</p>
                            </div>
                        </div>

                        <!-- Time Terça -->
                        <div class="team-card" 
                             @dragover="onDragOver" 
                             @dragenter="onDragEnter" 
                             @dragleave="onDragLeave" 
                             @drop="onDrop($event, 'terca')">
                            <h3 class="team-title">🗓️ Time Terça</h3>
                            
                            <!-- Controles de seleção (visível apenas no modo de edição) -->
                            <div v-if="editMode && timeTercaCompactData.length > 0" class="selection-controls">
                                <div class="selection-info">
                                    <strong>{{ getSelectedCount('terca') }}</strong> de <strong>{{ getTotalCount('terca') }}</strong> selecionados como principais
                                </div>
                                <div class="selection-buttons">
                                    <button @click="selectAllPlayers('terca')" class="select-all-btn">Selecionar Todos</button>
                                    <button @click="clearAllSelections('terca')" class="clear-all-btn">Limpar Seleção</button>
                                </div>
                            </div>
                            
                            <div v-if="timeTercaCompactData.length > 0" class="team-table-container">
                                <table class="team-table">
                                    <thead>
                                        <tr>
                                            <th v-if="editMode" class="team-table-header checkbox-header">Principal</th>
                                            <th v-for="header in compactHeaders" :key="header.name" class="team-table-header">
                                                {{ header.name }}
                                            </th>
                                            <th v-if="!editMode && getSelectedCount('terca') > 0" class="team-table-header">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, index) in timeTercaCompactData" 
                                            :key="index" 
                                            class="team-table-row" 
                                            :class="{ 'selected-player': !editMode && isPlayerSelected('terca', index) }"
                                            :draggable="isAdmin"
                                            @dragstart="onDragStart($event, timeTercaData[index], 'terca')"
                                            @dragend="onDragEnd">
                                            <td v-if="editMode" class="team-table-cell checkbox-cell">
                                                <input 
                                                    type="checkbox" 
                                                    :checked="isPlayerSelected('terca', index)"
                                                    @change="togglePlayerSelection('terca', index)"
                                                    class="player-checkbox"
                                                />
                                            </td>
                                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="team-table-cell">
                                                {{ cell }}
                                            </td>
                                            <td v-if="!editMode && getSelectedCount('terca') > 0" class="team-table-cell status-cell">
                                                <span v-if="isPlayerSelected('terca', index)" class="status-principal">⭐ Principal</span>
                                                <span v-else class="status-suplente">🔄 Suplente</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="team-stats">
                                    <span class="team-count">{{ timeTercaCompactData.length }} membro(s)</span>
                                    <span v-if="getSelectedCount('terca') > 0" class="selection-count">
                                        | {{ getSelectedCount('terca') }} principais, {{ getTotalCount('terca') - getSelectedCount('terca') }} suplentes
                                    </span>
                                </div>
                            </div>
                            <div v-else class="empty-team">
                                <p>Nenhum membro no Time Terça</p>
                            </div>
                        </div>

                        <!-- Time Sem Fixo -->
                        <div class="team-card" 
                             @dragover="onDragOver" 
                             @dragenter="onDragEnter" 
                             @dragleave="onDragLeave" 
                             @drop="onDrop($event, 'semTimeFixo')">
                            <h3 class="team-title">🔄 Sem Time Fixo</h3>
                            
                            <!-- Controles de seleção (visível apenas no modo de edição) -->
                            <div v-if="editMode && semTimeFixoCompactData.length > 0" class="selection-controls">
                                <div class="selection-info">
                                    <strong>{{ getSelectedCount('semTimeFixo') }}</strong> de <strong>{{ getTotalCount('semTimeFixo') }}</strong> selecionados como principais
                                </div>
                                <div class="selection-buttons">
                                    <button @click="selectAllPlayers('semTimeFixo')" class="select-all-btn">Selecionar Todos</button>
                                    <button @click="clearAllSelections('semTimeFixo')" class="clear-all-btn">Limpar Seleção</button>
                                </div>
                            </div>
                            
                            <div v-if="semTimeFixoCompactData.length > 0" class="team-table-container">
                                <table class="team-table">
                                    <thead>
                                        <tr>
                                            <th v-if="editMode" class="team-table-header checkbox-header">Principal</th>
                                            <th v-for="header in compactHeaders" :key="header.name" class="team-table-header">
                                                {{ header.name }}
                                            </th>
                                            <th v-if="!editMode && getSelectedCount('semTimeFixo') > 0" class="team-table-header">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, index) in semTimeFixoCompactData" 
                                            :key="index" 
                                            class="team-table-row" 
                                            :class="{ 'selected-player': !editMode && isPlayerSelected('semTimeFixo', index) }"
                                            :draggable="isAdmin"
                                            @dragstart="onDragStart($event, semTimeFixoData[index], 'semTimeFixo')"
                                            @dragend="onDragEnd">
                                            <td v-if="editMode" class="team-table-cell checkbox-cell">
                                                <input 
                                                    type="checkbox" 
                                                    :checked="isPlayerSelected('semTimeFixo', index)"
                                                    @change="togglePlayerSelection('semTimeFixo', index)"
                                                    class="player-checkbox"
                                                />
                                            </td>
                                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="team-table-cell">
                                                {{ cell }}
                                            </td>
                                            <td v-if="!editMode && getSelectedCount('semTimeFixo') > 0" class="team-table-cell status-cell">
                                                <span v-if="isPlayerSelected('semTimeFixo', index)" class="status-principal">⭐ Principal</span>
                                                <span v-else class="status-suplente">🔄 Suplente</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="team-stats">
                                    <span class="team-count">{{ semTimeFixoCompactData.length }} membro(s)</span>
                                    <span v-if="getSelectedCount('semTimeFixo') > 0" class="selection-count">
                                        | {{ getSelectedCount('semTimeFixo') }} principais, {{ getTotalCount('semTimeFixo') - getSelectedCount('semTimeFixo') }} suplentes
                                    </span>
                                </div>
                            </div>
                            <div v-else class="empty-team">
                                <p>Nenhum membro sem time fixo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal de Senha Admin -->
                <div v-if="showAdminModal" class="admin-modal-overlay" @click="closeAdminModal">
                    <div class="admin-modal" @click.stop>
                        <h3>🔐 Acesso Admin</h3>
                        <p>Digite a senha para habilitar modo administrador:</p>
                        <input 
                            v-model="adminPassword" 
                            type="password" 
                            placeholder="Senha..."
                            @keyup.enter="checkAdminPassword"
                            ref="adminPasswordInput"
                            class="admin-password-input"
                        />
                        <div class="admin-modal-buttons">
                            <button @click="checkAdminPassword" class="admin-confirm-btn">Confirmar</button>
                            <button @click="closeAdminModal" class="admin-cancel-btn">Cancelar</button>
                        </div>
                        <p v-if="adminError" class="admin-error">{{ adminError }}</p>
                    </div>
                </div>

                <div class="info-section">
                    <h2 class="info-title">📋 Informações</h2>
                    <div class="info-content">
                        <p><strong>🎯 Como usar:</strong></p>
                        <ul>
                            <li>Os dados são atualizados automaticamente da planilha do Google</li>
                            <li>Clique em "Atualizar Dados" para buscar as informações mais recentes</li>
                            <li>Use "Ver Planilha Completa" para acessar a planilha original</li>
                        </ul>

                        <p><strong>� Sobre os dados:</strong></p>
                        <p>Esta tabela mostra as informações coletadas sobre os times para Final Ferumbras e GT da
                            guild.</p>
                    </div>
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
            lastUpdate: null,
            csvUrl: 'https://docs.google.com/spreadsheets/d/1pQ1OoZkp8gj_nkyW0INQ4HCIw0cWQ80FOFxLhF3r55c/export?format=csv&gid=314246739',
            spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1pQ1OoZkp8gj_nkyW0INQ4HCIw0cWQ80FOFxLhF3r55c/edit?gid=314246739#gid=314246739',
            selectedPlayers: {
                segunda: new Set(),
                terca: new Set(),
                semTimeFixo: new Set()
            },
            editMode: false,
            draggedPlayer: null,
            draggedFromTeam: null,
            localTeamAssignments: new Map(), // Para armazenar modificações locais dos times
            
            // Admin local states
            isAdmin: false,
            showAdminModal: false,
            adminPassword: '',
            adminError: '',
            correctPassword: 'admin123'
        }
    },
    mounted() {
        console.log('🔥 BossList mounted - iniciando carregamento de dados...')
        this.loadData()
    },
    computed: {
        timeSegundaData() {
            return this.getModifiedTeamData('Segunda')
        },
        timeTercaData() {
            return this.getModifiedTeamData('Terça')
        },
        teamColumnIndex() {
            // Procura pela coluna que contém informação do time
            return this.headers.findIndex(header => 
                header.toLowerCase().includes('time') || 
                header.toLowerCase().includes('team') ||
                header.toLowerCase().includes('qual seu time')
            )
        },
        compactHeaders() {
            // Headers reduzidos para as tabelas dos times
            const compactHeadersMap = []
            
            // Procura pela coluna específica do nickname (mais específico primeiro)
            let nickIndex = this.headers.findIndex(header => 
                header.toLowerCase().includes('qual seu nickname no jogo') ||
                header.toLowerCase().includes('nickname no jogo') ||
                header.toLowerCase().includes('nick no jogo')
            )
            
            // Se não encontrou, tenta variações mais específicas
            if (nickIndex === -1) {
                nickIndex = this.headers.findIndex(header => 
                    header.toLowerCase().includes('nickname') && 
                    !header.toLowerCase().includes('qual seu nome')
                )
            }
            
            // Como último recurso, procura por 'nick' mas não 'nome'
            if (nickIndex === -1) {
                nickIndex = this.headers.findIndex(header => 
                    header.toLowerCase().includes('nick') && 
                    !header.toLowerCase().includes('qual seu nome')
                )
            }
            
            const levelIndex = this.headers.findIndex(header => 
                header.toLowerCase().includes('level') ||
                header.toLowerCase().includes('nível') ||
                header.toLowerCase().includes('lvl')
            )
            
            const vocationIndex = this.headers.findIndex(header => 
                header.toLowerCase().includes('vocação') ||
                header.toLowerCase().includes('vocation') ||
                header.toLowerCase().includes('classe')
            )
            
            // Adiciona as colunas na ordem desejada
            console.log('🔍 Debug compactHeaders: nickIndex =', nickIndex)
            if (nickIndex !== -1) {
                console.log('✅ Coluna de nickname encontrada:', this.headers[nickIndex])
                compactHeadersMap.push({ index: nickIndex, name: 'Nickname no Jogo' })
            } else {
                console.log('❌ Coluna de nickname não encontrada')
                console.log('📋 Headers disponíveis:', this.headers)
            }
            if (levelIndex !== -1) compactHeadersMap.push({ index: levelIndex, name: 'Level' })
            if (vocationIndex !== -1) compactHeadersMap.push({ index: vocationIndex, name: 'Vocação' })
            
            return compactHeadersMap
        },
        timeSegundaCompactData() {
            return this.getCompactData(this.timeSegundaData)
        },
        timeTercaCompactData() {
            return this.getCompactData(this.timeTercaData)
        },
        semTimeFixoData() {
            return this.getModifiedTeamData('Sem time fixo')
        },
        semTimeFixoCompactData() {
            return this.getCompactData(this.semTimeFixoData)
        }
    },
    methods: {
        async loadData() {
            this.loading = true
            this.error = null
            
            console.log('🚀 Iniciando carregamento de dados...')

            try {
                // Dados mockados como fallback se nenhuma URL funcionar
                const mockData = {
                    headers: ['Nome do Personagem', 'Vocation', 'Level', 'Disponibilidade', 'Observações'],
                    data: [
                        ['Exemplo Player 1', 'Elite Knight', '800+', 'Segunda a Sexta 19h-23h', 'Tank principal'],
                        ['Exemplo Player 2', 'Elder Druid', '750+', 'Fins de semana', 'Healer experiente'],
                        ['Exemplo Player 3', 'Royal Paladin', '820+', 'Todos os dias 20h-22h', 'DPS'],
                    ]
                }

                // Lista de URLs para tentar (fallbacks)
                const urls = [
                    `https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1pQ1OoZkp8gj_nkyW0INQ4HCIw0cWQ80FOFxLhF3r55c/export?format=csv&gid=314246739`,
                    `https://api.allorigins.win/get?url=${encodeURIComponent('https://docs.google.com/spreadsheets/d/1pQ1OoZkp8gj_nkyW0INQ4HCIw0cWQ80FOFxLhF3r55c/export?format=csv&gid=314246739')}`,
                    `https://corsproxy.io/?https://docs.google.com/spreadsheets/d/1pQ1OoZkp8gj_nkyW0INQ4HCIw0cWQ80FOFxLhF3r55c/export?format=csv&gid=314246739`
                ]

                for (let i = 0; i < urls.length; i++) {
                    try {
                        const timestamp = new Date().getTime()
                        let urlToUse = urls[i]
                        
                        // Para allorigins, não adiciona timestamp na URL original
                        if (!urlToUse.includes('allorigins')) {
                            urlToUse += `&t=${timestamp}`
                        }
                        
                        console.log(`📡 Tentativa ${i + 1}: ${urlToUse.substring(0, 100)}...`)
                        
                        const controller = new AbortController()
                        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout
                        
                        const response = await fetch(urlToUse, {
                            method: 'GET',
                            signal: controller.signal,
                            headers: {
                                'Cache-Control': 'no-cache, no-store, must-revalidate',
                                'Pragma': 'no-cache',
                                'Expires': '0'
                            }
                        })
                        
                        clearTimeout(timeoutId)
                        
                        console.log(`✅ Tentativa ${i + 1} - Status:`, response.status, response.statusText)
                        
                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                        }

                        let csvText = await response.text()
                        
                        // Se usando allorigins, extrair conteúdo do JSON
                        if (urls[i].includes('allorigins')) {
                            try {
                                const jsonResponse = JSON.parse(csvText)
                                csvText = jsonResponse.contents
                                console.log('📊 AllOrigins - Status interno:', jsonResponse.status)
                            } catch (parseErr) {
                                throw new Error('Erro ao processar resposta do AllOrigins')
                            }
                        }
                        
                        console.log(`📋 CSV recebido (${csvText.length} chars):`, csvText.substring(0, 150) + '...')
                        
                        if (!csvText || csvText.trim() === '' || csvText.includes('error') || csvText.includes('404')) {
                            throw new Error('CSV vazio ou inválido')
                        }
                        
                        console.log('🔄 Iniciando parse do CSV...')
                        this.parseCSV(csvText)
                        this.lastUpdate = new Date()
                        this.loading = false
                        console.log(`🎉 Sucesso na tentativa ${i + 1}! Dados carregados:`, this.data.length, 'linhas')
                        return // Sucesso!
                        
                    } catch (err) {
                        console.warn(`❌ Tentativa ${i + 1} falhou:`, err.message)
                        if (err.name === 'AbortError') {
                            console.warn('⏰ Timeout na requisição')
                        }
                    }
                }
                
                // Se chegou aqui, todas as tentativas falharam - usar dados mock
                console.log('🔄 Todas as tentativas falharam, usando dados de exemplo...')
                this.headers = mockData.headers
                this.data = mockData.data
                this.lastUpdate = new Date()
                this.loading = false
                this.error = 'Não foi possível carregar a planilha. Exibindo dados de exemplo. Verifique se a planilha está publicada corretamente.'
                
            } catch (err) {
                console.error('💥 Erro geral:', err)
                this.error = `Erro inesperado: ${err.message}`
            } finally {
                this.loading = false
                console.log('✨ Carregamento finalizado')
            }
        },

        parseCSV(csvText) {
            console.log('📊 parseCSV: Iniciando parse, texto tem', csvText.length, 'caracteres')
            
            const lines = csvText.split('\n').filter(line => line.trim() !== '')
            console.log('📊 parseCSV: Encontradas', lines.length, 'linhas')

            if (lines.length === 0) {
                console.log('⚠️ parseCSV: CSV vazio')
                this.data = []
                this.headers = []
                return
            }

            // Parse headers
            console.log('📊 parseCSV: Processando headers da primeira linha')
            this.headers = this.parseCSVLine(lines[0])
            console.log('📊 parseCSV: Headers encontrados:', this.headers)

            // Parse data rows
            this.data = []
            console.log('📊 parseCSV: Processando', lines.length - 1, 'linhas de dados')
            
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
            
            console.log('✅ parseCSV: Parse completo!', this.data.length, 'linhas processadas')
            console.log('📋 parseCSV: Dados finais:', this.data)
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

        async refreshData() {
            await this.loadData()
        },
        
        filterByTeam(teamName) {
            if (this.teamColumnIndex === -1 || !this.data.length) {
                return []
            }
            
            return this.data.filter(row => {
                const teamValue = row[this.teamColumnIndex]
                if (!teamValue) return false
                
                const teamValueLower = teamValue.toLowerCase()
                const teamNameLower = teamName.toLowerCase()
                
                // Para "Sem time fixo", procura especificamente por essas opções
                if (teamNameLower.includes('sem time fixo')) {
                    return teamValueLower.includes('sem time fixo') || 
                           teamValueLower.includes('sem time') || 
                           teamValueLower.includes('flexível') ||
                           teamValueLower.includes('flexible')
                }
                
                // Se contém "ambos", aparece em ambos os times (mas não em "sem time fixo")
                if (teamValueLower.includes('ambos') || teamValueLower.includes('both')) {
                    return teamNameLower.includes('segunda') || teamNameLower.includes('terça')
                }
                
                // Senão, verifica se contém o nome do time específico
                return teamValueLower.includes(teamNameLower)
            })
        },
        
        getCompactData(teamData) {
            if (!teamData.length || !this.compactHeaders.length) {
                return []
            }
            
            return teamData.map(row => {
                const compactRow = this.compactHeaders.map(header => row[header.index] || '')
                
                // Adiciona um indicador se a pessoa escolheu "Ambos"
                const teamValue = row[this.teamColumnIndex]
                if (teamValue && (teamValue.toLowerCase().includes('ambos') || teamValue.toLowerCase().includes('both'))) {
                    // Adiciona um emoji ao nick para indicar que é "Ambos"
                    compactRow[0] = compactRow[0] + ' 🔄'
                }
                
                return compactRow
            })
        },
        
        formatTime(date) {
            if (!date) return ''
            return date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            })
        },
        
        toggleEditMode() {
            this.editMode = !this.editMode
        },
        
        togglePlayerSelection(team, playerIndex) {
            const key = `${team}-${playerIndex}`
            if (this.selectedPlayers[team].has(key)) {
                this.selectedPlayers[team].delete(key)
            } else {
                this.selectedPlayers[team].add(key)
            }
        },
        
        isPlayerSelected(team, playerIndex) {
            const key = `${team}-${playerIndex}`
            return this.selectedPlayers[team].has(key)
        },
        
        selectAllPlayers(team) {
            let teamData
            if (team === 'segunda') teamData = this.timeSegundaCompactData
            else if (team === 'terca') teamData = this.timeTercaCompactData
            else if (team === 'semTimeFixo') teamData = this.semTimeFixoCompactData
            else return
            
            teamData.forEach((player, index) => {
                const key = `${team}-${index}`
                this.selectedPlayers[team].add(key)
            })
        },
        
        clearAllSelections(team) {
            this.selectedPlayers[team].clear()
        },
        
        getSelectedCount(team) {
            return this.selectedPlayers[team].size
        },
        
        getTotalCount(team) {
            if (team === 'segunda') return this.timeSegundaCompactData.length
            if (team === 'terca') return this.timeTercaCompactData.length
            if (team === 'semTimeFixo') return this.semTimeFixoCompactData.length
            return 0
        },
        
        // Métodos para drag and drop
        getModifiedTeamData(teamName) {
            const originalData = this.filterByTeam(teamName)
            const result = []
            
            // Adiciona jogadores originais que não foram movidos para outros times
            originalData.forEach((player, index) => {
                const playerId = this.getPlayerId(player)
                const assignedTeam = this.localTeamAssignments.get(playerId)
                
                if (!assignedTeam || assignedTeam === teamName) {
                    result.push(player)
                }
            })
            
            // Adiciona jogadores que foram movidos PARA este time
            this.data.forEach(player => {
                const playerId = this.getPlayerId(player)
                const assignedTeam = this.localTeamAssignments.get(playerId)
                
                if (assignedTeam === teamName) {
                    // Verifica se não é originalmente deste time
                    const isOriginallyFromThisTeam = originalData.some(originalPlayer => 
                        this.getPlayerId(originalPlayer) === playerId
                    )
                    
                    if (!isOriginallyFromThisTeam) {
                        result.push(player)
                    }
                }
            })
            
            return result
        },
        
        getPlayerId(player) {
            // Cria um ID único baseado no nickname e level do jogador
            const nickIndex = this.compactHeaders.find(h => h.name === 'Nickname no Jogo')?.index || 0
            const levelIndex = this.compactHeaders.find(h => h.name === 'Level')?.index || 1
            return `${player[nickIndex]}-${player[levelIndex]}`
        },
        
        onDragStart(event, player, team) {
            if (!this.isAdmin) {
                event.preventDefault()
                return
            }
            this.draggedPlayer = player
            this.draggedFromTeam = team
            event.dataTransfer.effectAllowed = 'move'
            event.target.classList.add('dragging')
        },
        
        onDragEnd(event) {
            if (!this.isAdmin) return
            event.target.classList.remove('dragging')
            this.draggedPlayer = null
            this.draggedFromTeam = null
        },
        
        onDragOver(event) {
            if (!this.isAdmin) return
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
        },
        
        onDragEnter(event) {
            if (!this.isAdmin) return
            event.preventDefault()
            event.currentTarget.classList.add('drag-over')
        },
        
        onDragLeave(event) {
            if (!this.isAdmin) return
            event.currentTarget.classList.remove('drag-over')
        },
        
        onDrop(event, targetTeam) {
            if (!this.isAdmin) return
            event.preventDefault()
            event.currentTarget.classList.remove('drag-over')
            
            if (this.draggedPlayer && this.draggedFromTeam !== targetTeam) {
                const playerId = this.getPlayerId(this.draggedPlayer)
                
                // Mapeia nomes de equipe para os valores corretos
                const teamMapping = {
                    'segunda': 'Segunda',
                    'terca': 'Terça',
                    'semTimeFixo': 'Sem time fixo'
                }
                
                const mappedTeam = teamMapping[targetTeam] || targetTeam
                this.localTeamAssignments.set(playerId, mappedTeam)
                
                console.log(`🔄 Jogador ${playerId} movido de ${this.draggedFromTeam} para ${mappedTeam}`)
            }
        },
        
        resetTeamAssignments() {
            this.localTeamAssignments.clear()
            console.log('🔄 Assignments locais resetados')
        },

        handleAdminLogout() {
            // Reset local states when admin logs out globally
            this.editMode = false
            this.resetTeamAssignments()
            console.log('🚪 BossList: Admin logout recebido')
        },
        
        // Métodos Admin
        toggleAdminMode() {
            if (this.isAdmin) {
                // Se já está admin, desloga
                this.logoutAdmin()
            } else {
                // Se não está admin, mostra modal de senha
                this.showAdminModal = true
                this.adminPassword = ''
                this.adminError = ''
                this.$nextTick(() => {
                    if (this.$refs.adminPasswordInput) {
                        this.$refs.adminPasswordInput.focus()
                    }
                })
            }
        },

        closeAdminModal() {
            this.showAdminModal = false
            this.adminPassword = ''
            this.adminError = ''
        },

        checkAdminPassword() {
            if (this.adminPassword === this.correctPassword) {
                this.isAdmin = true
                this.showAdminModal = false
                this.adminPassword = ''
                this.adminError = ''
                console.log('🔐 Modo admin ativado')
            } else {
                this.adminError = 'Senha incorreta!'
                this.adminPassword = ''
            }
        },

        logoutAdmin() {
            this.isAdmin = false
            this.editMode = false
            this.resetTeamAssignments()
            console.log('🚪 Modo admin desativado')
        }
    }
}
</script><style scoped>
.boss-list-container {
    background: #1a1a1a;
    min-height: 100vh;
    padding: 2rem 0;
    margin-top: 70px;
}

.container {
    margin: 0 auto;
    padding: 0 2rem;
}

.page-title {
    font-size: 3rem;
    color: #e5e5e5;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.title-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.page-subtitle {
    font-size: 1.2rem;
    color: #b3b3b3;
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'Georgia', serif;
    font-style: italic;
}

.actions-section {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.refresh-btn,
.view-full-btn {
    background: #8b5cf6;
    color: #ffffff;
    border: 1px solid #8b5cf6;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
}

.form-btn {
    background: #10b981;
    color: #ffffff;
    border: 1px solid #10b981;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
}

.edit-btn {
    background: #f59e0b;
    color: #ffffff;
    border: 1px solid #f59e0b;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
}

.refresh-btn:hover,
.view-full-btn:hover {
    background: #7c3aed;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-btn:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.edit-btn:hover {
    background: #d97706;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.refresh-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.loading-state,
.error-state,
.empty-state {
    text-align: center;
    padding: 3rem 2rem;
    background: #2a2a2a;
    border-radius: 12px;
    border: 1px solid #444444;
    margin-bottom: 2rem;
}

.loading-spinner {
    font-size: 3rem;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

.spinner-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.error-state h3,
.empty-state h3 {
    color: #e5e5e5;
    font-weight: 600;
    margin-bottom: 1rem;
}

.error-state p,
.empty-state p {
    color: #e5e7eb;
    margin-bottom: 1rem;
}

.retry-btn {
    background: linear-gradient(145deg, #ef4444, #dc2626);
    color: #ffffff;
    border: 2px solid #ef4444;
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.stats-bar {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.stat-item {
    text-align: center;
    background: #2a2a2a;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #444444;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 600;
    color: #7c3aed;
}

.stat-label {
    font-size: 0.9rem;
    color: #b3b3b3;
}

.table-container {
    background: #2a2a2a;
    border-radius: 12px;
    border: 1px solid #444444;
    padding: 1rem;
    margin-bottom: 2rem;
    overflow-x: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.table-header {
    background: #7c3aed;
    color: #ffffff;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #6d28d9;
    position: sticky;
    top: 0;
}

.table-row {
    border-bottom: 1px solid #e5e7eb;
}

.table-row:nth-child(even) {
    background: #333333;
}

.table-row:hover {
    background: #404040;
}

.table-cell {
    padding: 0.8rem 1rem;
    color: #e5e5e5;
    border-right: 1px solid #444444;
}

.table-cell:last-child {
    border-right: none;
}

.info-section {
    background: #2a2a2a;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #444444;
}

.info-title {
    font-size: 1.8rem;
    color: #e5e5e5;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-family: 'Times New Roman', serif;
}

.info-content {
    color: #e5e7eb;
    font-family: 'Georgia', serif;
    line-height: 1.6;
}

.info-content ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
}

.info-content li {
    margin-bottom: 0.5rem;
}

.info-content strong {
    color: #c084fc;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 2.2rem;
    }

    .actions-section {
        flex-direction: column;
        align-items: center;
    }

    .stats-bar {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .container {
        padding: 0 1rem;
    }

    .table-container {
        font-size: 0.8rem;
    }

    .table-header,
    .table-cell {
        padding: 0.6rem 0.8rem;
    }
}

/* Teams Section Styles */
.teams-section {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.teams-controls {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.teams-edit-btn {
    margin: 0;
}

.section-title {
    font-size: 2.5rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-family: 'Times New Roman', serif;
}

.legend {
    background: rgba(107, 70, 193, 0.1);
    border: 1px solid rgba(107, 70, 193, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin: 0 auto 2rem auto;
    max-width: 500px;
    text-align: center;
}

.legend p {
    color: #c7d2fe;
    margin: 0;
    font-size: 0.9rem;
    font-style: italic;
}

.teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.team-card {
    background: linear-gradient(145deg, rgba(30, 30, 60, 0.8), rgba(45, 45, 75, 0.8));
    border: 2px solid #6b46c1;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
}

.team-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(107, 70, 193, 0.3);
    border-color: #8b5cf6;
}

.team-title {
    font-size: 1.8rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-family: 'Times New Roman', serif;
}

.team-table-container {
    background: rgba(15, 15, 35, 0.6);
    border-radius: 10px;
    overflow: hidden;
}

.team-table {
    width: 100%;
    border-collapse: collapse;
}

.team-table-header {
    background: linear-gradient(145deg, #4c1d95, #6b46c1);
    color: #ffffff;
    padding: 0.8rem;
    font-weight: 600;
    text-align: left;
    font-size: 0.9rem;
    border-bottom: 2px solid #8b5cf6;
}

.team-table-row {
    transition: background-color 0.2s ease;
}

.team-table-row:nth-child(even) {
    background: rgba(15, 15, 35, 0.3);
}

.team-table-row:hover {
    background: rgba(107, 70, 193, 0.2);
}

.team-table-cell {
    padding: 0.8rem;
    color: #e5e7eb;
    border-bottom: 1px solid rgba(107, 70, 193, 0.2);
    font-size: 0.9rem;
}

.team-stats {
    background: linear-gradient(145deg, #6b46c1, #8b5cf6);
    color: #ffffff;
    padding: 0.8rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
}

.team-count {
    font-family: 'Times New Roman', serif;
}

.empty-team {
    background: rgba(15, 15, 35, 0.6);
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    color: #9ca3af;
    font-style: italic;
}

@media (max-width: 768px) {
    .teams-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .team-card {
        padding: 1rem;
    }
    
    .team-table-header,
    .team-table-cell {
        padding: 0.6rem;
        font-size: 0.8rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .teams-edit-btn {
        font-size: 0.9rem;
        padding: 0.7rem 1.3rem;
    }
}

/* Selection Controls Styles */
.selection-controls {
    background: rgba(107, 70, 193, 0.1);
    border: 1px solid rgba(107, 70, 193, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.selection-info {
    color: #c7d2fe;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-align: center;
}

.selection-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.select-all-btn,
.clear-all-btn {
    background: linear-gradient(145deg, #4c1d95, #6b46c1);
    color: #ffffff;
    border: 1px solid #6b46c1;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.select-all-btn:hover,
.clear-all-btn:hover {
    background: linear-gradient(145deg, #6b46c1, #8b5cf6);
    transform: translateY(-1px);
}

.checkbox-header {
    width: 80px;
    text-align: center;
}

.checkbox-cell {
    text-align: center;
    padding: 0.5rem;
}

.player-checkbox {
    width: 18px;
    height: 18px;
    accent-color: #8b5cf6;
    cursor: pointer;
}

.selected-player {
    background: rgba(139, 92, 246, 0.1) !important;
    border-left: 3px solid #8b5cf6;
}

.status-cell {
    font-weight: 600;
    text-align: center;
}

.status-principal {
    color: #fbbf24;
    font-weight: bold;
}

.status-suplente {
    color: #9ca3af;
    font-style: italic;
}

.selection-count {
    color: #c7d2fe;
    font-size: 0.8rem;
    font-style: italic;
}

/* Drag and Drop Styles */
.team-table-row[draggable="true"] {
    cursor: move;
    transition: all 0.2s ease;
}

.team-table-row[draggable="true"]:hover {
    background: rgba(107, 70, 193, 0.3);
}

.team-table-row[draggable="true"]:active {
    opacity: 0.8;
}

.team-table-row[draggable="false"] {
    cursor: default;
}

.team-table-row.dragging {
    opacity: 0.5;
    transform: scale(0.98);
}

.team-card.drag-over {
    border-color: #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    background: rgba(139, 92, 246, 0.1);
}

.team-card {
    transition: all 0.3s ease;
}

.admin-notice {
    color: #fbbf24;
    margin-top: 0.5rem;
    font-size: 0.8rem;
}

.reset-btn {
    background: linear-gradient(145deg, #dc2626, #ef4444);
    color: #ffffff;
    border: 2px solid #dc2626;
    margin-left: 1rem;
}

.reset-btn:hover {
    background: linear-gradient(145deg, #ef4444, #f87171);
    border-color: #ef4444;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

.teams-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
}

/* Admin Modal Styles */
.admin-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.admin-modal {
    background: linear-gradient(145deg, rgba(30, 30, 60, 0.95), rgba(45, 45, 75, 0.95));
    border: 2px solid #6b46c1;
    border-radius: 15px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9);
}

.admin-modal h3 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-family: 'Times New Roman', serif;
}

.admin-modal p {
    color: #e5e7eb;
    margin-bottom: 1.5rem;
    font-size: 1rem;
}

.admin-password-input {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #6b46c1;
    border-radius: 8px;
    background: rgba(15, 15, 35, 0.8);
    color: #ffffff;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    outline: none;
    transition: border-color 0.3s ease;
}

.admin-password-input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.admin-password-input::placeholder {
    color: #9ca3af;
}

.admin-modal-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.admin-confirm-btn,
.admin-cancel-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Times New Roman', serif;
}

.admin-confirm-btn {
    background: linear-gradient(145deg, #059669, #10b981);
    color: #ffffff;
}

.admin-confirm-btn:hover {
    background: linear-gradient(145deg, #10b981, #34d399);
    transform: translateY(-2px);
}

.admin-cancel-btn {
    background: linear-gradient(145deg, #6b7280, #9ca3af);
    color: #ffffff;
}

.admin-cancel-btn:hover {
    background: linear-gradient(145deg, #9ca3af, #d1d5db);
    transform: translateY(-2px);
}

.admin-error {
    color: #ef4444;
    font-size: 0.9rem;
    margin-top: 1rem;
    font-weight: 600;
}

/* Watermark - Guild Logo Background */
.boss-list-container::before {
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

.admin-btn.admin-active {
    background: #10b981;
    border-color: #10b981;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 768px) {
  .boss-list-container::before {
    background-size: 60%;
  }
}
</style>
