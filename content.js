// content.js
// В будущем здесь будет логика внедрения UI и взаимодействия с чатом

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'applyPrompt') {
    applyPromptToChat(message.prompt);
  }
});

// Create and inject the modal HTML
function createModal() {
  const modalHTML = `
    <div id="prompt-suggester-modal" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10000;
      width: 80%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      ">
        <h2 style="margin: 0;">Prompt Suggestions</h2>
        <button id="close-modal" style="
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
        ">×</button>
      </div>
      <div class="language-selector" style="margin-bottom: 16px;">
        <select id="modal-language" style="
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 100%;
        ">
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="ru">Русский</option>
        </select>
      </div>
      <div id="modal-prompt-list" style="
        max-height: 60vh;
        overflow-y: auto;
      "></div>
    </div>
    <div id="modal-overlay" style="
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
    "></div>
  `;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  // Add event listeners
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', closeModal);
  document.getElementById('modal-language').addEventListener('change', async (e) => {
    const prompts = await loadPrompts(e.target.value);
    displayPrompts(prompts);
  });
}

// Create and inject the suggestion button
function createSuggestionButton() {
  const hintButton = document.getElementById('system-hint-button');
  if (!hintButton) return;

  const button = document.createElement('button');
  button.innerHTML = '💡';
  button.style.cssText = `
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    margin-left: 8px;
    position: relative;
  `;

  // // Add tooltip container
  // const tooltip = document.createElement('div');
  // tooltip.style.cssText = `
  //   position: absolute;
  //   bottom: 100%;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   background: #2d2d2d;
  //   color: white;
  //   padding: 8px 12px;
  //   border-radius: 4px;
  //   font-size: 14px;
  //   max-width: 300px;
  //   white-space: normal;
  //   display: none;
  //   z-index: 1000;
  //   box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  // `;
  // button.appendChild(tooltip);

  // // Add hover effects
  // button.addEventListener('mouseover', async () => {
  //   try {
  //     button.style.opacity = '0.8';
  //     // Load prompts and show example in tooltip
  //     const prompts = await loadPrompts();
  //     if (prompts && prompts.length > 0) {
  //       tooltip.textContent = prompts[0].prompt_example;
  //       tooltip.style.display = 'block';
  //     } else {
  //       tooltip.textContent = 'No prompts available';
  //       tooltip.style.display = 'block';
  //     }
  //   } catch (error) {
  //     console.error('Error showing tooltip:', error);
  //     tooltip.textContent = 'Error loading prompts';
  //     tooltip.style.display = 'block';
  //   }
  // });

  // button.addEventListener('mouseout', () => {
  //   button.style.opacity = '1';
  //   tooltip.style.display = 'none';
  // });

  button.addEventListener('click', () => {
    showModal();
  });

  // Insert button after the parent element of the hint button
  hintButton.parentElement.parentElement.insertBefore(button, hintButton.parentElement.nextSibling);
}

// Show the modal
async function showModal() {
  document.getElementById('prompt-suggester-modal').style.display = 'block';
  document.getElementById('modal-overlay').style.display = 'block';
  const prompts = await loadPrompts(document.getElementById('modal-language').value);
  displayPrompts(prompts);
}

// Close the modal
function closeModal() {
  document.getElementById('prompt-suggester-modal').style.display = 'none';
  document.getElementById('modal-overlay').style.display = 'none';
}

// Load prompts for the selected language
async function loadPrompts(language = 'en') {
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

// Display prompts in the modal
function displayPrompts(prompts) {
  const promptList = document.getElementById('modal-prompt-list');
  promptList.innerHTML = '';

  prompts.forEach((prompt) => {
    const promptElement = document.createElement('div');
    promptElement.style.cssText = `
      padding: 12px;
      margin: 8px 0;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    `;
    promptElement.addEventListener('mouseover', () => {
      promptElement.style.backgroundColor = '#f5f5f5';
    });
    promptElement.addEventListener('mouseout', () => {
      promptElement.style.backgroundColor = 'white';
    });

    const categoryElement = document.createElement('div');
    categoryElement.style.cssText = `
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    `;
    categoryElement.textContent = `${prompt.category} > ${prompt.sub_category || prompt.scenario || prompt.template_name}`;

    const textElement = document.createElement('div');
    textElement.style.cssText = `
      font-size: 14px;
      color: #333;
    `;
    textElement.textContent = prompt.prompt_text || prompt.prompt_template;

    promptElement.appendChild(categoryElement);
    promptElement.appendChild(textElement);

    promptElement.addEventListener('click', () => {
      applyPromptToChat(prompt.prompt_text || prompt.prompt_template);
      closeModal();
    });

    promptList.appendChild(promptElement);
  });
}

// Apply the prompt to the chat input
function applyPromptToChat(prompt) {
  // Get the current URL to determine which chat interface we're on
  const url = window.location.href;

  let inputElement;

  if (url.includes('chat.openai.com')) {
    // ChatGPT - try multiple selectors to find the input
    inputElement = document.querySelector('textarea[data-id="root"]') ||
                  document.querySelector('textarea[placeholder*="Send a message"]') ||
                  document.querySelector('textarea[placeholder*="Message"]') ||
                  document.querySelector('textarea[placeholder*="Chat"]') ||
                  document.querySelector('[contenteditable="true"]') ||
                  document.querySelector('[contenteditable]');
  } else if (url.includes('gemini.google.com')) {
    // Gemini
    inputElement = document.querySelector('textarea[aria-label="Chat input"]') ||
                  document.querySelector('[contenteditable="true"]');
  } else if (url.includes('claude.ai')) {
    // Claude
    inputElement = document.querySelector('textarea[placeholder*="Message"]') ||
                  document.querySelector('[contenteditable="true"]');
  } else if (url.includes('chat.lmsys.org')) {
    // Le Chat
    inputElement = document.querySelector('textarea[placeholder*="Message"]') ||
                  document.querySelector('[contenteditable="true"]');
  } else if (url.includes('chatgpt.com')) {
    // ChatGPT.com
    inputElement = document.querySelector('textarea[placeholder*="Message"]') ||
                  document.querySelector('[contenteditable="true"]');
  }

  if (inputElement) {
    if (inputElement.hasAttribute('contenteditable')) {
      // For contenteditable elements, we need to set the innerHTML
      inputElement.innerHTML = prompt;
      // Trigger input event
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      // For textarea elements, set the value
      inputElement.value = prompt;
      // Trigger input event
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Focus the input
    inputElement.focus();
  } else {
    console.log('Could not find chat input element');
  }
}

// Initialize the extension
function initialize() {
  createModal();

  // Create a MutationObserver to watch for the hint button
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const hintButton = node.querySelector('#system-hint-button');
          if (hintButton && !hintButton.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
            createSuggestionButton();
          }
        }
      });
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Check for existing hint button
  const hintButton = document.querySelector('#system-hint-button');
  if (hintButton && !hintButton.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
    createSuggestionButton();
  }
}

// Start the extension
initialize();