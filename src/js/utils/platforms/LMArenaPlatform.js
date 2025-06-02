// LM Arena platform handling
class LMArenaPlatform {
  static getInputElement() {
    return document.querySelector('textarea.flex-none.p-2.w-full.max-h-\\[40vh\\].bg-surface-secondary.active\\:outline-none.focus\\:outline-none.box-border.resize-none');
  }

  static getTargetElement() {
    return document.querySelector('button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none');
  }

  static getObserverConfig() {
    return {
      childList: true,
      subtree: true,
      selector: 'button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none'
    };
  }
}

// Make LMArenaPlatform available globally
window.LMArenaPlatform = LMArenaPlatform;