// Platform-specific utilities for handling different chat applications
class PlatformUtils {
  static getTargetElement() {
    const url = window.location.href;
    let targetElement;

    if (url.includes('gemini.google.com')) {
      targetElement = document.querySelector('toolbox-drawer-item:last-child');
    } else if (url.includes('claude.ai')) {
      targetElement = document.querySelector('.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0');
    } else if (url.includes('www.perplexity.ai')) {
      targetElement = document.querySelector('.group.relative.isolate.flex.h-fit.focus\\:outline-none');
      console.log('targetElement', targetElement);
    } else if (url.includes('grok.com')) {
      targetElement = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Think');
    } else if (url.includes('chat.mistral.ai')) {
      targetElement = document.querySelector('[data-testid="library-selection-button"]');
    } else if (url.includes('chat.deepseek.com')) {
      const buttons = document.querySelectorAll('.ds-button.ds-button--primary.ds-button--filled.ds-button--rect');
      targetElement = buttons[buttons.length - 1];
    } else if (url.includes('copilot.microsoft.com')) {
      const chatModeSwitcher = document.querySelector('[data-testid="chat-mode-switcher"]');
      targetElement = chatModeSwitcher?.parentElement.parentElement;
    } else if (url.includes('chat.qwen.ai')) {
      targetElement = document.querySelector('.websearch_button');
    } else if (url.includes('lmarena.ai')) {
      targetElement = document.querySelector('button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none');
    } else {
      const hintButton = document.querySelector('[data-testid="composer-action-system-hint-button"]');
      if (hintButton) {
        targetElement = hintButton;
      }
    }

    return targetElement;
  }

  static getObserverConfig() {
    const url = window.location.href;
    let config = {
      childList: true,
      subtree: true
    };

    if (url.includes('gemini.google.com')) {
      config.selector = 'toolbox-drawer-item:last-child';
    } else if (url.includes('claude.ai')) {
      config.selector = '.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0';
    } else if (url.includes('www.perplexity.ai')) {
      config.selector = '.bg-background.dark\\:bg-offsetDark.flex.items-center.justify-self-end.rounded-full.col-start-3.row-start-2.-mr-1';
    } else if (url.includes('grok.com')) {
      config.selector = 'button';
      config.textContent = 'Think';
    } else if (url.includes('chat.mistral.ai')) {
      config.selector = '[data-testid="library-selection-button"]';
    } else if (url.includes('chat.deepseek.com')) {
      config.selector = '.ds-button.ds-button--primary.ds-button--filled.ds-button--rect';
    } else if (url.includes('copilot.microsoft.com')) {
      config.selector = '[data-testid="chat-mode-switcher"]';
    } else if (url.includes('chat.qwen.ai')) {
      config.selector = '.websearch_button';
    } else if (url.includes('lmarena.ai')) {
      config.selector = 'button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none';
    } else {
      config.selector = '#system-hint-button';
    }

    return config;
  }
}

// Make PlatformUtils available globally
window.PlatformUtils = PlatformUtils;