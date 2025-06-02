// Mistral input handling
class MistralInput {
  static getInputElement() {
    return document.querySelector('.border-default.ring-offset-background.flex.w-full.rounded-md.px-3.py-2.disabled\\:cursor-not-allowed.disabled\\:opacity-50.transition-all.duration-200.focus-visible\\:ring-none.firefox\\:min-h-16.sm\\:firefox\\:min-h-0.relative.m-0.box-border.h-10.min-h-0.resize-none.border-0.bg-transparent.pl-2.text-base.placeholder\\:text-placeholder.focus-visible\\:ring-0.focus-visible\\:ring-offset-0.focus-visible\\:outline-hidden.focus-visible\\:outline-0.sm\\:text-base') ||
           document.querySelector('textarea[placeholder*="Message"]') ||
           document.querySelector('[contenteditable="true"]');
  }
}

// Make MistralInput available globally
window.MistralInput = MistralInput;