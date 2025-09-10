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
                <h1 class="page-title">⚔️ Times Final Ferumbras e GT</h1>
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
                    <div class="loading-spinner">⚔️</div>
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
                        <button @click="toggleEditMode" class="edit-btn teams-edit-btn">
                            <span v-if="editMode">✅</span>
                            <span v-else>✏️</span>
                            {{ editMode ? 'Finalizar Seleção' : 'Selecionar Principais' }}
                        </button>
                    </div>
                    
                    <div class="legend">
                        <p><strong>🔄</strong> Indica que o jogador está disponível para ambos os times</p>
                    </div>
                    
                    <div class="teams-grid">
                        <!-- Time Segunda -->
                        <div class="team-card">
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
                                        <tr v-for="(row, index) in timeSegundaCompactData" :key="index" class="team-table-row" :class="{ 'selected-player': !editMode && isPlayerSelected('segunda', index) }">
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
                        <div class="team-card">
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
                                        <tr v-for="(row, index) in timeTercaCompactData" :key="index" class="team-table-row" :class="{ 'selected-player': !editMode && isPlayerSelected('terca', index) }">
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
                        <div class="team-card">
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
                                        <tr v-for="(row, index) in semTimeFixoCompactData" :key="index" class="team-table-row" :class="{ 'selected-player': !editMode && isPlayerSelected('semTimeFixo', index) }">
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
export default {
    name: 'BossList',
    data() {
        return {
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
            editMode: false
        }
    },
    mounted() {
        this.loadData()
    },
    computed: {
        timeSegundaData() {
            return this.filterByTeam('Segunda')
        },
        timeTercaData() {
            return this.filterByTeam('Terça')
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
            
            // Procura pelas colunas específicas
            const nickIndex = this.headers.findIndex(header => 
                header.toLowerCase().includes('qual seu nickname no jogo') ||
                header.toLowerCase().includes('nickname no jogo') ||
                header.toLowerCase().includes('nick no jogo') ||
                header.toLowerCase().includes('nick') ||
                header.toLowerCase().includes('nome')
            )
            
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
            
            if (nickIndex !== -1) compactHeadersMap.push({ index: nickIndex, name: 'Nick' })
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
            return this.filterByTeam('Sem time fixo')
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
        }
    }
}
</script>

<style scoped>
.boss-list-container {
    background: linear-gradient(to bottom, rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.9));
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
    color: #ffffff;
    text-align: center;
    margin-bottom: 1rem;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
    font-family: 'Times New Roman', serif;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.page-subtitle {
    font-size: 1.2rem;
    color: #c084fc;
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
    background: linear-gradient(145deg, #6b46c1, #8b5cf6);
    color: #ffffff;
    border: 2px solid #8b5cf6;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Times New Roman', serif;
    text-decoration: none;
    display: inline-block;
}

.form-btn {
    background: linear-gradient(145deg, #059669, #10b981);
    color: #ffffff;
    border: 2px solid #10b981;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Times New Roman', serif;
    text-decoration: none;
    display: inline-block;
}

.edit-btn {
    background: linear-gradient(145deg, #f59e0b, #f97316);
    color: #ffffff;
    border: 2px solid #f59e0b;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Times New Roman', serif;
    text-decoration: none;
    display: inline-block;
}

.refresh-btn:hover,
.view-full-btn:hover {
    background: linear-gradient(145deg, #8b5cf6, #a78bfa);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.form-btn:hover {
    background: linear-gradient(145deg, #10b981, #34d399);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.edit-btn:hover {
    background: linear-gradient(145deg, #f97316, #fb923c);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
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
    background: rgba(26, 26, 46, 0.3);
    border-radius: 15px;
    border: 1px solid #6b46c1;
    margin-bottom: 2rem;
}

.loading-spinner {
    font-size: 3rem;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
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
    color: #ffffff;
    font-family: 'Times New Roman', serif;
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
    background: rgba(26, 26, 46, 0.3);
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #6b46c1;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: #8b5cf6;
    font-family: 'Times New Roman', serif;
}

.stat-label {
    font-size: 0.9rem;
    color: #c084fc;
    font-family: 'Georgia', serif;
}

.table-container {
    background: rgba(26, 26, 46, 0.3);
    border-radius: 15px;
    border: 1px solid #6b46c1;
    padding: 1rem;
    margin-bottom: 2rem;
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Georgia', serif;
}

.table-header {
    background: linear-gradient(145deg, #6b46c1, #8b5cf6);
    color: #ffffff;
    padding: 1rem;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #4c1d95;
    font-family: 'Times New Roman', serif;
    position: sticky;
    top: 0;
}

.table-row {
    border-bottom: 1px solid rgba(107, 70, 193, 0.2);
}

.table-row:nth-child(even) {
    background: rgba(107, 70, 193, 0.05);
}

.table-row:hover {
    background: rgba(107, 70, 193, 0.1);
}

.table-cell {
    padding: 0.8rem 1rem;
    color: #e5e7eb;
    border-right: 1px solid rgba(107, 70, 193, 0.1);
}

.table-cell:last-child {
    border-right: none;
}

.info-section {
    background: rgba(26, 26, 46, 0.3);
    border-radius: 15px;
    padding: 2rem;
    border: 1px solid #6b46c1;
}

.info-title {
    font-size: 1.8rem;
    color: #ffffff;
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
</style>
