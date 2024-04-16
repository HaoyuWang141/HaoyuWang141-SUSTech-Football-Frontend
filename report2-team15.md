## CS304 Team Project - SUSTech Football System - Sprint 1 Report

**组员：郭健阳、徐春晖、刘一予、张一舟、袁龙**

### Part I. Architecture & UI Design

#### 1. 框架

我们开发的项目是南科大足球赛事系统小程序，该项目依托于微信小程序和 Java Springboot，以前后端分离的方式实现。

<div style="display:flex; justify-content:center;">
    <img src="docs/sprint1/architecture.drawio.svg" style="width:60%;">
</div>


##### 前端

前端部分采用微信小程序的原生组件及开发工具进行设计。微信小程序前端是基于组件化的开发模式，即每个页面由若干组件组成，且页面功能解耦为页面布局、页面样式和响应逻辑。从项目框架上来看，各页面逻辑上的树状关系体现为项目中个页面文件的树状关系。

我们采用这种设计架构的原因有：

+ **项目定位：**我们的项目面向南科大全体师生，故采用微信小程序的方式能够便于我们目标用户群体的使用。

##### 后端

后端部分采用 Sptringboot 以及 MyBatis Plus 框架进行开发。后端架构采取经典的**三层架构**模式，即分为控制层（Controller layer）、业务逻辑层（Service layer）和持久层（DAO layer）。控制层负责与前端交互并调用相应的业务逻辑进行处理，业务逻辑层负责面向控制层的需求对持久层的接口进行封装调用，持久层负责访问数据库。

我们采用这种设计架构的原因有：

+ **项目定位：**我们的项目面向有限的用户群体（南科大全体师生），数据量较小（仅南科大校内与足球相关的赛事信息），功能类似于一个信息管理系统，其业务逻辑相对稳定且功能具有明显分类和分层。因此，后端的三层架构非常适合我们这样的小体量网页应用。
+ **微服务化：**由于我们项目的业务逻辑相对稳定且功能具有明显分类和分层，我们可以将多个模块根据职责按层分类，以微服务的方式实现不同功能模块，让它们在垂直方向上职责分离，在水平方向上功能类似。这样可以让各模块分工明确，功能紧凑。
+ **有利于并行开发：**由于我们的模块在垂直上职责分离，各模块的功能相对简单且互不影响，有利于并行开发。同时，由于我们的模块在水平上功能类似，各模块功能相对易于拓展和管理，系统具有良好扩展性，有利于维护和应对需求变化。

#### 2. UI 设计

我们的 UI 采用微信原生开发者工具进行开发，其中各页面是按逻辑上的树状结构进行管理的。所有页面类型如下：

+ A 类：【首页】及其页面树
+ B 类：【球员】及其页面树
+ C 类：【管理】及其页面树
+ D 类：【我的】及其页面树
+ Pub 类：【公共页面】（其它类型的页面都可以使用）

当进入并登录小程序后，初始页面为【首页】（A 类），与之平行的是另外三类（B, C, D 类）页面，这四个平行页面可以通过页面底部栏进行切换。下面列出了所有这五类页面页面具体的 UI 设计。

**【首页】及【公共页面】**

首页显示新闻和关注的比赛、球员、赛事。可跳转到搜索页面或关注的比赛、球员、赛事详情。

<div style="display:flex; justify-content:center;">
    <img src="docs/sprint1/UI-home-pub.drawio.svg">
</div>

**【球员】**

球员主页显示用户自己的球员主页。可跳转到自己的教练主页、裁判主页，各主页内可编辑信息。

<div style="display:flex; justify-content:center;">
    <img src="docs/sprint1/UI-player.drawio.svg" style="width:96%;">
</div>
**【管理】**

管理页面显示自己管理的球队、比赛、赛事。可跳转到管理的球队、比赛、赛事详情页面并编辑信息。

<div style="display:flex; justify-content:center;">
    <img src="docs/sprint1/UI-management.drawio.svg" style="width:100%;">
</div>
**【我的】**

我的页面显示用户相关信息（区别于球员主页），根据自己注册的不同身份（例如裁判、教练、管理员等）分类接收通知（例如比赛提醒、入队邀请等）。

<div style="display:flex; justify-content:center;">
    <img src="docs/sprint1/UI-mine.drawio.svg" style="width:13%;">
</div>
### Part II. Process & Collaborations

#### 1. Github Project board

#### 2. Git collaboration

