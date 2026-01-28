<template>
  <div id="app" class="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
*{
  padding: 0;
  margin:0;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
  background-color: #121212;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
}
#app{
  height:100%;
  background-color: #121212;
}
body {
  padding: 0;
  margin: 0;
  background-color: #121212;
  color: #ffffff;
  transition: all 0.3s ease;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
}

::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 按钮基础样式 */
button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

button:active {
  transform: translateY(0);
}

/* 输入框基础样式 */
input, textarea {
  background-color: #1e1e1e;
  border: 1px solid #333;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* 卡片样式 */
.card {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
</style>
