<template>
  <div id="app">
    <nav class="fixed-header">
      <div class="nav-container">
        <div class="guild-name">
          ⚔️ Midnight Hunters
        </div>
        <div class="nav-buttons">
          <router-link to="/" class="nav-btn" :class="{ active: $route.name === 'Home' }">Home</router-link>
          <router-link to="/streamers" class="nav-btn" :class="{ active: $route.name === 'Streamers' }">Streamers</router-link>
          <router-link to="/boss-list" class="nav-btn" :class="{ active: $route.name === 'BossList' }">Boss List</router-link>
        </div>
      </div>
    </nav>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* Fixed Header Styles */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(90deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.95));
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #6b46c1;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  height: 70px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.guild-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  font-family: 'Times New Roman', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 1px;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-btn {
  background: linear-gradient(145deg, rgba(107, 70, 193, 0.3), rgba(139, 92, 246, 0.3));
  color: #ffffff;
  border: 1px solid #6b46c1;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Times New Roman', serif;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
}

.nav-btn:hover {
  background: linear-gradient(145deg, #6b46c1, #8b5cf6);
  border-color: #8b5cf6;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.nav-btn.active {
  background: linear-gradient(145deg, #6b46c1, #8b5cf6);
  border-color: #c084fc;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
}

.nav-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .nav-buttons {
    gap: 0.5rem;
  }
  
  .nav-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
