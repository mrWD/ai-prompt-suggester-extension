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
        <div style="display: flex; align-items: center; gap: 8px;">
          <button id="support-button" style="
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            padding: 4px 8px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 4px;
          ">❤️ Support</button>
          <button id="close-modal" style="
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 4px 8px;
          ">×</button>
        </div>
      </div>
      <div id="support-links" style="
        display: none;
        background: #f5f5f5;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
      ">
        <h3 style="margin: 0 0 12px 0; font-size: 16px;">Support the Project</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <a href="https://buymeacoffee.com/ipupok" target="_blank" style="
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #333;
            padding: 8px 12px;
            border-radius: 6px;
            background: white;
            transition: background-color 0.2s;
          ">
            <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy Me a Coffee" style="width: 24px; height: 24px; margin-right: 12px;">
            <span style="font-size: 14px;">Buy Me a Coffee</span>
          </a>
          <a href="https://ko-fi.com/ipupok" target="_blank" style="
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #333;
            padding: 8px 12px;
            border-radius: 6px;
            background: white;
            transition: background-color 0.2s;
          ">
            <img src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png" alt="Ko-fi" style="width: 24px; height: 24px; margin-right: 12px;">
            <span style="font-size: 14px;">Support on Ko-fi</span>
          </a>
          <a href="https://www.paypal.com/donate/?hosted_button_id=VBNDB5AHYLGCY" target="_blank" style="
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #333;
            padding: 8px 12px;
            border-radius: 6px;
            background: white;
            transition: background-color 0.2s;
          ">
            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" style="width: 24px; height: 24px; margin-right: 12px;">
            <span style="font-size: 14px;">Donate with PayPal</span>
          </a>
        </div>
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

  // Add support button functionality
  const supportButton = document.getElementById('support-button');
  const supportLinks = document.getElementById('support-links');

  supportButton.addEventListener('click', () => {
    const isVisible = supportLinks.style.display === 'block';
    supportLinks.style.display = isVisible ? 'none' : 'block';
    supportButton.style.color = isVisible ? '#666' : '#007AFF';
  });
}

// Create and inject the suggestion button
function createSuggestionButton() {
  const url = window.location.href;

  if (url.includes('gemini.google.com')) {
    // For Gemini, find the last toolbox-drawer-item
    const lastToolboxItem = document.querySelector('toolbox-drawer-item:last-child');
    if (!lastToolboxItem) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the last toolbox item
    lastToolboxItem.parentElement.insertBefore(button, lastToolboxItem.nextSibling);
  } else if (url.includes('claude.ai')) {
    // For Claude, find the element with the specified class
    const targetElement = document.querySelector('.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0');
    if (!targetElement) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the target element
    targetElement.parentElement.insertBefore(button, targetElement.nextSibling);
  } else if (url.includes('perplexity.ai')) {
    // For Perplexity, find the element with the specified class
    const targetElement = document.querySelector('.bg-background.dark\\:bg-offsetDark.flex.items-center.justify-self-end.rounded-full.col-start-3.row-start-2.-mr-1');
    if (!targetElement) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-right: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button as the first child of the target element
    targetElement.insertBefore(button, targetElement.firstChild);
  } else if (url.includes('grok.com')) {
    // For Grok, find the button with text "Think"
    const thinkButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Think');
    if (!thinkButton) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the Think button
    thinkButton.parentElement.insertBefore(button, thinkButton.nextSibling);
  } else if (url.includes('chat.mistral.ai')) {
    // For Mistral, find the library selection button
    const targetElement = document.querySelector('[data-testid="library-selection-button"]');
    if (!targetElement) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-right: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the library selection button
    targetElement.parentElement.insertBefore(button, targetElement.nextSibling);
  } else if (url.includes('chat.deepseek.com')) {
    // For DeepSeek, find the last matching button
    const buttons = document.querySelectorAll('.ds-button.ds-button--primary.ds-button--filled.ds-button--rect');
    if (!buttons.length) return;
    const targetButton = buttons[buttons.length - 1];

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the last matching button
    targetButton.parentElement.insertBefore(button, targetButton.nextSibling);
  } else if (url.includes('copilot.microsoft.com')) {
    // For Copilot, find the chat mode switcher and its parent's parent
    const chatModeSwitcher = document.querySelector('[data-testid="chat-mode-switcher"]');
    if (!chatModeSwitcher) return;
    const targetElement = chatModeSwitcher.parentElement.parentElement;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the target element
    targetElement.parentElement.insertBefore(button, targetElement.nextSibling);
  } else if (url.includes('chat.qwen.ai')) {
    // For Qwen, find the websearch button
    const targetElement = document.querySelector('.websearch_button');
    if (!targetElement) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the websearch button
    targetElement.parentElement.insertBefore(button, targetElement.nextSibling);
  } else if (url.includes('lmarena.ai')) {
    // For LM Arena, find the button with the specified classes
    const targetElement = document.querySelector('button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none');
    if (!targetElement) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background-color 0.2s;
      color: #666;
    `;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the target element
    targetElement.parentElement.insertBefore(button, targetElement.nextSibling);
  } else {
    // For other platforms, use the existing logic
    const hintButton = document.getElementById('system-hint-button');
    if (!hintButton) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
    `;

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the parent element of the hint button
    hintButton.parentElement.parentElement.insertBefore(button, hintButton.parentElement.nextSibling);
  }
}

// Show the modal
async function showModal() {
  // Check if modal exists, if not create it
  if (!document.getElementById('prompt-suggester-modal')) {
    createModal();
  }

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
      margin-bottom: 8px;
    `;
    textElement.textContent = prompt.prompt_text || prompt.prompt_template;

    // Create input fields container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
      display: none;
      margin-top: 8px;
    `;

    // Get the number of placeholders
    const promptText = prompt.prompt_text || prompt.prompt_template;
    const placeholderCount = (promptText.match(/\{(\d+)\}/g) || []).length;

    // Create input fields
    const inputs = [];
    for (let i = 1; i <= placeholderCount; i++) {
      const inputWrapper = document.createElement('div');
      inputWrapper.style.cssText = `
        margin-bottom: 8px;
      `;

      const label = document.createElement('label');
      label.style.cssText = `
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
      `;
      label.textContent = `Input ${i}`;

      const input = document.createElement('input');
      input.type = 'text';
      input.style.cssText = `
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      `;

      // Add input event listener for live preview
      input.addEventListener('input', () => {
        let previewText = promptText;
        inputs.forEach((input, index) => {
          previewText = previewText.replace(`{${index + 1}}`, input.value || `{${index + 1}}`);
        });
        textElement.textContent = previewText;
      });

      // Prevent click event from bubbling up to promptElement
      input.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      inputWrapper.appendChild(label);
      inputWrapper.appendChild(input);
      inputContainer.appendChild(inputWrapper);
      inputs.push(input);
    }

    // Create apply button
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.style.cssText = `
      display: none;
      width: 100%;
      padding: 8px;
      background-color: #007AFF;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 8px;
    `;

    // Add click handler for the prompt
    promptElement.addEventListener('click', () => {
      // Toggle input fields and apply button
      const isVisible = inputContainer.style.display === 'block';
      inputContainer.style.display = isVisible ? 'none' : 'block';
      applyButton.style.display = isVisible ? 'none' : 'block';

      // Reset input values when hiding
      if (isVisible) {
        inputs.forEach(input => input.value = '');
        textElement.textContent = promptText;
      } else {
        // Focus the first input when showing
        setTimeout(() => inputs[0].focus(), 0);
      }
    });

    // Add keyboard navigation between inputs
    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index > 0) {
            inputs[index - 1].focus();
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          } else {
            applyButton.focus();
          }
        }
      });
    });

    // Add apply button click handler
    applyButton.addEventListener('click', () => {
      let finalPrompt = promptText;
      inputs.forEach((input, index) => {
        finalPrompt = finalPrompt.replace(`{${index + 1}}`, input.value);
      });
      applyPromptToChat(finalPrompt);
      closeModal();
    });

    // Add enter key handler for inputs
    inputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyButton.click();
        }
      });
    });

    promptElement.appendChild(categoryElement);
    promptElement.appendChild(textElement);
    promptElement.appendChild(inputContainer);
    promptElement.appendChild(applyButton);
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
  } else if (url.includes('chat.mistral.ai')) {
    // Mistral
    inputElement = document.querySelector('.border-default.ring-offset-background.flex.w-full.rounded-md.px-3.py-2.disabled\\:cursor-not-allowed.disabled\\:opacity-50.transition-all.duration-200.focus-visible\\:ring-none.firefox\\:min-h-16.sm\\:firefox\\:min-h-0.relative.m-0.box-border.h-10.min-h-0.resize-none.border-0.bg-transparent.pl-2.text-base.placeholder\\:text-placeholder.focus-visible\\:ring-0.focus-visible\\:ring-offset-0.focus-visible\\:outline-hidden.focus-visible\\:outline-0.sm\\:text-base') ||
                  document.querySelector('textarea[placeholder*="Message"]') ||
                  document.querySelector('[contenteditable="true"]');
  } else if (url.includes('perplexity.ai')) {
    // Perplexity
    inputElement = document.querySelector('textarea#ask-input');
  } else if (url.includes('chat.deepseek.com')) {
    // DeepSeek
    inputElement = document.querySelector('textarea#chat-input');
  } else if (url.includes('copilot.microsoft.com')) {
    // Copilot
    inputElement = document.querySelector('textarea#userInput');
  } else if (url.includes('chat.qwen.ai')) {
    // Qwen
    inputElement = document.querySelector('textarea#chat-input');
  } else if (url.includes('lmarena.ai')) {
    // LM Arena
    inputElement = document.querySelector('textarea.flex-none.p-2.w-full.max-h-\\[40vh\\].bg-surface-secondary.active\\:outline-none.focus\\:outline-none.box-border.resize-none');
  } else {
    // For other platforms, use the existing logic
    const hintButton = document.querySelector('#system-hint-button');
    if (!hintButton) return;

    const button = document.createElement('button');
    button.innerHTML = '💡';
    button.title = 'Get Prompt Suggestions';
    button.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      margin-left: 8px;
      position: relative;
    `;

    button.addEventListener('click', () => {
      showModal();
    });

    // Insert button after the parent element of the hint button
    hintButton.parentElement.parentElement.insertBefore(button, hintButton.parentElement.nextSibling);
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

  const url = window.location.href;

  if (url.includes('gemini.google.com')) {
    // For Gemini, watch for toolbox-drawer-item elements
    const observer = new MutationObserver((mutations) => {
      const lastToolboxItem = document.querySelector('toolbox-drawer-item:last-child');
      if (lastToolboxItem && !lastToolboxItem.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const lastToolboxItem = document.querySelector('toolbox-drawer-item:last-child');
    if (lastToolboxItem && !lastToolboxItem.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else if (url.includes('claude.ai')) {
    // For Claude, watch for the target element
    const observer = new MutationObserver((mutations) => {
      const targetElement = document.querySelector('.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0');
      if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const targetElement = document.querySelector('.relative.flex-1.flex.items-center.gap-2.shrink.min-w-0');
    if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else if (url.includes('perplexity.ai')) {
    // For Perplexity, watch for the target element
    const observer = new MutationObserver((mutations) => {
      const targetElement = document.querySelector('.bg-background.dark\\:bg-offsetDark.flex.items-center.justify-self-end.rounded-full.col-start-3.row-start-2.-mr-1');
      if (targetElement && !targetElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const targetElement = document.querySelector('.bg-background.dark\\:bg-offsetDark.flex.items-center.justify-self-end.rounded-full.col-start-3.row-start-2.-mr-1');
    if (targetElement && !targetElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else if (url.includes('grok.com')) {
    // For Grok, watch for the Think button
    const observer = new MutationObserver((mutations) => {
      const thinkButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Think');
      if (thinkButton && !thinkButton.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const thinkButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Think');
    if (thinkButton && !thinkButton.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else if (url.includes('chat.mistral.ai')) {
    // For Mistral, watch for the library selection button
    const observer = new MutationObserver((mutations) => {
      const targetElement = document.querySelector('[data-testid="library-selection-button"]');
      if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const targetElement = document.querySelector('[data-testid="library-selection-button"]');
    if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else if (url.includes('chat.deepseek.com')) {
    // For DeepSeek, watch for the last matching button
    const observer = new MutationObserver((mutations) => {
      const buttons = document.querySelectorAll('.ds-button.ds-button--primary.ds-button--filled.ds-button--rect');
      if (buttons.length) {
        const targetButton = buttons[buttons.length - 1];
        if (targetButton && !targetButton.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
          createSuggestionButton();
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    // Initial check
    const buttons = document.querySelectorAll('.ds-button.ds-button--primary.ds-button--filled.ds-button--rect');
    if (buttons.length) {
      const targetButton = buttons[buttons.length - 1];
      if (targetButton && !targetButton.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    }
  } else if (url.includes('copilot.microsoft.com')) {
    // For Copilot, watch for the chat mode switcher
    const observer = new MutationObserver((mutations) => {
      const chatModeSwitcher = document.querySelector('[data-testid="chat-mode-switcher"]');
      if (chatModeSwitcher) {
        const targetElement = chatModeSwitcher.parentElement.parentElement;
        if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
          createSuggestionButton();
        }
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const chatModeSwitcher = document.querySelector('[data-testid="chat-mode-switcher"]');
    if (chatModeSwitcher) {
      const targetElement = chatModeSwitcher.parentElement.parentElement;
      if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    }
  } else if (url.includes('chat.qwen.ai')) {
    // For Qwen, watch for the websearch button
    const observer = new MutationObserver((mutations) => {
      const targetElement = document.querySelector('.websearch_button');
      if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const targetElement = document.querySelector('.websearch_button');
    if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else if (url.includes('lmarena.ai')) {
    // For LM Arena, watch for the target button
    const observer = new MutationObserver((mutations) => {
      const targetElement = document.querySelector('button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none');
      if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
        createSuggestionButton();
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    const targetElement = document.querySelector('button.flex.items-center.justify-between.whitespace-nowrap.border.border-border.rounded-md.px-3.py-2.text-header-secondary.hover\\:text-header-primary.data-\\[state\\=open\\]\\:text-text-tertiary.transition-colors.text-sm.font-sans.font-medium.ring-offset-background.placeholder\\:text-muted-foreground.focus\\:outline-none.focus\\:ring-1.focus\\:ring-ring.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.group.w-auto.max-w-max.border-none.bg-transparent.pl-2.pr-1.h-8.shadow-none');
    if (targetElement && !targetElement.parentElement.querySelector('button[title="Get Prompt Suggestions"]')) {
      createSuggestionButton();
    }
  } else {
    // For other platforms, use the existing logic
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
}

// Start the extension
initialize();