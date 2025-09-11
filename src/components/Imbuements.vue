<template>
    <div class="imbuements-container">
        <div class="container">
            <h1 class="page-title">⚔️ Imbuements</h1>
            <p class="page-subtitle">Receitas e materiais necessários para imbuements</p>

            <div class="imbuements-grid">
        <div class="imbuement-card">
            <!-- Melhor Opção em Destaque -->
            <div class="best-choice-highlight">
                <div class="best-choice-content">
                    <span class="best-choice-label">🏆 MELHOR OPÇÃO</span>
                    <span class="best-choice-name">6 Gold Tokens</span>
                    <span class="best-choice-price">246k</span>
                </div>
            </div>
            
            <h3 class="imbuement-title">
                <img src="../assets/images/imbuimentos/life/vampirism-3.webp">
                Powerful Life Leech
            </h3>
            <div class="materials-list">
                <div class="material-item">
                    <span class="quantity">25x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/life/vampire-teeth.gif">
                        Vampire Teeth</span>
                    <div class="price-info">
                        <span class="unit-price">1.4k cada</span>
                        <span class="total-price">= 35k total</span>
                    </div>
                </div>
                <div class="material-item">
                    <span class="quantity">15x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/life/bloody-pincers.webp" alt="">
                        Bloody Pincers</span>
                    <div class="price-info">
                        <span class="unit-price">10k cada</span>
                        <span class="total-price">= 150k total</span>
                    </div>
                </div>
                <div class="material-item">
                    <span class="quantity">5x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/life/piece-of-dead-brain.webp">
                        Piece of Dead Brain</span>
                    <div class="price-info">
                        <span class="unit-price">19k cada</span>
                        <span class="total-price">= 95k total</span>
                    </div>
                </div>
            </div>
            <div class="alternative-option">
                <span class="or-text">OU</span>
                <div class="gold-token-option">
                    <span class="quantity gold">6x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/life/gold-token.webp">
                        Gold Tokens</span>
                    <div class="price-info gold">
                        <span class="unit-price">41k cada</span>
                        <span class="total-price">= 246k total</span>
                    </div>
                </div>
            </div>

            <!-- Análise de Cenários -->
            <div class="scenarios-analysis">
                <h4 class="scenarios-title">💰 Análise de Cenários</h4>
                <div class="scenarios-list">
                    <div class="scenario-item best-option">
                        <div class="scenario-header">
                            <span class="scenario-rank">🏆 Melhor</span>
                            <span class="scenario-name">6 Gold Tokens</span>
                            <span class="scenario-price">246k</span>
                        </div>
                        <div class="scenario-details">
                            6 Gold Tokens (cobre todos os materiais)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">2°</span>
                            <span class="scenario-name">4 Gold Tokens + Dead Brain</span>
                            <span class="scenario-price">259k</span>
                            <span class="price-difference">+13k</span>
                        </div>
                        <div class="scenario-details">
                            4 Gold Tokens (25 Vampire + 15 Bloody) + 5 Dead Brain (95k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">3°</span>
                            <span class="scenario-name">Tudo no Market</span>
                            <span class="scenario-price">280k</span>
                            <span class="price-difference">+34k</span>
                        </div>
                        <div class="scenario-details">
                            25 Vampire (35k) + 15 Bloody (150k) + 5 Dead Brain (95k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">4°</span>
                            <span class="scenario-name">2 Gold Tokens + resto</span>
                            <span class="scenario-price">327k</span>
                            <span class="price-difference">+81k</span>
                        </div>
                        <div class="scenario-details">
                            2 Gold Tokens (25 Vampire) + 15 Bloody (150k) + 5 Dead Brain (95k)
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="imbuement-card">
            <!-- Melhor Opção em Destaque -->
            <div class="best-choice-highlight">
                <div class="best-choice-content">
                    <span class="best-choice-label">🏆 MELHOR OPÇÃO</span>
                    <span class="best-choice-name">2 Gold Tokens + resto</span>
                    <span class="best-choice-price">138k</span>
                </div>
            </div>
            
            <h3 class="imbuement-title">
                <img src="../assets/images/imbuimentos/mana/void-3.webp">
                Powerful Void
            </h3>
            <div class="materials-list">
                <div class="material-item">
                    <span class="quantity">25x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/mana/rope-belt.webp" alt="">
                        Rope Belt</span>
                    <div class="price-info">
                        <span class="unit-price">4k cada</span>
                        <span class="total-price">= 100k total</span>
                    </div>
                </div>
                <div class="material-item">
                    <span class="quantity">25x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/mana/silencer-claws.gif">
                        Silencer Claws</span>
                    <div class="price-info">
                        <span class="unit-price">1.8k cada</span>
                        <span class="total-price">= 45k total</span>
                    </div>
                </div>
                <div class="material-item">
                    <span class="quantity">5x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/mana/some-grimeleech-wings.webp" alt="">
                        Some Grimeleech Wings</span>
                    <div class="price-info">
                        <span class="unit-price">2.2k cada</span>
                        <span class="total-price">= 11k total</span>
                    </div>
                </div>
            </div>
            <div class="alternative-option">
                <span class="or-text">OU</span>
                <div class="gold-token-option">
                    <span class="quantity gold">6x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/mana/gold-token.webp">
                        Gold Tokens</span>
                    <div class="price-info gold">
                        <span class="unit-price">41k cada</span>
                        <span class="total-price">= 246k total</span>
                    </div>
                </div>
            </div>

            <!-- Análise de Cenários -->
            <div class="scenarios-analysis">
                <h4 class="scenarios-title">💰 Análise de Cenários</h4>
                <div class="scenarios-list">
                    <div class="scenario-item best-option">
                        <div class="scenario-header">
                            <span class="scenario-rank">🏆 Melhor</span>
                            <span class="scenario-name">2 Gold Tokens + resto</span>
                            <span class="scenario-price">138k</span>
                        </div>
                        <div class="scenario-details">
                            2 Gold Tokens (25 Rope) + 25 Silencer (45k) + 5 Grimeleech (11k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">2°</span>
                            <span class="scenario-name">Tudo no Market</span>
                            <span class="scenario-price">156k</span>
                            <span class="price-difference">+18k</span>
                        </div>
                        <div class="scenario-details">
                            25 Rope Belt (100k) + 25 Silencer (45k) + 5 Grimeleech (11k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">3°</span>
                            <span class="scenario-name">4 Gold Tokens + Grimeleech</span>
                            <span class="scenario-price">175k</span>
                            <span class="price-difference">+37k</span>
                        </div>
                        <div class="scenario-details">
                            4 Gold Tokens (25 Rope + 25 Silencer) + 5 Grimeleech (11k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">4°</span>
                            <span class="scenario-name">6 Gold Tokens</span>
                            <span class="scenario-price">246k</span>
                            <span class="price-difference">+108k</span>
                        </div>
                        <div class="scenario-details">
                            6 Gold Tokens (cobre todos os materiais)
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="imbuement-card">
            <!-- Melhor Opção em Destaque -->
            <div class="best-choice-highlight">
                <div class="best-choice-content">
                    <span class="best-choice-label">🏆 MELHOR OPÇÃO</span>
                    <span class="best-choice-name">4 Gold Tokens + Vexclaw</span>
                    <span class="best-choice-price">171k</span>
                </div>
            </div>
            
            <h3 class="imbuement-title">
                <img src="../assets/images/imbuimentos/critico/strike-3.webp" alt="">
                Powerful Strike
            </h3>
            <div class="materials-list">
                <div class="material-item">
                    <span class="quantity">20x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/critico/protective-charm.webp" alt="">
                        Protective Charm</span>
                    <div class="price-info">
                        <span class="unit-price">2.1k cada</span>
                        <span class="total-price">= 42k total</span>
                    </div>
                </div>
                <div class="material-item">
                    <span class="quantity">25x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/critico/sabretooth.webp" alt="">
                        Sabretooth</span>
                    <div class="price-info">
                        <span class="unit-price">6.6k cada</span>
                        <span class="total-price">= 165k total</span>
                    </div>
                </div>
                <div class="material-item">
                    <span class="quantity">5x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/critico/vexclaw-talon.gif" alt="">
                        Vexclaw Talon</span>
                    <div class="price-info">
                        <span class="unit-price">1.3k cada</span>
                        <span class="total-price">= 6.5k total</span>
                    </div>
                </div>
            </div>
            <div class="alternative-option">
                <span class="or-text">OU</span>
                <div class="gold-token-option">
                    <span class="quantity gold">6x</span>
                    <span class="item-name">
                        <img src="../assets/images/imbuimentos/critico/gold-token.webp" alt="">
                        Gold Tokens</span>
                    <div class="price-info gold">
                        <span class="unit-price">41k cada</span>
                        <span class="total-price">= 246k total</span>
                    </div>
                </div>
            </div>

            <!-- Análise de Cenários -->
            <div class="scenarios-analysis">
                <h4 class="scenarios-title">💰 Análise de Cenários</h4>
                <div class="scenarios-list">
                    <div class="scenario-item best-option">
                        <div class="scenario-header">
                            <span class="scenario-rank">🏆 Melhor</span>
                            <span class="scenario-name">4 Gold Tokens + Vexclaw</span>
                            <span class="scenario-price">171k</span>
                        </div>
                        <div class="scenario-details">
                            4 Gold Tokens (20 Protective + 25 Sabretooth) + 5 Vexclaw (7k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">2°</span>
                            <span class="scenario-name">Tudo no Market</span>
                            <span class="scenario-price">214k</span>
                            <span class="price-difference">+43k</span>
                        </div>
                        <div class="scenario-details">
                            20 Protective (42k) + 25 Sabretooth (165k) + 5 Vexclaw (7k)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">3°</span>
                            <span class="scenario-name">6 Gold Tokens</span>
                            <span class="scenario-price">246k</span>
                            <span class="price-difference">+75k</span>
                        </div>
                        <div class="scenario-details">
                            6 Gold Tokens (cobre todos os materiais)
                        </div>
                    </div>

                    <div class="scenario-item">
                        <div class="scenario-header">
                            <span class="scenario-rank">4°</span>
                            <span class="scenario-name">2 Gold Tokens + resto</span>
                            <span class="scenario-price">254k</span>
                            <span class="price-difference">+83k</span>
                        </div>
                        <div class="scenario-details">
                            2 Gold Tokens (20 Protective) + 25 Sabretooth (165k) + 5 Vexclaw (7k)
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Imbuements'
}
</script>

<style scoped>
.imbuements-container {
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
    color: #c7d2fe;
    text-align: center;
    margin-bottom: 3rem;
    font-family: 'Times New Roman', serif;
}

.imbuements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.imbuement-card {
    background: linear-gradient(145deg, rgba(30, 30, 60, 0.8), rgba(45, 45, 75, 0.8));
    border: 2px solid #6b46c1;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
}

.imbuement-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(107, 70, 193, 0.3);
    border-color: #8b5cf6;
}

/* Destaque da Melhor Opção */
.best-choice-highlight {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.15));
    border: 2px solid #10b981;
    border-radius: 12px;
    padding: 1rem;
    margin: 1.5rem 0;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
    animation: glow 2s infinite alternate;
}

@keyframes glow {
    from { box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2); }
    to { box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4); }
}

.best-choice-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.best-choice-label {
    font-weight: bold;
    color: #10b981;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.best-choice-name {
    color: #ffffff;
    font-weight: 600;
    font-size: 1.1rem;
    flex: 1;
    text-align: center;
}

.best-choice-price {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #ffffff;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}

.imbuement-title {
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
    font-family: 'Times New Roman', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        margin-right: 2rem;
    }
}

.materials-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.material-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(15, 15, 35, 0.6);
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border-left: 4px solid #6b46c1;
    transition: all 0.2s ease;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.material-item:hover {
    background: rgba(15, 15, 35, 0.8);
    border-left-color: #8b5cf6;
}

.quantity {
    font-weight: bold;
    color: #fbbf24;
    font-size: 1.1rem;
    min-width: 50px;
}

.item-name {
    color: #e5e7eb;
    font-size: 1rem;
    flex: 1;
    margin-left: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
        margin-right: 1rem;
    }
}

.price-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
    min-width: 100px;
}

.unit-price {
    color: #c084fc;
    font-size: 0.9rem;
    font-style: italic;
}

.total-price {
    color: #10b981;
    font-weight: bold;
    font-size: 1rem;
}

.price-info.gold .unit-price {
    color: #fbbf24;
}

.price-info.gold .total-price {
    color: #fbbf24;
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

/* Scenarios Analysis Styles */
.scenarios-analysis {
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(107, 70, 193, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(107, 70, 193, 0.3);
}

.scenarios-title {
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: center;
    font-family: 'Times New Roman', serif;
}

.scenarios-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.scenario-item {
    background: rgba(15, 15, 35, 0.6);
    border-radius: 8px;
    padding: 1rem;
    border-left: 4px solid #6b7280;
    transition: all 0.3s ease;
}

.scenario-item:hover {
    background: rgba(15, 15, 35, 0.8);
    transform: translateX(5px);
}

.scenario-item.best-option {
    border-left-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.scenario-item.best-option:hover {
    background: rgba(16, 185, 129, 0.2);
}

.scenario-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.scenario-rank {
    font-weight: bold;
    font-size: 0.9rem;
    min-width: 60px;
}

.best-option .scenario-rank {
    color: #10b981;
}

.scenario-name {
    color: #ffffff;
    font-weight: 600;
    flex: 1;
}

.scenario-price {
    color: #fbbf24;
    font-weight: bold;
    font-size: 1.1rem;
}

.price-difference {
    color: #ef4444;
    font-size: 0.9rem;
    font-style: italic;
}

.scenario-details {
    color: #c084fc;
    font-size: 0.85rem;
    font-style: italic;
    margin-left: 60px;
}

.alternative-option {
    margin-top: 1.5rem;
    border-top: 1px solid rgba(107, 70, 193, 0.3);
    padding-top: 1rem;
}

.or-text {
    display: block;
    text-align: center;
    color: #8b5cf6;
    font-weight: bold;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.gold-token-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(145deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.2));
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border-left: 4px solid #fbbf24;
    border: 2px solid rgba(251, 191, 36, 0.3);
    transition: all 0.2s ease;
}

.gold-token-option:hover {
    background: linear-gradient(145deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.3));
    border-color: #fbbf24;
}

/* Watermark - Guild Logo Background */
.imbuements-container::before {
  content: 'Midnight Hunters ⚔️';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 4rem;
  font-weight: bold;
  color: rgba(139, 92, 246, 0.08);
  z-index: -1;
  pointer-events: none;
  white-space: nowrap;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.quantity.gold {
    color: #fbbf24;
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

@media (max-width: 768px) {
    .imbuements-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .imbuement-card {
        padding: 1.5rem;
    }

    .material-item {
        padding: 0.6rem 0.8rem;
    }
    
    .imbuements-container::before {
        font-size: 2.5rem;
        letter-spacing: 2px;
    }
}
</style>
