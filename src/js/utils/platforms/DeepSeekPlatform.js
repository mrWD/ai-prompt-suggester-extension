// DeepSeek platform handling
class DeepSeekPlatform {
  static getInputElement() {
    return document.querySelector('textarea#chat-input');
  }

  static getTargetElement() {
    const buttons = document.querySelectorAll('.ds-button.ds-button--primary.ds-button--filled.ds-button--rect');
    return buttons[buttons.length - 1];
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: '.ds-button.ds-button--primary.ds-button--filled.ds-button--rect'
    };
  }
}

// Make DeepSeekPlatform available globally
window.DeepSeekPlatform = DeepSeekPlatform;