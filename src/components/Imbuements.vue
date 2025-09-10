<template>
    <div class="imbuements-container">
        <div class="container">
            <h1 class="page-title">⚔️ Imbuements</h1>
            <p class="page-subtitle">Receitas e materiais necessários para imbuements</p>
            
            <div class="imbuements-grid">
                <div class="imbuement-card">
                    <h3 class="imbuement-title">🩸 Powerful Life Leech</h3>
                    <div class="materials-list">
                        <div class="material-item">
                            <span class="quantity">25x</span>
                            <span class="item-name">Vampire Teeth</span>
                        </div>
                        <div class="material-item">
                            <span class="quantity">15x</span>
                            <span class="item-name">Bloody Pincers</span>
                        </div>
                        <div class="material-item">
                            <span class="quantity">5x</span>
                            <span class="item-name">Piece of Dead Brain</span>
                        </div>
                    </div>
                    <div class="alternative-option">
                        <span class="or-text">OU</span>
                        <div class="gold-token-option">
                            <span class="quantity gold">6x</span>
                            <span class="item-name">Gold Tokens</span>
                        </div>
                    </div>
                </div>

                <div class="imbuement-card">
                    <h3 class="imbuement-title">🌑 Powerful Void</h3>
                    <div class="materials-list">
                        <div class="material-item">
                            <span class="quantity">25x</span>
                            <span class="item-name">Rope Belt</span>
                        </div>
                        <div class="material-item">
                            <span class="quantity">25x</span>
                            <span class="item-name">Silencer Claws</span>
                        </div>
                        <div class="material-item">
                            <span class="quantity">5x</span>
                            <span class="item-name">Some Grimeleech Wings</span>
                        </div>
                    </div>
                    <div class="alternative-option">
                        <span class="or-text">OU</span>
                        <div class="gold-token-option">
                            <span class="quantity gold">6x</span>
                            <span class="item-name">Gold Tokens</span>
                        </div>
                    </div>
                </div>

                <div class="imbuement-card">
                    <h3 class="imbuement-title">⚡ Powerful Strike</h3>
                    <div class="materials-list">
                        <div class="material-item">
                            <span class="quantity">20x</span>
                            <span class="item-name">Protective Charm</span>
                        </div>
                        <div class="material-item">
                            <span class="quantity">25x</span>
                            <span class="item-name">Sabretooth</span>
                        </div>
                        <div class="material-item">
                            <span class="quantity">5x</span>
                            <span class="item-name">Vexclaw Talon</span>
                        </div>
                    </div>
                    <div class="alternative-option">
                        <span class="or-text">OU</span>
                        <div class="gold-token-option">
                            <span class="quantity gold">6x</span>
                            <span class="item-name">Gold Tokens</span>
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

.imbuement-title {
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
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
}
</style>
