// Service for loading and managing prompts
class PromptService {
  async loadPrompts(language = 'en') {
    try {
      const response = await fetch(chrome.runtime.getURL(`prompts/${language}.json`));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const prompts = await response.json();
      return prompts;
    } catch (error) {
      console.error('Error loading prompts:', error);
      return [];
    }
  }
}

// Make PromptService available globally
window.PromptService = PromptService;