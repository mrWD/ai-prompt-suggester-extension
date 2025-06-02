// Copilot platform handling
class CopilotPlatform {
  static getInputElement() {
    return document.querySelector('textarea#userInput');
  }

  static getTargetElement() {
    const chatModeSwitcher = document.querySelector('[data-testid="chat-mode-switcher"]');
    return chatModeSwitcher?.parentElement.parentElement;
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: '[data-testid="chat-mode-switcher"]'
    };
  }
}

// Make CopilotPlatform available globally
window.CopilotPlatform = CopilotPlatform;