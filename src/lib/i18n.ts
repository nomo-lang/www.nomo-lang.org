export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function toLocale(value: string | undefined): Locale {
  return value === "zh" ? "zh" : defaultLocale;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/")
    ? "zh"
    : defaultLocale;
}

export function localeHref(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

export const messages = {
  en: {
    meta: {
      title: "Nomo — Small language. Native programs.",
      description:
        "Nomo is a small, explicit programming language that compiles to readable C99 and native programs.",
      ogDescription:
        "A small, explicit programming language for systems tools, CLIs, and small services.",
    },
    skip: "Skip to content",
    home: "Nomo home",
    primaryNavigation: "Primary navigation",
    nav: ["Docs", "Playground", "Ecosystem", "GitHub"],
    switchLanguage: "中文",
    getNomo: "Get Nomo",
    hero: {
      signal: ["01 / LANGUAGE", "EARLY PREVIEW"],
      eyebrow: "A language for the code you need to trust",
      title: ["Small language.", "Native programs."],
      lede:
        "Nomo is a small, explicit programming language for systems tools, CLIs, and small services. It compiles to readable C99, then to a native executable you can inspect.",
      download: "Download the preview",
      playground: "Open playground",
      preview: "preview",
      buildStages: "Build stages",
      output: "output",
      labels: ["Nomo", "Readable C99", "Native"],
      flow: ["Nomo source", "C99", "native executable"],
      factsLabel: "Nomo at a glance",
      facts: [
        ["OUTPUT", "Readable C99"],
        ["FAILURE", "Result, not exceptions"],
        ["DEFAULT", "Immutable values"],
        ["LICENSE", "Apache-2.0"],
      ],
    },
    principles: {
      index: ["02 / PRINCIPLES", "DESIGNED TO STAY LEGIBLE"],
      eyebrow: "Language design",
      title: ["Explicit", "by design."],
      intro:
        "Nomo aims for code that remains understandable from source file to emitted C. Its constraints are part of the product, not temporary omissions.",
      items: [
        [
          "Small before powerful",
          "A compact language surface is easier to learn, audit, and maintain. New features must earn their place.",
        ],
        [
          "Explicit over magic",
          "Control flow, mutation, and failure stay visible. The code should tell you what the program can do.",
        ],
        [
          "No null. No exceptions.",
          "Recoverable failure travels through Result. Programming defects stop through panic instead of hidden unwinding.",
        ],
        [
          "Inspect the whole build",
          "Nomo emits readable C99 before linking, keeping generated code and the native toolchain in reach.",
        ],
      ],
      compilationPath: "Compilation path",
      compilationStages: "Nomo compilation stages",
      stages: ["source", "readable C99", "native"],
      readRfcs: "Read the RFCs",
      toolchain: ["TOOLCHAIN", "ONE COMMAND AWAY"],
      tools: [
        "Stable source formatting",
        "Parse and type-check",
        "Emit C99 and link",
        "Build and execute",
      ],
    },
    download: {
      index: ["03 / DOWNLOAD", "FIRST PUBLIC PREVIEW"],
      published: "Published July 20, 2026",
      title: ["Build something", "you can inspect."],
      current: "CURRENT PREVIEW",
      note:
        "Early software. Expect sharp edges, fast changes, and an evolving standard library.",
      releaseNotes: "Release notes",
      detected: "Detected for this device",
      copied: "Copied",
      copy: "Copy command",
      action: "Download",
      verify: "Verify with SHA256SUMS",
      allAssets: "View all release assets",
      toolchain: "Source builds require a C99 toolchain.",
      platforms: {
        "mac-arm64": ["macOS", "Apple silicon · arm64"],
        "mac-x64": ["macOS", "Intel · x86_64"],
        "linux-x64": ["Linux", "glibc · x86_64"],
        "windows-x64": ["Windows", "x86_64"],
      },
    },
    ecosystem: {
      index: ["04 / ECOSYSTEM", "BUILT IN THE OPEN"],
      title: ["Follow the work.", "Shape what comes next."],
      intro:
        "Nomo grows through executable examples, tests, and small RFCs. The repositories are public before the language is finished.",
      links: [
        ["Language", "Compiler & standard library", "Read the source, follow the roadmap, or open an issue."],
        ["Try it", "Browser playground", "Explore real syntax with instant examples and diagnostics."],
        ["Design", "RFC index", "See the decisions shaping packages, builds, and operations."],
      ],
    },
    footer: {
      tagline: ["A small language for", "inspectable native software."],
      links: ["GitHub", "Contribute", "Security", "License"],
      copyright: "© 2026 Nomo contributors",
    },
  },
  zh: {
    meta: {
      title: "Nomo — 小巧的语言，原生的程序。",
      description: "Nomo 是一门小巧、显式的编程语言，可编译为可读的 C99 与原生程序。",
      ogDescription: "一门面向系统工具、命令行程序和小型服务的小巧、显式的编程语言。",
    },
    skip: "跳到正文",
    home: "Nomo 首页",
    primaryNavigation: "主导航",
    nav: ["文档", "在线体验", "生态", "GitHub"],
    switchLanguage: "EN",
    getNomo: "获取 Nomo",
    hero: {
      signal: ["01 / 语言", "早期预览版"],
      eyebrow: "为值得信任的代码而生",
      title: ["小巧的语言。", "原生的程序。"],
      lede:
        "Nomo 是一门面向系统工具、命令行程序和小型服务的小巧、显式的编程语言。它先生成可读的 C99，再编译为可检查的原生可执行文件。",
      download: "下载预览版",
      playground: "打开在线体验",
      preview: "预览版",
      buildStages: "构建阶段",
      output: "输出",
      labels: ["Nomo", "可读 C99", "原生程序"],
      flow: ["Nomo 源码", "C99", "原生可执行文件"],
      factsLabel: "Nomo 一览",
      facts: [
        ["输出", "可读 C99"],
        ["失败处理", "Result，而非异常"],
        ["默认", "不可变值"],
        ["许可证", "Apache-2.0"],
      ],
    },
    principles: {
      index: ["02 / 原则", "始终清晰可读"],
      eyebrow: "语言设计",
      title: ["显式", "源于设计。"],
      intro:
        "Nomo 希望代码从源文件到生成的 C 都保持易于理解。它的约束是产品的一部分，而不是暂时缺失的功能。",
      items: [
        ["先小巧，再强大", "紧凑的语言表面更容易学习、审计和维护。每项新功能都必须证明自己的价值。"],
        ["显式胜过魔法", "控制流、可变性和失败都保持可见。代码应当直接说明程序能做什么。"],
        ["没有 null，没有异常", "可恢复失败通过 Result 传递；编程缺陷通过 panic 停止，而不是隐藏展开。"],
        ["检查完整构建过程", "Nomo 在链接前生成可读的 C99，让生成代码和原生工具链始终触手可及。"],
      ],
      compilationPath: "编译路径",
      compilationStages: "Nomo 编译阶段",
      stages: ["源码", "可读 C99", "原生程序"],
      readRfcs: "阅读 RFC",
      toolchain: ["工具链", "一条命令即可完成"],
      tools: ["稳定的源码格式化", "解析并进行类型检查", "生成 C99 并链接", "构建并运行"],
    },
    download: {
      index: ["03 / 下载", "首个公开预览版"],
      published: "发布于 2026 年 7 月 20 日",
      title: ["构建一些", "你能检查的东西。"],
      current: "当前预览版",
      note: "这是早期软件，可能存在锋利边缘、快速变化和持续演进的标准库。",
      releaseNotes: "发行说明",
      detected: "已识别为当前设备",
      copied: "已复制",
      copy: "复制命令",
      action: "下载",
      verify: "使用 SHA256SUMS 校验",
      allAssets: "查看全部发行文件",
      toolchain: "从源码构建需要 C99 工具链。",
      platforms: {
        "mac-arm64": ["macOS", "Apple 芯片 · arm64"],
        "mac-x64": ["macOS", "Intel · x86_64"],
        "linux-x64": ["Linux", "glibc · x86_64"],
        "windows-x64": ["Windows", "x86_64"],
      },
    },
    ecosystem: {
      index: ["04 / 生态", "开放构建"],
      title: ["关注开发进展。", "塑造下一步。"],
      intro: "Nomo 通过可执行示例、测试和小型 RFC 成长。语言尚未完成，仓库已经全部公开。",
      links: [
        ["语言", "编译器与标准库", "阅读源码、关注路线图，或提交问题。"],
        ["体验", "浏览器 Playground", "通过即时示例和诊断探索真实语法。"],
        ["设计", "RFC 索引", "了解塑造包、构建和运营方式的设计决策。"],
      ],
    },
    footer: {
      tagline: ["一门面向", "可检查原生软件的小巧语言。"],
      links: ["GitHub", "参与贡献", "安全", "许可证"],
      copyright: "© 2026 Nomo 贡献者",
    },
  },
} as const;
