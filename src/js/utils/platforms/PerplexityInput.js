// Perplexity input handling
class PerplexityInput {
  static getInputElement() {
    return document.querySelector('textarea#ask-input');
  }
}

// Make PerplexityInput available globally
window.PerplexityInput = PerplexityInput;