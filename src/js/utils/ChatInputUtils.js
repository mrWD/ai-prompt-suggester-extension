// Utilities for handling chat input across different platforms
class ChatInputUtils {
  applyPromptToChat(prompt) {
    const inputElement = this.getInputElement();
    if (!inputElement) {
      console.log('Could not find chat input element');
      return;
    }

    this.setInputValue(inputElement, prompt);
    this.focusInput(inputElement);
  }

  getInputElement() {
    const url = window.location.href;

    if (url.includes('chat.openai.com') || url.includes('chatgpt.com')) {
      return window.ChatGPTInput.getInputElement();
    }
    if (url.includes('gemini.google.com')) {
      return window.GeminiInput.getInputElement();
    }
    if (url.includes('claude.ai')) {
      return window.ClaudeInput.getInputElement();
    }
    if (url.includes('grok.com')) {
      return window.GrokInput.getInputElement();
    }
    if (url.includes('chat.mistral.ai')) {
      return window.MistralInput.getInputElement();
    }
    if (url.includes('www.perplexity.ai')) {
      return window.PerplexityInput.getInputElement();
    }
    if (url.includes('chat.deepseek.com')) {
      return window.DeepSeekInput.getInputElement();
    }
    if (url.includes('copilot.microsoft.com')) {
      return window.CopilotInput.getInputElement();
    }
    if (url.includes('chat.qwen.ai')) {
      return window.QwenInput.getInputElement();
    }
    if (url.includes('lmarena.ai')) {
      return window.LMArenaInput.getInputElement();
    }
    if (url.includes('chat.lmsys.org')) {
      return window.LeChatInput.getInputElement();
    }

    return null;
  }

  setInputValue(inputElement, prompt) {
    if (inputElement.hasAttribute('contenteditable')) {
      inputElement.innerHTML = prompt;
    } else {
      inputElement.value = prompt;
    }

    // Trigger input event
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
  }

  focusInput(inputElement) {
    inputElement.focus();
  }
}

// Make ChatInputUtils available globally
window.ChatInputUtils = ChatInputUtils;