# Game-Events-Calendar

通过调用手游官网和 Wiki 的 API，实时获取各大手游活动信息并整理到日历中，助您轻松规划游戏时间。

### DIY 日历组件(基于 Tailwindcss 和 Dayjs 设计)

- 具备日历基本的查看各个年份的日期功能

- 对于日程的显示：

  初步设计成两种界面------简略/详细版

  1. 详细版主要用于 pc 端，网格弹性布局
  2. 可以看到一个个时间条，上面有日程名称，长度对应起始与结束时间，有颜色区分，如果跨行，日程其位置，颜色要一致
  3. 有侧边栏显示具体的活动内容
  4. 简略版有日程的日期上方有一个小点提示
  5. 切换日期，下方显示当天具体日程

- 响应式设计+两种界面切换（次）

- 追加动效（次）

- UI 设计参考+MIUI 的日历

  ![UI](http://dns.huagecloud.top:8097/api/files/1689263227023.png)

  [详细版参考：vue-simple-calendar](https://tallent.us/vue-simple-calendar/)

##### 详细版预览图

![详细版预览图](http://dns.huagecloud.top:8097/api/files/1689761920259.png)

---

##### ~~2023/7/22 计划接入 API 数据和基于日历组件正式进行 Game-Events-Calendar 页面开发~~

### demo 页面

[https://gameevent-frontend.pages.dev/](https://gameevent-frontend.pages.dev/)

------

#### 警告：本项目仅供学习参考使用

本项目的目的是为了提供一个学习资源，展示一些技术实现和编程概念。请注意，这个项目可能包含有关第三方软件、库或服务的代码示例和配置信息。但这些示例代码、配置信息或引用并不意味着本项目的开发者对这些内容的商业版权进行任何声明。

谢谢！