// Le Chat platform handling
class LeChatPlatform {
  static getInputElement() {
    return document.querySelector('textarea[placeholder*="Message"]') ||
           document.querySelector('[contenteditable="true"]');
  }

  static getTargetElement() {
    return document.querySelector('.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0');
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: '.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0'
    };
  }
}

// Make LeChatPlatform available globally
window.LeChatPlatform = LeChatPlatform;