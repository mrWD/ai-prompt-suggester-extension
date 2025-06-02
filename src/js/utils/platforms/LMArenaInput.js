// LM Arena input handling
class LMArenaInput {
  static getInputElement() {
    return document.querySelector('textarea.flex-none.p-2.w-full.max-h-\\[40vh\\].bg-surface-secondary.active\\:outline-none.focus\\:outline-none.box-border.resize-none');
  }
}

// Make LMArenaInput available globally
window.LMArenaInput = LMArenaInput;