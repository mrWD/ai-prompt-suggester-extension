// Gemini input handling
class GeminiInput {
  static getInputElement() {
    return document.querySelector('textarea[aria-label="Chat input"]') ||
           document.querySelector('[contenteditable="true"]');
  }
}

// Make GeminiInput available globally
window.GeminiInput = GeminiInput;