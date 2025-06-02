// Perplexity platform handling
class PerplexityPlatform {
  static getInputElement() {
    return document.querySelector('textarea#ask-input');
  }

  static getTargetElement() {
    return document.querySelector('.group.relative.isolate.flex.h-fit.focus\\:outline-none');
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: '.bg-background.dark\\:bg-offsetDark.flex.items-center.justify-self-end.rounded-full.col-start-3.row-start-2.-mr-1'
    };
  }
}

// Make PerplexityPlatform available globally
window.PerplexityPlatform = PerplexityPlatform;