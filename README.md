# 我的Todo List应用程序

这是一个示例Todo List应用程序，使用Vue.js作为前端框架，Node.js/Express作为后端API，并使用MongoDB作为数据库。

## 功能特点

添加新的todo项
编辑和删除已有的todo项
根据关键字搜索todo项
改变已完成未完成状态
显示到期时间和优先级信息

## 技术栈

1. Vue.js 3
2. Vuex
3. Vue Router
4. Axios
5. Node.js
6. Express.js
7. MongoDB
8. Mongoose

## 如何运行 (!)

​	克隆该项目并进入项目目录：

此外您需要自己重新使用 npm install 安装依赖库文件。

```
git clone https://github.com/IICSC/MyTodo.git
cd your_project
```

​	在终端中进入vue.app目录并安装依赖：

```
cd vue.app
npm install
```

​	在终端中进入server目录并安装依赖：

```
cd ../server
npm install
```

​	启动MongoDB服务：

```
mongod
```

​	在新的终端中打开服务器：

```
cd server
node server.js
```

​	在新的终端中打开客户端：

```
cd ../vue.app
npm run serve
```

打开浏览器并访问“http://localhost:8080/”，即可访问应用程序。

## 学习资源
​	如果您想了解有关这些技术的更多信息，请参阅以下官方文档：

1. Vue.js: https://v3.vuejs.org/

2. Vuex: https://next.vuex.vuejs.org/

3. Vue Router: https://next.router.vuejs.org/

4. Axios: https://axios-http.com/

5. Node.js: https://nodejs.org/en/

6. Express.js: https://expressjs.com/

7. MongoDB: https://www.mongodb.com/

8. Mongoose: https://mongoosejs.com/

   ​	此外，您还可以在以下网站上找到更多Vue.js和Node.js学习资源：

1. Vue Mastery: https://www.vuemastery.com/
2. Scotch.io: https://scotch.io/
3. Node.js Documentation: https://nodejs.org/en/docs/