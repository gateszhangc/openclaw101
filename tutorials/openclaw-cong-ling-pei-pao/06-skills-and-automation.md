---
title: "OpenClaw 从零陪跑 06｜让它开始干活：Skills、ClawHub、Heartbeat、Cron"
series: "OpenClaw 从零陪跑"
episode: 6
role_name: "虾滑"
---

# OpenClaw 从零陪跑 06｜让它开始干活：Skills、ClawHub、Heartbeat、Cron

> “会聊天的 AI 很多，真正像助手的 AI 很少。区别通常不是它会不会说，而是它有没有工具、记不记得上下文、会不会在该出现的时候主动出现。” 

## Chapter Overview

这一篇是整套系列里最像“毕业关”的一篇。

你会搞清楚：

- Skills 到底是什么，和工具实现的关系是什么
- ClawHub 是干什么的，安装 Skills 的主线是什么
- Heartbeat 和 Cron 分别该用在什么场景
- 怎样让你的虾滑开始主动做事，而不是等你每次来问

## Skills 到底是什么

第一次看到 Skills，新手很容易误会成：

“是不是装一个 Skill，它就自动有了某个 API？”

不完全是。

官方文档的说法更准确：

**Skill 是一个带 `SKILL.md` 的说明目录，它本质上是在教助手如何使用工具。**

所以更好的人话理解是：

- 工具像手脚
- Skill 像使用说明书

它不是凭空创造能力，而是把“什么时候用、怎么用、输出成什么样”教给助手。

## Skills 放在哪，谁优先

官方文档里，Skills 有 3 个主要加载位置：

- 内置 Skills
- `~/.openclaw/skills`
- `<workspace>/skills`

优先级是：

**工作区 > 本地共享 > 内置**

这句话的实际意义是：

如果你在当前工作区装了一个同名 Skill，它会覆盖全局共享版本。

对于新手来说，记住一个结论就够：

**第一次安装，优先装到当前工作区。**

这样最不容易把不同项目混在一起。

> **虾滑的话**
>
> 你可以把 Skill 想成“给助手看的操作卡片”。
>
> 不是你装得越多越厉害，而是你装得越合适，它越像你的同事。

## ClawHub 是什么

ClawHub 是 OpenClaw 的公共 Skills 注册表。

你可以把它理解成：

**助手工具箱的应用商店。**

最常见的动作有 3 个：

```bash
clawhub install <skill-slug>
clawhub update --all
clawhub sync --all
```

第一次上手，你只需要记住第一条：

```bash
clawhub install <skill-slug>
```

它默认会把 Skill 装进当前工作目录下的 `./skills`，或者回退到配置好的工作区。

### 一个特别容易被忽略的细节

官方文档提醒得很明确：

**新装的 Skill，安全预期是从新会话开始生效。**

也就是说，你不要一装完就立刻在当前聊天里赌它一定已经完全可见。

最稳的做法是：

1. 安装 Skill
2. 开一个新会话
3. 再测试它

## 第三方 Skills 不要当成天然可信

这一点必须单独拎出来。

官方文档的安全态度很明确：

**把第三方 Skill 当成不受信任代码来看。**

换成人话就是：

- 不要看都不看就装
- 不要把敏感密钥直接写进提示词
- 涉及外部操作和高风险动作时，要优先考虑沙箱和确认机制

所以新手期最好的策略不是“疯狂装”。

而是：

**先装 1 到 2 个你马上会用到的 Skill。**

## Heartbeat 和 Cron，到底怎么分

这两个概念，也是新手最容易混的。

最简单的人话版是：

| 机制 | 你可以把它想成 | 适合做什么 |
| --- | --- | --- |
| Heartbeat | 生物钟 | 周期性巡检、批量看看有没有事 |
| Cron | 定时闹钟 | 精确在某个时间点执行 |

### 用一句话记住

- “隔一会儿看看有没有事” → Heartbeat
- “每天 9 点一定做这件事” → Cron

## Heartbeat：让助手周期性醒一醒

官方文档给 Heartbeat 的定位非常清楚：

它是主会话里的周期性感知机制，默认适合批量检查。

比如：

- 看看收件箱有没有重要邮件
- 看看 2 小时内有没有日程
- 看看某个后台任务有没有完成

Heartbeat 的一个好处是：**它有上下文。**

因为它和主会话连着，所以它不是机械轮询，而是能结合最近发生的事判断“现在值不值得打扰你”。

### 一个很适合新手的 `HEARTBEAT.md` 示例

```md
# Heartbeat checklist

- Check email for urgent messages
- Review calendar for events in next 2 hours
- If a background task finished, summarize results
- If idle for 8+ hours, send a brief check-in
```

官方文档还提醒了一件很关键的事：

**如果 `HEARTBEAT.md` 是空的，或者只有注释，Heartbeat 不会替你神奇地干活。**

## Cron：让它在精确时刻执行

如果你要的是：

- 每天早上 7 点准时报告
- 每周一 9 点发周报
- 20 分钟后提醒我

那就是 Cron，不是 Heartbeat。

官方文档给出的示例非常直白：

```bash
openclaw cron add \
  --name "Morning briefing" \
  --cron "0 7 * * *" \
  --tz "America/New_York" \
  --session isolated \
  --message "Generate today's briefing: weather, calendar, top emails, news summary." \
  --model opus \
  --announce \
  --channel whatsapp \
  --to "+15551234567"
```

如果只是一次性提醒，官方文档也给了 `--at` 的写法：

```bash
openclaw cron add \
  --name "Meeting reminder" \
  --at "20m" \
  --session main \
  --system-event "Reminder: standup meeting starts in 10 minutes." \
  --wake-now \
  --delete-after-run
```

你不需要第一天就把这些参数全背下来。

你只需要知道：

- Heartbeat 更像日常巡逻
- Cron 更像精准闹钟

## 最推荐的新手组合

官方文档其实也在暗示一个最佳组合：

### 用 Heartbeat 做这些

- 收件箱巡检
- 日历提醒
- 背景任务收尾
- 低频但持续的状态观察

### 用 Cron 做这些

- 早报
- 周报
- 一次性提醒
- 必须准点执行的任务

这套组合的核心不是“功能更多”。

而是：

**它让你的助手既不过度吵你，又不会总等你先开口。**

> **虾滑提醒**
>
> 新手最常见的自动化误区有两个：
>
> 一个是“什么都不用自动化”，最后助手永远只是聊天窗口。
>
> 另一个是“什么都自动化”，最后每天被自己的 AI 打扰到烦。

## 什么时候该停下来，不要继续加 Skill

当你开始出现这些信号时，就该收手了：

- 你自己都说不清每个 Skill 是做什么的
- 装完以后从来没实际用过
- 一出问题就不知道是渠道、模型还是 Skill
- 你开始把所有事都交给自动化，但没有设置边界

OpenClaw 真正厉害的地方，不是“无限叠功能”。

而是你能慢慢长出一套适合自己的协作系统。

## Key Takeaways

- Skill 是教助手如何使用工具的说明目录，不是魔法插件
- 新手第一次安装 Skill，优先装到当前工作区，并预期开新会话后再测试
- 第三方 Skill 要按不受信任代码看待
- Heartbeat 适合周期性感知，Cron 适合精确定时
- 最稳的做法不是二选一，而是把 Heartbeat 和 Cron 组合起来

## Today’s Task

今天完成 3 件小事就够了：

1. 去 ClawHub 看一遍当前可用的 Skill 类型
2. 安装一个你真的会用到的 Skill
3. 写一个最小版 `HEARTBEAT.md` 清单

如果你还想再多做一步，就加一个最简单的提醒型 Cron。

## Today’s Achievement

到这一步，你的 OpenClaw 已经不只是“能和你说话”。

它开始具备 3 个真正像助手的特征：

- 有工具
- 有长期规则
- 会在合适的时候主动出现

这也是整套教程最重要的终点。

## Preview

这套系列到这里先跑完了一轮主线。

你下一步最适合做的，不是继续加 20 个配置项，而是回头看：

- 哪一步你最卡
- 哪一步最值
- 哪一步最想继续深入

真正长期可用的 OpenClaw，永远不是一口气堆出来的。

它是慢慢养出来的。

## 官方参考

- [OpenClaw Skills 文档](https://docs.openclaw.ai/zh-CN/tools/skills)
- [OpenClaw ClawHub 文档](https://docs.openclaw.ai/zh-CN/tools/clawhub)
- [OpenClaw 定时任务与心跳对比](https://docs.openclaw.ai/zh-CN/automation/cron-vs-heartbeat)
- [OpenClaw Heartbeat](https://docs.openclaw.ai/zh-CN/gateway/heartbeat)
- [OpenClaw Cron Jobs](https://docs.openclaw.ai/zh-CN/automation/cron-jobs)
