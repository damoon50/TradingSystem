<template>
    <div>
        <div class="container loginIn" style="backgroundImage: url(/youxijiaoyixitong/img/back-img-bg.jpg)">

            <div :class="2 == 1 ? 'left' : 2 == 2 ? 'left center' : 'left right'" style="backgroundColor: rgba(255, 255, 255, 0.71)">
                <el-form class="login-form" label-position="left" :label-width="1 == 3 ? '56px' : '0px'">
                    <div class="title-container"><h3 class="title" style="color: rgba(84, 88, 179, 1)">校园智能物品交易平台</h3></div>
                    <el-form-item :label="1 == 3 ? '用户名' : ''" :class="'style'+1">
                        <span v-if="1 != 3" class="svg-container" style="color:rgba(89, 97, 102, 1);line-height:44px"><svg-icon icon-class="user" /></span>
                        <el-input placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username" />
                    </el-form-item>
                    <el-form-item :label="1 == 3 ? '密码' : ''" :class="'style'+1">
                        <span v-if="1 != 3" class="svg-container" style="color:rgba(89, 97, 102, 1);line-height:44px"><svg-icon icon-class="password" /></span>
                        <el-input placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password" />
                    </el-form-item>
                    <el-form-item v-if="0 == '1'" class="code" :label="1 == 3 ? '验证码' : ''" :class="'style'+1">
                        <span v-if="1 != 3" class="svg-container" style="color:rgba(89, 97, 102, 1);line-height:44px"><svg-icon icon-class="code" /></span>
                        <el-input placeholder="请输入验证码" name="code" type="text" v-model="rulesForm.code" />
                        <div class="getCodeBt" @click="getRandCode(4)" style="height:44px;line-height:44px">
                            <span v-for="(item, index) in codes" :key="index" :style="{color:item.color,transform:item.rotate,fontSize:item.size}">{{ item.num }}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="角色" prop="loginInRole" class="role">
                        <el-radio
                                v-for="item in menus"
                                v-if="item.hasBackLogin=='是'"
                                v-bind:key="item.roleName"
                                v-model="rulesForm.role"
                                :label="item.roleName"
                        >{{item.roleName}}</el-radio>
                    </el-form-item>
                    <el-button type="primary" @click="login()" class="loginInBt" style="padding:0;font-size:16px;border-radius:4px;height:44px;line-height:44px;width:100%;backgroundColor:rgba(84, 88, 179, 1); borderColor:rgba(84, 88, 179, 1); color:rgba(255, 255, 255, 1)">{{'1' == '1' ? '登录' : 'login'}}</el-button>
                    <el-form-item class="setting">
            <div class="register" @click="register('yonghu')">用户注册</div>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
</template>
<script>
    import menu from "@/utils/menu";
    export default {
        data() {
            return {
                rulesForm: {
                    username: "",
                    password: "",
                    role: "",
                    code: '',
                },
                menus: [],
                tableName: "",
                codes: [{
                    num: 1,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                },{
                    num: 2,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                },{
                    num: 3,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                },{
                    num: 4,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                }],
            };
        },
        mounted() {
            let menus = menu.list();
            this.menus = menus;
        },
        created() {
            this.setInputColor()
            this.getRandCode()
        },
        methods: {
            setInputColor(){
                this.$nextTick(()=>{
                    document.querySelectorAll('.loginIn .el-input__inner').forEach(el=>{
                        el.style.backgroundColor = "rgba(255, 255, 255, 1)"
                        el.style.color = "rgba(0, 0, 0, 1)"
                        el.style.height = "44px"
                        el.style.lineHeight = "44px"
                        el.style.borderRadius = "2px"
                    })
                    document.querySelectorAll('.loginIn .style3 .el-form-item__label').forEach(el=>{
                        el.style.height = "44px"
                        el.style.lineHeight = "44px"
                    })
                    document.querySelectorAll('.loginIn .el-form-item__label').forEach(el=>{
                        el.style.color = "rgba(89, 97, 102, 1)"
                    })
                    setTimeout(()=>{
                        document.querySelectorAll('.loginIn .role .el-radio__label').forEach(el=>{
                            el.style.color = "rgba(84, 88, 179, 1)"
                        })
                    },350)
                })

            },
            register(tableName){
                this.$storage.set("loginTable", tableName);
                this.$router.push({path:'/register'})
            },
            // 登陆
            login() {
                let code = ''
                for(let i in this.codes) {
                    code += this.codes[i].num
                }
                if ('0' == '1' && !this.rulesForm.code) {
                    this.$message.error("请输入验证码");
                    return;
                }
                if ('0' == '1' && this.rulesForm.code.toLowerCase() != code.toLowerCase()) {
                    this.$message.error("验证码输入有误");
                    this.getRandCode()
                    return;
                }
                if (!this.rulesForm.username) {
                    this.$message.error("请输入用户名");
                    return;
                }
                if (!this.rulesForm.password) {
                    this.$message.error("请输入密码");
                    return;
                }
                if (!this.rulesForm.role) {
                    this.$message.error("请选择角色");
                    return;
                }
                let menus = this.menus;
                for (let i = 0; i < menus.length; i++) {
                    if (menus[i].roleName == this.rulesForm.role) {
                        this.tableName = menus[i].tableName;
                    }
                }
                this.$http({
                    url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
                    method: "post"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$storage.set("Token", data.token);
                        this.$storage.set("userId", data.userId);
                        this.$storage.set("role", this.rulesForm.role);
                        this.$storage.set("sessionTable", this.tableName);
                        this.$storage.set("adminName", this.rulesForm.username);
                        this.$router.replace({ path: "/index/" });
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            getRandCode(len = 4){
                this.randomString(len)
            },
            randomString(len = 4) {
                let chars = [
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                    "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",
                    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
                    "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",
                    "3", "4", "5", "6", "7", "8", "9"
                ]
                let colors = ["0", "1", "2","3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
                let sizes = ['14', '15', '16', '17', '18']

                let output = [];
                for (let i = 0; i < len; i++) {
                    // 随机验证码
                    let key = Math.floor(Math.random()*chars.length)
                    this.codes[i].num = chars[key]
                    // 随机验证码颜色
                    let code = '#'
                    for (let j = 0; j < 6; j++) {
                        let key = Math.floor(Math.random()*colors.length)
                        code += colors[key]
                    }
                    this.codes[i].color = code
                    // 随机验证码方向
                    let rotate = Math.floor(Math.random()*60)
                    let plus = Math.floor(Math.random()*2)
                    if(plus == 1) rotate = '-'+rotate
                    this.codes[i].rotate = 'rotate('+rotate+'deg)'
                    // 随机验证码字体大小
                    let size = Math.floor(Math.random()*sizes.length)
                    this.codes[i].size = sizes[size]+'px'
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #121212 0%, #1e1e1e 100%);
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  min-width: 400px;
  max-width: 480px;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
    border-color: rgba(37, 99, 235, 0.3);
  }
}

.title-container {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.login-form {
  width: 100%;
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
  background: #252525;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  overflow: hidden;

  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
}

.svg-container {
  padding: 0 16px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-input__inner) {
  background: transparent;
  border: none !important;
  color: #ffffff;
  height: 50px;
  line-height: 50px;
  padding: 0;
  font-size: 16px;
  box-shadow: none !important;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
}

.role {
  margin-bottom: 24px;
}

.role-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
}

.role-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

:deep(.el-radio) {
  margin-right: 0;
}

:deep(.el-radio__label) {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 14px;
  transition: color 0.2s ease;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: #2563eb !important;
  background-color: #2563eb !important;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #2563eb !important;
  font-weight: 500;
}

.loginInBt {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #2563eb;
  border: none;
  color: #ffffff;
  transition: all 0.3s ease;
  margin-bottom: 16px;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}

.setting {
  text-align: center;
}

.register {
  color: #2563eb;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
}

.code-wrapper {
  display: flex;
  gap: 12px;
}

.code-wrapper .el-input {
  flex: 1;
}

.getCodeBt {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0 16px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
    min-width: auto;
  }

  .title {
    font-size: 24px;
  }

  .role-options {
    flex-direction: column;
    gap: 8px;
  }

  .login-wrapper {
    padding: 16px;
  }
}
</style>
