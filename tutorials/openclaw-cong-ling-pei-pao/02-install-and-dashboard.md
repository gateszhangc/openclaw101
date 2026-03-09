---
title: "OpenClaw 从零陪跑 02｜先把它跑起来：安装、onboard、Dashboard、Gateway"
series: "OpenClaw 从零陪跑"
episode: 2
role_name: "虾滑"
---

# OpenClaw 从零陪跑 02｜先把它跑起来：安装、onboard、Dashboard、Gateway

> “第一次上手 OpenClaw，别把目标定成‘全部配完’。今天只做一件事：让它真的跑起来，然后在浏览器里跟你说上第一句话。” 

## Chapter Overview

今天这篇只解决一件事：**从零跑通第一次对话**。

你会完成这些步骤：

- 选一个最省脑子的运行环境
- 安装 CLI
- 跑一遍 `openclaw onboard --install-daemon`
- 检查 Gateway 是否在后台正常工作
- 打开 Dashboard，完成第一次聊天

## 先决定：它今天住哪

如果你只是第一次体验，**最省事的路线是先在你当前的电脑上跑通**。

如果你一开始就想要 24 小时在线，再考虑 Ubuntu 服务器。

| 运行方式 | 适合谁 | 优点 | 缺点 |
| --- | --- | --- | --- |
| 当前电脑 | 想先跑通的人 | 最快，阻力最低 | 电脑关机就下线 |
| 家里常开设备 | 有 Mac mini / 旧笔记本的人 | 不额外花钱 | 需要自己维护常开 |
| 云服务器 | 一开始就想长期用的人 | 真正 24 小时在线 | 初期心智负担更高 |

如果你是 Windows 用户，官方文档的态度非常明确：

**优先用 WSL2，不要直接在原生 Windows 上折腾。**

> **虾滑提醒**
>
> “先在本机跑通，再迁移到云服务器”几乎总是最省时间的。
>
> 你现在最需要的不是完美部署，而是第一次成功。

## 第一步：安装 CLI

官方推荐的安装方式是：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

如果你是 Windows PowerShell：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

安装结束后，不用急着到处翻配置文件。下一步直接跑向导。

## 第二步：运行 onboarding 向导

```bash
openclaw onboard --install-daemon
```

这一步很关键，因为它不是单纯问你几个问题，而是在帮你一次性完成这几件事：

- 选择本地还是远程 Gateway
- 配模型和认证
- 选择是否接入渠道
- 安装后台服务
- 生成 Gateway 令牌
- 初始化工作区和基础文件

### 新手建议怎么选

如果你今天只是为了**先跑通第一次对话**，可以这样选：

1. `Gateway` 选本地
2. 运行时选 `Node`
3. 先把模型和认证配好
4. 渠道可以暂时跳过，下一篇再接 Telegram
5. 后台服务选安装

官方文档特别提醒了一件事：

**WhatsApp 和 Telegram 后面都更适合跑在 Node 上，不建议用 Bun。**

## 第三步：确认 Gateway 真在跑

向导结束以后，不要靠感觉判断成功。

直接用命令看：

```bash
openclaw gateway status
openclaw status
openclaw health
openclaw security audit --deep
```

你可以把它们理解成四层检查：

- `openclaw gateway status`：后台服务是不是活着
- `openclaw status`：整体状态有没有明显异常
- `openclaw health`：模型认证等关键依赖是不是可用
- `openclaw security audit --deep`：有没有明显的安全配置问题

如果 `openclaw health` 明确告诉你“认证没配置好”，那不是小问题。

因为 **没有模型认证，助手就算在线，也回不了你。**

## 第四步：打开 Dashboard

最省事的第一聊方式，不是 Telegram，也不是 WhatsApp。

官方文档写得很直接：

**最快的第一次聊天，是先用 Dashboard。**

```bash
openclaw dashboard
```

如果一切正常，它会打开浏览器里的 Control UI。

这就是你和 OpenClaw 说上第一句话的地方。

### 成功应该长什么样

你不需要猜。

成功的标志很具体：

1. Dashboard 能正常打开
2. 页面能连上本地 Gateway
3. 你发出一句话后，助手能正常回复

可以先试 3 句最简单的：

- “你是谁？”
- “用三句话介绍一下你现在能做什么。”
- “以后你应该怎么称呼我比较合适？”

## 如果打不开，先查这几件事

### 1. Dashboard 提示 `unauthorized` 或 WebSocket `1008`

大概率是 Gateway 令牌的问题。

官方建议的最省事做法是：**重新运行 `openclaw dashboard`**，让它用正确方式打开带令牌的入口；或者按文档把 `gateway.auth.token` 填回 UI。

### 2. 向导结束了，但 `gateway status` 没起来

先看是不是后台服务没装成功，或者你在不支持的环境里跑。

如果是 Windows，优先回到 WSL2。

### 3. 你用的是 Bun

后面你一接 Telegram 或 WhatsApp，很容易踩坑。

别省这一步，直接换回 Node。

### 4. 你一开始就选了远程模式

要记住：**凭证、工作区、配置文件都在远程主机上。**

这意味着很多“我本地明明配过了”的直觉，在远程模式下都不成立。

> **虾滑的话**
>
> 第一次跑通时，最容易犯的错叫“配置过度”。
>
> 你本来只需要一句“你好”，结果转头开始折腾远程访问、公开地址、群组机器人、自动化。
>
> 这就是新手最常见的绕路方式。

## 今天的主线为什么先不接 Telegram

因为你今天的目标不是“把所有入口都打通”。

你今天的目标是：

**把 OpenClaw 从安装状态，推进到“已经能正常聊天”的状态。**

一旦 Dashboard 聊通了，你后面接 Telegram 时，排错会简单很多。

因为那时你知道：

- Gateway 是好的
- 模型认证是好的
- 真正新增的变量只剩“渠道配置”

这就是为什么我们要把学习路径拆开。

## Key Takeaways

- 新手最省脑子的第一步，是先在当前电脑上跑通 Dashboard
- 官方推荐主线是 `curl ... | bash` + `openclaw onboard --install-daemon`
- 第一次聊天最快的方法是 `openclaw dashboard`，不需要先接渠道
- 判断成功不要靠感觉，要看 `gateway status`、`status`、`health`

## Today’s Task

把下面这套命令真的跑一遍：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
openclaw gateway status
openclaw status
openclaw health
openclaw dashboard
```

如果你已经跑过，就把结果记下来：

- 哪一步一次成功
- 哪一步最卡
- 打开 Dashboard 以后你发出的第一句话是什么

## Today’s Achievement

只要你已经在 Dashboard 里收到了第一条回复，你今天就不是“在看教程”了。

你已经完成了第一次真正意义上的上手。

## Preview

下一篇我们不继续加功能，而是把一件特别容易混淆的事讲透：

**Provider、Model、Auth 到底各自是什么。**

也就是：谁在思考、你怎么认证、默认模型该怎么选。

## 官方参考

- [OpenClaw 入门指南](https://docs.openclaw.ai/zh-CN/start/getting-started)
- [OpenClaw 新手引导](https://docs.openclaw.ai/zh-CN/start/onboarding)
- [OpenClaw Dashboard](https://docs.openclaw.ai/zh-CN/web/dashboard)
- [OpenClaw CLI dashboard](https://docs.openclaw.ai/zh-CN/cli/dashboard)

