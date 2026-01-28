const base = {
    get() {
        return {
            url : "http://localhost:8080/youxijiaoyixitong/",
            name: "youxijiaoyixitong",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/youxijiaoyixitong/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "校园智能物品交易平台"
        } 
    }
}
export default base
