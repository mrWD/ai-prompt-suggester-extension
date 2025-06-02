// ChatGPT input handling
class ChatGPTInput {
  static getInputElement() {
    console.log('ChatGPTInput.getInputElement', document.querySelector('[contenteditable]'));
    return document.querySelector('[contenteditable]');
  }
}

// Make ChatGPTInput available globally
window.ChatGPTInput = ChatGPTInput;