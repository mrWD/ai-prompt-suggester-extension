// Utilities for handling chat input across different platforms
class ChatInputUtils {
  applyPromptToChat(prompt) {
    const url = window.location.href;
    let inputElement;

    if (url.includes('chat.openai.com')) {
      // ChatGPT - try multiple selectors to find the input
      inputElement = document.querySelector('textarea[data-id="root"]') ||
                    document.querySelector('textarea[placeholder*="Send a message"]') ||
                    document.querySelector('textarea[placeholder*="Message"]') ||
                    document.querySelector('textarea[placeholder*="Chat"]') ||
                    document.querySelector('[contenteditable="true"]') ||
                    document.querySelector('[contenteditable]');
    } else if (url.includes('gemini.google.com')) {
      // Gemini
      inputElement = document.querySelector('textarea[aria-label="Chat input"]') ||
                    document.querySelector('[contenteditable="true"]');
    } else if (url.includes('claude.ai')) {
      // Claude
      inputElement = document.querySelector('textarea[placeholder*="Message"]') ||
                    document.querySelector('[contenteditable="true"]');
    } else if (url.includes('chat.lmsys.org')) {
      // Le Chat
      inputElement = document.querySelector('textarea[placeholder*="Message"]') ||
                    document.querySelector('[contenteditable="true"]');
    } else if (url.includes('chatgpt.com')) {
      // ChatGPT.com
      inputElement = document.querySelector('textarea[placeholder*="Message"]') ||
                    document.querySelector('[contenteditable="true"]');
    } else if (url.includes('chat.mistral.ai')) {
      // Mistral
      inputElement = document.querySelector('.border-default.ring-offset-background.flex.w-full.rounded-md.px-3.py-2.disabled\\:cursor-not-allowed.disabled\\:opacity-50.transition-all.duration-200.focus-visible\\:ring-none.firefox\\:min-h-16.sm\\:firefox\\:min-h-0.relative.m-0.box-border.h-10.min-h-0.resize-none.border-0.bg-transparent.pl-2.text-base.placeholder\\:text-placeholder.focus-visible\\:ring-0.focus-visible\\:ring-offset-0.focus-visible\\:outline-hidden.focus-visible\\:outline-0.sm\\:text-base') ||
                    document.querySelector('textarea[placeholder*="Message"]') ||
                    document.querySelector('[contenteditable="true"]');
    } else if (url.includes('perplexity.ai')) {
      // Perplexity
      inputElement = document.querySelector('textarea#ask-input');
    } else if (url.includes('chat.deepseek.com')) {
      // DeepSeek
      inputElement = document.querySelector('textarea#chat-input');
    } else if (url.includes('copilot.microsoft.com')) {
      // Copilot
      inputElement = document.querySelector('textarea#userInput');
    } else if (url.includes('chat.qwen.ai')) {
      // Qwen
      inputElement = document.querySelector('textarea#chat-input');
    } else if (url.includes('lmarena.ai')) {
      // LM Arena
      inputElement = document.querySelector('textarea.flex-none.p-2.w-full.max-h-\\[40vh\\].bg-surface-secondary.active\\:outline-none.focus\\:outline-none.box-border.resize-none');
    } else if (url.includes('grok.com')) {
      // Grok
      inputElement = document.querySelector('div textarea') ||
                    document.querySelector('textarea[placeholder*="Message"]') ||
                    document.querySelector('[contenteditable="true"]');
    }

    if (inputElement) {
      if (inputElement.hasAttribute('contenteditable')) {
        // For contenteditable elements, we need to set the innerHTML
        inputElement.innerHTML = prompt;
        // Trigger input event
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        // For textarea elements, set the value
        inputElement.value = prompt;
        // Trigger input event
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Focus the input
      inputElement.focus();
    } else {
      console.log('Could not find chat input element');
    }
  }
}

// Make ChatInputUtils available globally
window.ChatInputUtils = ChatInputUtils;