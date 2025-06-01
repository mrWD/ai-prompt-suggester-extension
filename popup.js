// popup.js
// В будущем здесь будет логика отображения и выбора промптов

let currentPrompts = [];
let selectedPrompt = null;

// Load prompts based on selected language
async function loadPrompts(language) {
  try {
    const response = await fetch(chrome.runtime.getURL(`prompts/${language}.json`));
    currentPrompts = await response.json();
    displayPrompts();
  } catch (error) {
    console.error('Error loading prompts:', error);
  }
}

// Display prompts in the popup
function displayPrompts() {
  const promptList = document.getElementById('promptList');
  promptList.innerHTML = '';

  currentPrompts.forEach((prompt, index) => {
    const promptElement = document.createElement('div');
    promptElement.className = 'prompt-item';

    const categoryElement = document.createElement('div');
    categoryElement.className = 'prompt-category';
    categoryElement.textContent = `${prompt.category} > ${prompt.sub_category || prompt.scenario || prompt.template_name}`;

    const textElement = document.createElement('div');
    textElement.className = 'prompt-text';
    textElement.textContent = prompt.prompt_text || prompt.prompt_template;

    promptElement.appendChild(categoryElement);
    promptElement.appendChild(textElement);

    promptElement.addEventListener('click', () => selectPrompt(prompt));

    promptList.appendChild(promptElement);
  });
}

// Handle prompt selection
function selectPrompt(prompt) {
  selectedPrompt = prompt;
  const customInputs = document.getElementById('customInputs');
  const inputs = customInputs.getElementsByTagName('input');

  // Show custom inputs if the prompt has placeholders
  const hasPlaceholders = (prompt.prompt_text || prompt.prompt_template).includes('[');
  customInputs.style.display = hasPlaceholders ? 'block' : 'none';

  // Update input placeholders based on the prompt
  if (hasPlaceholders) {
    const placeholders = (prompt.prompt_text || prompt.prompt_template).match(/\[(.*?)\]/g) || [];
    placeholders.forEach((placeholder, index) => {
      if (inputs[index]) {
        inputs[index].placeholder = placeholder.slice(1, -1);
        inputs[index].style.display = 'block';
      }
    });

    // Hide unused inputs
    for (let i = placeholders.length; i < inputs.length; i++) {
      inputs[i].style.display = 'none';
    }
  }
}

// Apply the selected prompt to the chat input
async function applyPrompt() {
  if (!selectedPrompt) return;

  let promptText = selectedPrompt.prompt_text || selectedPrompt.prompt_template;
  const inputs = document.getElementById('customInputs').getElementsByTagName('input');

  // Replace placeholders with user input
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].style.display !== 'none') {
      promptText = promptText.replace(/\[.*?\]/, inputs[i].value);
    }
  }

  // Send message to content script
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tab.id, {
    action: 'applyPrompt',
    prompt: promptText
  });
}

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language');
  const applyButton = document.getElementById('applyPrompt');

  // Load prompts for initial language
  loadPrompts(languageSelect.value);

  // Handle language change
  languageSelect.addEventListener('change', () => {
    loadPrompts(languageSelect.value);
  });

  // Handle apply button click
  applyButton.addEventListener('click', applyPrompt);
});