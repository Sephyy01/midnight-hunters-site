<template>
    <div class="ts3-container">
        <div class="container">
            <h1 class="page-title">🎤 Descrição para TS3</h1>
            <p class="page-subtitle">Gerador de descrições formatadas para o TeamSpeak 3</p>
            
            <!-- Formulário de Inputs -->
            <div class="form-area">
                <div class="input-group">
                    <label for="nomeRL">Nome RL</label>
                    <input 
                        type="text" 
                        id="nomeRL" 
                        v-model="formData.nomeRL"
                        placeholder="Ex: Juan"
                    />
                </div>

                <div class="input-group">
                    <label for="main">Main</label>
                    <input 
                        type="text" 
                        id="main" 
                        v-model="formData.main"
                        placeholder="Ex: Darkness Sephy"
                    />
                </div>

                <div class="input-group">
                    <label for="maker">Maker</label>
                    <input 
                        type="text" 
                        id="maker" 
                        v-model="formData.maker"
                        placeholder="Ex: Elder Satyr"
                    />
                </div>

                <div class="input-group">
                    <label for="indicadoPor">Indicado por</label>
                    <input 
                        type="text" 
                        id="indicadoPor" 
                        v-model="formData.indicadoPor"
                        placeholder="Ex: Alan"
                    />
                </div>

                <div class="input-group">
                    <label for="registradoPor">Registrado por</label>
                    <input 
                        type="text" 
                        id="registradoPor" 
                        v-model="formData.registradoPor"
                        placeholder="Ex: Ederson"
                    />
                </div>

                <button class="generate-button" @click="generateDescription">
                    🎯 Gerar Descrição
                </button>
            </div>

            <!-- Área de Saída -->
            <div class="output-area" v-if="generatedDescription">
                <h3 class="output-title">📋 Descrição Gerada</h3>
                
                <!-- Preview com negrito -->
                <div class="preview-box">
                    <label class="preview-label">Preview:</label>
                    <div class="preview-content" v-html="generatedDescription"></div>
                </div>

                <!-- Input para copiar (com BBCode) -->
                <div class="copy-input-group">
                    <label class="copy-label">Código para copiar (TS3 BBCode):</label>
                    <input 
                        type="text" 
                        class="copy-input" 
                        :value="bbCodeDescription" 
                        readonly
                        @click="selectAll"
                    />
                </div>

                <button class="copy-button" @click="copyDescription">
                    <span v-if="!copied">📋 Copiar Descrição</span>
                    <span v-else">✅ Copiado!</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TS3Description',
    data() {
        return {
            formData: {
                nomeRL: '',
                main: '',
                maker: '',
                indicadoPor: '',
                registradoPor: ''
            },
            generatedDescription: '',
            bbCodeDescription: '',
            copied: false
        }
    },
    methods: {
        generateDescription() {
            const { nomeRL, main, maker, indicadoPor, registradoPor } = this.formData;
            
            if (!nomeRL || !main || !maker || !indicadoPor || !registradoPor) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            this.generatedDescription = `<strong>${nomeRL} - Main: ${main} | Maker: ${maker} | Indicado: ${indicadoPor} | Reg: ${registradoPor}</strong>`;
            this.bbCodeDescription = `[b]${nomeRL} - Main: ${main} | Maker: ${maker} | Indicado: ${indicadoPor} | Reg: ${registradoPor}[/b]`;
        },
        async copyDescription() {
            try {
                await navigator.clipboard.writeText(this.bbCodeDescription);
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 2000);
            } catch (err) {
                console.error('Erro ao copiar:', err);
            }
        },
        selectAll(event) {
            event.target.select();
        }
    }
}
</script>

<style scoped>
.ts3-container {
    background: #1a1a1a;
    min-height: 100vh;
    padding: 2rem 0;
    margin-top: 70px;
}

.container {
    margin: 0 auto;
    padding: 0 2rem;
    max-width: 900px;
}

.page-title {
    font-size: 3rem;
    color: #e5e5e5;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 700;
}

.page-subtitle {
    font-size: 1.2rem;
    color: #b3b3b3;
    text-align: center;
    margin-bottom: 3rem;
}

/* Formulário */
.form-area {
    background: #2a2a2a;
    border: 1px solid #444444;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    margin-bottom: 2rem;
}

.input-group {
    margin-bottom: 1.5rem;
}

.input-group:last-child {
    margin-bottom: 0;
}

.input-group label {
    display: block;
    color: #8b5cf6;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.input-group input {
    width: 100%;
    padding: 0.8rem 1rem;
    background: #333333;
    border: 2px solid #444444;
    border-radius: 8px;
    color: #e5e5e5;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.input-group input:focus {
    outline: none;
    border-color: #8b5cf6;
    background: #3a3a3a;
}

.input-group input::placeholder {
    color: #666666;
}

/* Botão Gerar */
.generate-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    margin-top: 1rem;
}

.generate-button:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.generate-button:active {
    transform: translateY(0);
}

/* Área de Saída */
.output-area {
    background: #2a2a2a;
    border: 1px solid #444444;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.output-title {
    color: #10b981;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
}

/* Preview Box */
.preview-box {
    background: #333333;
    border: 2px solid #10b981;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.preview-label {
    display: block;
    color: #10b981;
    font-weight: 600;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
}

.preview-content {
    color: #e5e5e5;
    font-size: 1.1rem;
    word-break: break-word;
}

/* Input para Copiar */
.copy-input-group {
    margin-bottom: 1.5rem;
}

.copy-label {
    display: block;
    color: #8b5cf6;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.copy-input {
    width: 100%;
    padding: 1rem;
    background: #333333;
    border: 2px solid #8b5cf6;
    border-radius: 8px;
    color: #e5e5e5;
    font-size: 1rem;
    font-family: 'Courier New', monospace;
    cursor: pointer;
}

.copy-input:focus {
    outline: none;
    border-color: #a78bfa;
    background: #3a3a3a;
}

.copy-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.copy-button:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

.copy-button:active {
    transform: translateY(0);
}

/* Watermark - Guild Logo Background */
.ts3-container::before {
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

@media (max-width: 768px) {
    .form-area,
    .output-area {
        padding: 1.5rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .output-content {
        font-size: 1rem;
    }
    
    .ts3-container::before {
        background-size: 60%;
    }
}
</style>
