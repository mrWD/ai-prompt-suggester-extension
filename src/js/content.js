// Initialize services and utilities
window.promptService = new PromptService();
window.chatInputUtils = new ChatInputUtils();
window.modal = new Modal();
window.suggestionButton = new SuggestionButton();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'applyPrompt') {
    window.chatInputUtils.applyPromptToChat(message.prompt);
  }
});

// Initialize the extension
function initialize() {
  window.modal.create();

  const config = PlatformUtils.getObserverConfig();
  const observer = new MutationObserver((mutations) => {
    const targetElement = PlatformUtils.getTargetElement();
    if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      window.suggestionButton.create();
    }
  });

  // Start observing the document body for changes
  observer.observe(document.body, config);

  // Initial check
  const targetElement = PlatformUtils.getTargetElement();
  if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
    window.suggestionButton.create();
  }
}

// Start the extension
initialize();