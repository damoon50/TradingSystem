<template>
<div class="content">
  <div class="hero-section">
    <h1 class="main-text">欢迎使用 校园智能交易平台</h1>
    <p class="sub-text">校园内物品交易的智能解决方案</p>
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>便捷交易</h3>
        <p>随时随地发布和浏览物品信息</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>安全保障</h3>
        <p>校园内实名交易，安全可靠</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🌱</div>
        <h3>环保节约</h3>
        <p>减少浪费，倡导可持续消费</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import router from '@/router/router-static'
export default {
  mounted(){
    this.init();
  },
  methods:{
    init(){
        if(this.$storage.get('Token')){
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code != 0) {
            router.push({ name: 'login' })
            }
        });
        }else{
            router.push({ name: 'login' })
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  background-color: #121212;
}

.hero-section {
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  text-align: center;
}

.main-text {
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sub-text {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 48px;
  font-weight: 300;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.feature-card {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(37, 99, 235, 0.5);
  }
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .main-text {
    font-size: 36px;
  }
  
  .sub-text {
    font-size: 18px;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .feature-card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .main-text {
    font-size: 28px;
  }
  
  .sub-text {
    font-size: 16px;
  }
}
</style>