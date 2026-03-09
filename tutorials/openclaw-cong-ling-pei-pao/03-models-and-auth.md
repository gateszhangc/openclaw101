---
title: "OpenClaw 从零陪跑 03｜给它接上大脑：模型、Provider 和认证"
series: "OpenClaw 从零陪跑"
episode: 3
role_name: "虾滑"
---

# OpenClaw 从零陪跑 03｜给它接上大脑：模型、Provider 和认证

> “很多人以为自己是在配置模型，实际上他同时在碰 3 件事：大脑从哪来、怎么登录、默认让谁值班。只要这 3 件事没分清，OpenClaw 就会看起来特别像玄学。” 

## Chapter Overview

这一篇，你要彻底弄清楚：

- `Provider`、`Model`、`Auth` 各自是什么
- 为什么这 3 个词总被新手混成一团
- 官方文档里为什么会同时出现 Venice 和 Anthropic
- 第一次上手应该怎么选一条最稳的默认路线

## 先把 3 个词翻成人话

如果你只记一遍人话版，基本就不会乱：

| 术语 | 人话解释 | 你可以把它想成 |
| --- | --- | --- |
| Provider | 模型提供商 | 大脑供应商 |
| Model | 具体模型 | 今天值班的脑子 |
| Auth | 认证方式 | 进门钥匙 |

举个完整例子：

- `anthropic` 是 Provider
- `anthropic/claude-opus-4-5` 是 Model
- API Key 或 `setup-token` 是 Auth

所以当你说“我模型配好了”，其实你有可能只是：

- 只拿到了 API Key，但没设默认模型
- 只接了 Provider，但认证过期了
- 只接通了 Dashboard，但根本没有可用模型

这也是为什么很多新手会遇到一种诡异体验：

“页面能打开，但助手不回我。”

本质上，它不是不会说话，而是**根本没有合法的大脑可调用**。

> **虾滑的话**
>
> `Channel` 决定你从哪说话。
>
> `Provider` 决定谁来思考。
>
> 这两个一旦混了，排错会特别痛苦。

## 官方文档为什么会同时提 Venice 和 Anthropic

你如果去看官方文档，会看到两个看起来都很“像主线”的信息：

1. `providers` 首页会重点展示 Venice
2. `getting-started` 和 `Anthropic` 页面又给出了非常直接的 Anthropic 路线

这并不矛盾。

它们表达的是两件事：

- **Venice** 是官方在提供商页重点展示的一条推荐路径
- **Anthropic** 则是官方明确支持、而且对很多用户更容易理解的一条成熟路径

为了降低第一次上手的认知负担，这套教程固定采用：

**Anthropic 作为演示主线。**

原因很简单：

- 官方文档明确写了 Anthropic API Key / `setup-token` 的两条路
- 很多新手对 Claude 生态更熟
- 你跑通之后，再切 Venice 也不会难

换句话说，这不是说别的 Provider 不好，而是**教程主线必须收敛，不然新手会被选项淹没**。

## 第一次上手，推荐怎么选

### 路线 A：Anthropic API Key

适合：

- 你想走最容易理解的一条路
- 你能接受按量付费
- 你希望把认证状态和订阅状态分开管理

最直接的入口是重新跑一次向导：

```bash
openclaw onboard
```

如果你已经有 API Key，也可以按官方文档的方式非交互传入：

```bash
openclaw onboard --anthropic-api-key "$ANTHROPIC_API_KEY"
```

### 路线 B：Claude `setup-token`

适合：

- 你本来就在用 Claude 订阅
- 你希望沿用订阅侧的认证方式

官方文档给的入口是：

```bash
claude setup-token
```

然后在 OpenClaw 里粘贴，或者在 Gateway 主机上完成相关认证流程。

## 这一步到底配完没，怎么查

最直接的检查命令是：

```bash
openclaw models status
```

你可以把它理解成“看当前到底有哪些模型和认证真的能用”。

如果这里状态不对，后面不管你是在 Dashboard、Telegram 还是别的渠道里对话，都不会稳定。

如果你只是想看当前状态，先别急着改。

如果你确认要换默认模型，再去用 `openclaw models` 相关命令，或者更简单一点：**重新跑 `openclaw onboard`，把主线改干净。**

## 新手最稳的思路：只保留一个明确默认模型

很多人上来就想：

- 一个便宜模型
- 一个最强模型
- 一个备用模型
- 一个搜索专用模型

不是不能这样搞。

只是**第一次上手完全没必要**。

新手最稳的策略，是先让系统里只有一个你明确知道能工作的默认模型。这样你一旦出问题，排查范围会小很多。

可以把这条原则记成一句话：

**先有“唯一默认值”，再谈“多模型策略”。**

## 这些报错基本都在说认证

官方文档里跟认证相关的典型问题，翻成人话大概是这些：

### 1. `No API key found for provider "anthropic"`

意思不是“OpenClaw 坏了”。

意思是：这个 Provider 没拿到能用的钥匙。

### 2. 401 / token 失效

通常说明你的认证过期了、撤销了，或者粘贴错了。

### 3. 新智能体拿不到你原来配的密钥

官方文档明确提到：认证是按智能体或配置文件来的，不要想当然地认为“主智能体配过了，别的也会自动继承”。

> **虾滑提醒**
>
> 新手最容易把“页面能打开”误判成“系统已经配置好”。
>
> 实际上，UI 能打开，只说明前门开了。
>
> 能不能思考，要看后面的 Provider 和 Auth。

## 什么时候再去研究 Venice、OpenRouter、Ollama

答案很简单：

**等你已经稳定跑通一条默认主线之后。**

那时候你再去比较：

- 哪个更便宜
- 哪个更强
- 哪个更适合隐私优先
- 哪个更适合本地模型

就不会焦虑。

因为你已经有一个能工作的基准点了。

## Key Takeaways

- `Provider` 是大脑供应商，`Model` 是具体大脑，`Auth` 是认证钥匙
- 页面能打开，不等于模型认证已经配置好
- 官方文档同时展示 Venice 和 Anthropic，但教程主线需要收敛
- 第一次上手最稳的做法，是保留一个明确可用的默认模型

## Today’s Task

做这两件事：

```bash
openclaw models status
openclaw onboard
```

然后确认你能回答这 3 个问题：

1. 我现在用的是哪个 Provider
2. 我当前默认模型是什么
3. 我走的是 API Key 还是 `setup-token`

如果答不上来，就说明这一步还没真正吃透。

## Today’s Achievement

从今天开始，你不再是“凭感觉改 AI 配置”的人了。

你已经能把 Provider、Model、Auth 这 3 层拆开看。

这会让你后面接 Telegram、排查回复问题时，快很多。

## Preview

下一篇我们把“能在浏览器里聊”推进到“能在真实聊天工具里聊”。

主线只接一个渠道：**Telegram**。

因为它是大多数新手第一次接外部渠道时，最省心的一条路。

## 官方参考

- [OpenClaw 模型提供商总览](https://docs.openclaw.ai/zh-CN/providers)
- [Anthropic Provider 文档](https://docs.openclaw.ai/zh-CN/providers/anthropic)
- [OpenClaw CLI models](https://docs.openclaw.ai/zh-CN/cli/models)
- [OpenClaw 入门指南](https://docs.openclaw.ai/zh-CN/start/getting-started)

