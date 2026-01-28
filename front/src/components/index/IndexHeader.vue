<template>
    <div class="navbar">
        <div class="title-menu">
            <div class="title-name">校园智能交易平台</div>
        </div>
        <div class="right-menu">
            <div class="user-info">{{this.$storage.get('role')}} {{this.$storage.get('adminName')}}</div>
            <div class="logout" @click="onIndexTap">退出到前台</div>
            <div class="logout" @click="onLogout">退出登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                ruleForm: {},
                user: {}
            };
        },
        mounted() {
            let sessionTable = this.$storage.get("sessionTable")
            if (sessionTable) {
                this.$http({
                    url: sessionTable + '/session',
                    method: "get"
                }).then(({
                             data
                         }) => {
                    if (data && data.code === 0) {
                        this.user = data.data;
                    } else if (data && data.msg) {
                        this.$message.error(data.msg);
                    }
                }).catch(error => {
                    console.error('获取会话信息失败:', error);
                });
            }
        },
        methods: {
            onLogout() {
                let storage = this.$storage
                let router = this.$router
                storage.clear()
                router.replace({
                    name: "login"
                });
            },
            onIndexTap(){
                window.location.href = `${this.$base.indexUrl || '/'}`
            }
        }
    };
</script>


<style lang="scss" scoped>
    .navbar {
        height: 60px;
        line-height: 60px;
        width: 100%;
        padding: 0 34px;
        box-sizing: border-box;
        background-color: #1e1e1e;
        position: relative;
        z-index: 111;
        border-bottom: 1px solid #333;
        transition: all 0.3s ease;

        &:hover {
            background-color: #252525;
        }

        .right-menu {
            position: absolute;
            right: 34px;
            top: 0;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            z-index: 111;
            gap: 20px;

            .user-info {
                font-size: 14px;
                color: #ffffff;
                opacity: 0.9;
                transition: opacity 0.2s ease;

                &:hover {
                    opacity: 1;
                }
            }

            .logout {
                font-size: 14px;
                color: #ffffff;
                opacity: 0.7;
                cursor: pointer;
                padding: 6px 12px;
                border-radius: 6px;
                transition: all 0.2s ease;

                &:hover {
                    opacity: 1;
                    background-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-1px);
                }
            }
        }

        .title-menu {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;

            .title-name {
                font-size: 20px;
                color: #ffffff;
                font-weight: 600;
                letter-spacing: -0.5px;
            }
        }
    }

    @media (max-width: 768px) {
        .navbar {
            padding: 0 16px;

            .title-name {
                font-size: 18px;
            }

            .right-menu {
                right: 16px;
                gap: 10px;

                .user-info, .logout {
                    font-size: 12px;
                }
            }
        }
    }
</style>
