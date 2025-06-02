// Grok input handling
class GrokInput {
  static getInputElement() {
    return document.querySelector('div textarea') ||
           document.querySelector('textarea[placeholder*="Message"]') ||
           document.querySelector('[contenteditable="true"]');
  }
}

// Make GrokInput available globally
window.GrokInput = GrokInput;