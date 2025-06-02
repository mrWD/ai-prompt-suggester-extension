// Qwen platform handling
class QwenPlatform {
  static getInputElement() {
    return document.querySelector('textarea#chat-input');
  }

  static getTargetElement() {
    return document.querySelector('.websearch_button');
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: '.websearch_button'
    };
  }
}

// Make QwenPlatform available globally
window.QwenPlatform = QwenPlatform;