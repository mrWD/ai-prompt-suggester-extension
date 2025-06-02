// Qwen input handling
class QwenInput {
  static getInputElement() {
    return document.querySelector('textarea#chat-input');
  }
}

// Make QwenInput available globally
window.QwenInput = QwenInput;