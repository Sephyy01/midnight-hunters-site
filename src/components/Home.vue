<template>
  <div class="home-container">
    <header class="header">
      <div class="container">
        <div class="guild-emblem">⚔️</div>
        <h1 class="guild-title">Midnight Hunters</h1>
        <p class="guild-motto">"Unidos na caçada, fortes na amizade"</p>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <section class="guild-story">
          <h2 class="story-title">📜 Nossa História</h2>
          <p class="story-text">
            Somos uma guilda neutra, formada por um grupo de amigos que joga junto para crescer e se divertir. 
            Nosso foco é ajudar uns aos outros em bosses, quests e hunts, sempre priorizando a cooperação e a amizade. 
            Não gostamos de treta desnecessária, preferimos curtir o jogo de boa e com respeito. 
            Se você quer um lugar tranquilo pra jogar e evoluir com a galera, seja bem-vindo à nossa guilda!
          </p>
        </section>

        <section class="guild-info">
          <h2 class="info-title">🏰 Informações da Guilda</h2>
          
          <div class="info-row">
            <span class="info-label">🏛️ Fundada em:</span>
            <span class="info-value">20 de Março, 2025 no servidor Inabra</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">⚡ Status:</span>
            <span class="info-value status-active">🟢 Ativa e caçando 24/7</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">🚪 Recrutamento:</span>
            <span class="info-value recruitment-open">🟡 Aberto para novas aplicações</span>
          </div>
        </section>

        <section class="activities">
          <h2 class="activities-title">⚔️ O que fazemos</h2>
          
          <div class="activity-list">
            <div class="activity-item">
              <span class="activity-icon">🐉</span>
              <div class="activity-content">
                <strong>Boss Hunts:</strong> Enfrentamos os maiores desafios juntos, sempre em grupo e com estratégia.
              </div>
            </div>
            
            <div class="activity-item">
              <span class="activity-icon">📋</span>
              <div class="activity-content">
                <strong>Quests em Grupo:</strong> Completamos missões cooperativas para evoluir todos juntos.
              </div>
            </div>
            
            <div class="activity-item">
              <span class="activity-icon">💰</span>
              <div class="activity-content">
                <strong>Hunt de EXP:</strong> Sessões de caça para ganhar experiência e loot, sempre dividindo os spoils.
              </div>
            </div>
            
            <div class="activity-item">
              <span class="activity-icon">🛡️</span>
              <div class="activity-content">
                <strong>Ajuda Mútua:</strong> Apoiamos uns aos outros em qualquer situação, PK protection e suporte geral.
              </div>
            </div>
          </div>
        </section>

        <section class="recruitment">
          <h2 class="recruitment-title">🗡️ Quer se juntar aos Caçadores?</h2>
          <p class="recruitment-text">
            Procuramos jogadores que valorizam o espírito de equipe e querem fazer parte de uma comunidade unida. 
            Não importa seu level ou experiência, o que conta é a atitude e o respeito pelos companheiros de guild.
          </p>
          
          <div class="join-section">
            <button class="join-button">
              ⚔️ Aplicar para a Guilda 🏹
            </button>
            <p class="join-note">* Jogadores respeitosos e que curtam jogar em grupo são sempre bem-vindos!</p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #2d1b69 70%, #4c1d95 100%);
  padding: 3rem 0;
  text-align: center;
  position: relative;
  border-bottom: 2px solid #6b46c1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.guild-emblem {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(107, 70, 193, 0.8));
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { filter: drop-shadow(0 0 10px rgba(107, 70, 193, 0.8)); }
  to { filter: drop-shadow(0 0 20px rgba(139, 92, 246, 1)); }
}

.guild-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 3px 3px 0px #000, 0 0 20px rgba(107, 70, 193, 0.8);
  margin: 0 0 1rem 0;
  font-family: 'Times New Roman', serif;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.guild-motto {
  font-size: 1.2rem;
  color: #c084fc;
  font-style: italic;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
}

.main-content {
  background: linear-gradient(to bottom, rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.9));
  min-height: 80vh;
  padding: 3rem 0;
}

.guild-story {
  margin-bottom: 3rem;
  text-align: left;
}

.story-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
}

.story-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #e5e7eb;
  margin: 0;
  text-align: justify;
  font-family: 'Georgia', serif;
  padding-left: 1rem;
  border-left: 3px solid #6b46c1;
  background: rgba(26, 26, 46, 0.3);
  padding: 1.5rem;
  border-radius: 0 10px 10px 0;
}

.guild-info {
  margin-bottom: 3rem;
  text-align: left;
}

.info-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(107, 70, 193, 0.2);
}

.info-label {
  font-size: 1.1rem;
  color: #c084fc;
  font-weight: 600;
  min-width: 180px;
  font-family: 'Times New Roman', serif;
}

.info-value {
  font-size: 1.1rem;
  color: #ffffff;
  font-family: 'Georgia', serif;
}

.status-active {
  color: #10b981;
}

.recruitment-open {
  color: #f59e0b;
}

.activities {
  margin-bottom: 3rem;
  text-align: left;
}

.activities-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
}

.activity-list {
  list-style: none;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(26, 26, 46, 0.2);
  border-radius: 8px;
  border-left: 3px solid #6b46c1;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(107, 70, 193, 0.1);
  border-left-color: #8b5cf6;
  transform: translateX(5px);
}

.activity-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-top: 0.2rem;
  min-width: 2rem;
}

.activity-content {
  font-size: 1rem;
  color: #e5e7eb;
  line-height: 1.6;
  font-family: 'Georgia', serif;
}

.activity-content strong {
  color: #c084fc;
  font-family: 'Times New Roman', serif;
}

.recruitment {
  text-align: left;
}

.recruitment-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Times New Roman', serif;
}

.recruitment-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #e5e7eb;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  padding-left: 1rem;
  border-left: 3px solid #8b5cf6;
  background: rgba(26, 26, 46, 0.3);
  padding: 1.5rem;
  border-radius: 0 10px 10px 0;
}

.join-section {
  text-align: center;
  margin-top: 2rem;
}

.join-button {
  background: linear-gradient(145deg, #6b46c1, #8b5cf6);
  color: #ffffff;
  border: 2px solid #8b5cf6;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  display: block;
  margin: 0 auto 1rem auto;
}

.join-button:hover {
  background: linear-gradient(145deg, #8b5cf6, #a78bfa);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  border-color: #c084fc;
}

.join-note {
  font-size: 0.9rem;
  color: #c084fc;
  font-style: italic;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .guild-title {
    font-size: 2.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .info-label {
    min-width: auto;
    margin-bottom: 0.5rem;
  }
  
  .activity-item {
    flex-direction: column;
    text-align: center;
  }
  
  .activity-icon {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
