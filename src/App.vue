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
          <router-link to="/hunted" class="nav-btn" :class="{ active: $route.name === 'Hunted' }">Hunted List</router-link>
          <router-link to="/imbuements" class="nav-btn" :class="{ active: $route.name === 'Imbuements' }">Imbuements</router-link>
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
  background: #333333;
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #444444;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  height: 70px;
}

.nav-container {
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
  gap: 2rem;
  align-items: center;
}

.nav-btn {
  color: #e5e5e5;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  position: relative;
  padding: 0.5rem 0;
}

.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #8b5cf6;
  transition: width 0.3s ease;
}

.nav-btn:hover {
  color: #8b5cf6;
}

.nav-btn:hover::after {
  width: 100%;
}

.nav-btn.active {
  color: #8b5cf6;
}

.nav-btn.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .nav-buttons {
    gap: 1.5rem;
  }
  
  .nav-btn {
    font-size: 0.9rem;
  }
}
</style>
