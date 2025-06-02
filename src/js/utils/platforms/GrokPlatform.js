// Grok platform handling
class GrokPlatform {
  static getInputElement() {
    return document.querySelector('div textarea') ||
           document.querySelector('textarea[placeholder*="Message"]') ||
           document.querySelector('[contenteditable="true"]');
  }

  static getTargetElement() {
    return Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Think');
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: 'button',
      textContent: 'Think'
    };
  }
}

// Make GrokPlatform available globally
window.GrokPlatform = GrokPlatform;