// Claude input handling
class ClaudeInput {
  static getInputElement() {
    return document.querySelector('textarea[placeholder*="Message"]') ||
           document.querySelector('[contenteditable="true"]');
  }
}

// Make ClaudeInput available globally
window.ClaudeInput = ClaudeInput;