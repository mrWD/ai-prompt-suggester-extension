// DeepSeek input handling
class DeepSeekInput {
  static getInputElement() {
    return document.querySelector('textarea#chat-input');
  }
}

// Make DeepSeekInput available globally
window.DeepSeekInput = DeepSeekInput;