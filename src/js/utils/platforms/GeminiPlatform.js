// Gemini platform handling
class GeminiPlatform {
  static getInputElement() {
    return document.querySelector('textarea[aria-label="Chat input"]') ||
           document.querySelector('[contenteditable="true"]');
  }

  static getTargetElement() {
    return document.querySelector('toolbox-drawer-item:last-child');
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: 'toolbox-drawer-item:last-child'
    };
  }
}

// Make GeminiPlatform available globally
window.GeminiPlatform = GeminiPlatform;