// Platform-specific utilities for handling different chat applications
class PlatformUtils {
  static getTargetElement() {
    const platform = this.getPlatformInput();
    return platform?.getTargetElement() || null;
  }

  static getObserverConfig() {
    const platform = this.getPlatformInput();
    return platform?.getObserverConfig() || {
      childList: true,
      subtree: true
    };
  }

  static getPlatformInput() {
    const url = window.location.href;

    if (url.includes('gemini.google.com')) {
      return window.GeminiPlatform;
    } else if (url.includes('claude.ai')) {
      return window.ClaudePlatform;
    } else if (url.includes('www.perplexity.ai')) {
      return window.PerplexityPlatform;
    } else if (url.includes('grok.com')) {
      return window.GrokPlatform;
    } else if (url.includes('chat.mistral.ai')) {
      return window.MistralPlatform;
    } else if (url.includes('chat.deepseek.com')) {
      return window.DeepSeekPlatform;
    } else if (url.includes('copilot.microsoft.com')) {
      return window.CopilotPlatform;
    } else if (url.includes('chat.qwen.ai')) {
      return window.QwenPlatform;
    } else if (url.includes('lmarena.ai')) {
      return window.LMArenaPlatform;
    } else {
      return window.ChatGPTPlatform;
    }
  }
}

// Make PlatformUtils available globally
window.PlatformUtils = PlatformUtils;