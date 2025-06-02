// ChatGPT platform handling
class ChatGPTPlatform {
  static getInputElement() {
    console.log('ChatGPTPlatform.getInputElement', document.querySelector('[contenteditable]'));
    return document.querySelector('[contenteditable]');
  }

  static getTargetElement() {
    const hintButton = document.querySelector('[data-testid="composer-action-system-hint-button"]');
    return hintButton || null;
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: '#system-hint-button'
    };
  }
}

// Make ChatGPTPlatform available globally
window.ChatGPTPlatform = ChatGPTPlatform;