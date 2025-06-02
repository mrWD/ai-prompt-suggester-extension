// Le Chat input handling
class LeChatInput {
  static getInputElement() {
    return document.querySelector('textarea[placeholder*="Message"]') ||
           document.querySelector('[contenteditable="true"]');
  }
}

// Make LeChatInput available globally
window.LeChatInput = LeChatInput;