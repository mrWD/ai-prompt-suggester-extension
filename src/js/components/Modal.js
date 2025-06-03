// Modal component for displaying prompt suggestions
class Modal {
  constructor() {
    // Inject CSS styles for the modal
    this.injectStyles();

    this.modalHTML = `
      <div id="prompt-suggester-modal" class="modal">
        <div class="modal__header">
          <h2 class="modal__title">Prompt Suggestions</h2>
          <div class="modal__controls">
            <button id="support-button" class="modal__support-button">❤️ Support</button>
            <button id="close-modal" class="modal__close">×</button>
          </div>
        </div>
        <div id="support-links" class="modal__support">
          <h3 class="support__title">Support the Project</h3>
          <div class="support__links">
            <a href="https://buymeacoffee.com/ipupok" target="_blank" class="support__link">
              <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy Me a Coffee" class="support__link-icon">
              <span class="support__link-text">Buy Me a Coffee</span>
            </a>
            <a href="https://ko-fi.com/ipupok" target="_blank" class="support__link">
              <img src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png" alt="Ko-fi" class="support__link-icon">
              <span class="support__link-text">Support on Ko-fi</span>
            </a>
            <a href="https://www.paypal.com/donate/?hosted_button_id=VBNDB5AHYLGCY" target="_blank" class="support__link">
              <img src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png" alt="PayPal" class="support__link-icon">
              <span class="support__link-text">Donate with PayPal</span>
            </a>
          </div>
        </div>
        <div class="modal__language-selector">
          <label class="modal__language-label">Language:</label>
          <select id="modal-language" class="select">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="ru">Русский</option>
            <option value="it">Italiano</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="zh">中文</option>
          </select>
        </div>
        <div id="modal-prompt-list" class="modal__prompt-list">
          <div class="modal__loading" id="modal-loading">
            <div class="modal__loading-spinner"></div>
            <div>Loading prompts...</div>
          </div>
        </div>
        <div class="modal__footer">
          Made with ❤️ by the community • <a href="#" class="modal__footer-link">Report an issue</a>
        </div>
      </div>
      <div id="modal-overlay" class="modal-overlay"></div>
    `;
  }

  injectStyles() {
    // Check if styles are already injected
    if (document.getElementById('prompt-suggester-modal-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'prompt-suggester-modal-styles';
    style.textContent = `
      /* CSS Variables */
      :root {
        --border-radius: 8px;
        --bg-color: #ffffff;
        --text-color: #333333;
        --text-color-secondary: #666666;
        --border-color: #DBE0E5;
        --hover-bg: #f5f5f5;
        --header-bg: #ffffff;
        --support-bg: #f5f5f5;
        --button-bg: #007AFF;
        --button-hover: #0056b3;
        --input-bg: #ffffff;
        --input-text: #333333;
        --placeholder-color: #999999;
        --card-bg: #f6fafe;
        --shadow-light: 0 1px 3px rgba(0, 0, 0, 0.1);
        --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
        --shadow-hover: 0 6px 20px rgba(0, 0, 0, 0.2);
        --transition-smooth: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: #1a1a1a;
          --text-color: #f0f0f0;
          --text-color-secondary: #b0b0b0;
          --border-color: #404040;
          --hover-bg: #2a2a2a;
          --header-bg: #1a1a1a;
          --support-bg: #2a2a2a;
          --button-bg: #0A84FF;
          --button-hover: #0066CC;
          --input-bg: #2a2a2a;
          --input-text: #f0f0f0;
          --placeholder-color: #808080;
          --card-bg: #2a2a2a;
          --shadow-light: 0 1px 3px rgba(0, 0, 0, 0.3);
          --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.4);
          --shadow-hover: 0 6px 20px rgba(0, 0, 0, 0.5);
        }
      }

      /* Base styles for modal elements */
      .modal * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Modal block */
      .modal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-color);
        padding: 32px;
        border-radius: 16px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        width: 90%;
        max-width: 700px;
        max-height: 85vh;
        overflow: hidden;
        color: var(--text-color);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        border: 1px solid var(--border-color);
      }

      .modal::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .modal::-webkit-scrollbar-track {
        background: var(--bg-color);
      }

      .modal::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: var(--border-radius);
      }

      .modal::-webkit-scrollbar-thumb:hover {
        background: var(--text-color-secondary);
      }

      .modal--visible {
        display: block;
        animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -60%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }

      .modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border-color);
      }

      .modal__title {
        margin: 0;
        color: var(--text-color);
        font-size: 1.5em;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .modal__title::before {
        content: "✨";
        font-size: 1.2em;
      }

      .modal__controls {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .modal__support-button {
        background: none;
        border: 2px solid var(--border-color);
        cursor: pointer;
        font-size: 14px;
        padding: 8px 16px;
        color: var(--text-color);
        display: flex;
        align-items: center;
        gap: 6px;
        border-radius: 20px;
        transition: var(--transition-smooth);
        font-weight: 500;
      }

      .modal__support-button:hover {
        background-color: var(--button-bg);
        color: white;
        border-color: var(--button-bg);
        transform: translateY(-1px);
      }

      .modal__support-button--active {
        background-color: var(--button-bg);
        color: white;
        border-color: var(--button-bg);
      }

      .modal__close {
        background: var(--hover-bg);
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 8px;
        color: var(--text-color);
        border-radius: 8px;
        transition: var(--transition-smooth);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal__close:hover {
        background-color: #ff4757;
        color: white;
        transform: scale(1.1);
      }

      .modal__support {
        display: none;
        background: linear-gradient(135deg, var(--support-bg) 0%, var(--hover-bg) 100%);
        border-radius: var(--border-radius);
        padding: 20px;
        margin-bottom: 24px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-light);
      }

      .modal__support--visible {
        display: block;
        animation: slideDown 0.3s ease-out;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .modal__language-selector {
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .modal__language-label {
        font-weight: 600;
        color: var(--text-color);
        min-width: 80px;
      }

      /* Support section styles */
      .support__title {
        font-size: 16px;
        margin: 0 0 12px 0;
        color: var(--text-color);
      }

      .support__links {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .support__link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--text-color);
        padding: 8px 12px;
        border-radius: var(--border-radius);
        background: var(--bg-color);
        transition: background-color 0.2s;
      }

      .support__link:hover {
        background: var(--hover-bg);
      }

      .support__link-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .support__link-text {
        font-size: 14px;
      }

      /* Select styles */
      .select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: var(--input-bg);
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007AFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-position: right 12px center;
        background-repeat: no-repeat;
        background-size: 12px;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        color: var(--input-text);
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        padding: 12px 40px 12px 12px;
        width: 100%;
        box-shadow: var(--shadow-light);
        transition: var(--transition-smooth);
        flex: 1;
      }

      .select:focus {
        outline: none;
        border-color: var(--button-bg);
        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
      }

      .modal__prompt-list {
        max-height: 50vh;
        margin-inline: -32px;
        padding-inline: 32px;
        overflow-y: auto;
        padding-right: 8px;
      }

      .modal__empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-color-secondary);
      }

      .modal__empty-state-icon {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      .modal__loading {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-color-secondary);
      }

      .modal__loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--button-bg);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Modal overlay */
      .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .modal-overlay--visible {
        display: block;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* Prompt item styles */
      .prompt-item {
        padding: 20px;
        margin: 12px 0;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        cursor: pointer;
        transition: var(--transition-smooth);
        background: linear-gradient(135deg, var(--card-bg) 0%, rgba(246, 250, 254, 0.8) 100%);
        position: relative;
        box-shadow: var(--shadow-light);
      }

      .prompt-item:hover {
        background: linear-gradient(135deg, var(--hover-bg) 0%, rgba(245, 245, 245, 0.9) 100%);
        transform: translateY(-3px);
        box-shadow: var(--shadow-hover);
        border-color: var(--button-bg);
      }

      .prompt-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--button-bg), #00d4ff);
        border-radius: 12px 12px 0 0;
        opacity: 0;
        transition: var(--transition-smooth);
      }

      .prompt-item:hover::before {
        opacity: 1;
      }

      .prompt-item--active {
        border-color: var(--button-bg);
        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
      }

      .prompt-item--active::before {
        opacity: 1;
      }

      .prompt-item__category {
        font-size: 11px;
        color: var(--button-bg);
        margin-bottom: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .prompt-item__category::before {
        content: "🔖";
        font-size: 12px;
      }

      .prompt-item__text {
        font-size: 15px;
        color: var(--text-color);
        margin-bottom: 12px;
        line-height: 1.5;
        font-weight: 500;
      }

      .prompt-item__inputs {
        display: none;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--border-color);
      }

      .prompt-item__inputs--visible {
        display: block;
        animation: slideDown 0.3s ease-out;
      }

      .prompt-item__input-wrapper {
        margin-bottom: 12px;
      }

      .prompt-item__input-label {
        display: block;
        font-size: 12px;
        color: var(--text-color-secondary);
        margin-bottom: 6px;
        font-weight: 600;
      }

      .prompt-item__input {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 14px;
        background-color: var(--input-bg);
        color: var(--input-text);
        font-family: inherit;
        transition: var(--transition-smooth);
        box-shadow: var(--shadow-light);
      }

      .prompt-item__input:focus {
        outline: none;
        border-color: var(--button-bg);
        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
      }

      .prompt-item__input::placeholder {
        color: var(--placeholder-color);
        opacity: 1;
      }

      .prompt-item__inline-input {
        display: inline-block;
        padding: 4px 8px;
        border: 1px solid var(--button-bg);
        border-radius: 4px;
        font-size: inherit;
        font-family: inherit;
        background-color: var(--input-bg);
        color: var(--input-text);
        transition: var(--transition-smooth);
        box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
        margin: 0 2px;
        min-width: 120px;
        max-width: 200px;
      }

      .prompt-item__inline-input:focus {
        outline: none;
        border-color: var(--button-bg);
        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
        background-color: var(--bg-color);
      }

      .prompt-item__inline-input::placeholder {
        color: var(--placeholder-color);
        opacity: 0.7;
        font-size: 0.9em;
      }

      .prompt-item__apply {
        display: none;
        width: 100%;
        padding: 12px 20px;
        background: linear-gradient(135deg, var(--button-bg) 0%, var(--button-hover) 100%);
        color: white;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        margin-top: 16px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        transition: var(--transition-smooth);
        box-shadow: var(--shadow-medium);
      }

      .prompt-item__apply--visible {
        display: block;
        animation: slideDown 0.3s ease-out;
      }

      .prompt-item__apply:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-hover);
      }

      .prompt-item__apply:active {
        transform: translateY(0);
      }

      /* Footer for subtle support */
      .modal__footer {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--border-color);
        text-align: center;
        font-size: 12px;
        color: var(--text-color-secondary);
      }

      .modal__footer-link {
        color: var(--button-bg);
        text-decoration: none;
        font-weight: 500;
        transition: var(--transition-smooth);
      }

      .modal__footer-link:hover {
        color: var(--button-hover);
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  create() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = this.modalHTML;
    document.body.appendChild(modalContainer);

    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', () => this.close());
    document.getElementById('modal-overlay').addEventListener('click', () => this.close());
    document.getElementById('modal-language').addEventListener('change', async (e) => {
      this.showLoading();
      const prompts = await window.promptService.loadPrompts(e.target.value);
      this.displayPrompts(prompts);
    });

    // Add support button functionality
    const supportButton = document.getElementById('support-button');
    const supportLinks = document.getElementById('support-links');

    supportButton.addEventListener('click', () => {
      const isVisible = supportLinks.classList.contains('modal__support--visible');
      supportLinks.classList.toggle('modal__support--visible');
      supportButton.classList.toggle('modal__support-button--active');
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('prompt-suggester-modal').classList.contains('modal--visible')) {
        this.close();
      }
    });
  }

  showLoading() {
    const promptList = document.getElementById('modal-prompt-list');
    promptList.innerHTML = `
      <div class="modal__loading" id="modal-loading">
        <div class="modal__loading-spinner"></div>
        <div>Loading prompts...</div>
      </div>
    `;
  }

  showEmptyState() {
    const promptList = document.getElementById('modal-prompt-list');
    promptList.innerHTML = `
      <div class="modal__empty-state">
        <div class="modal__empty-state-icon">📝</div>
        <div>No prompts found for this language.</div>
      </div>
    `;
  }

  async show() {
    // Create modal if it doesn't exist
    if (!document.getElementById('prompt-suggester-modal')) {
      this.create();
    }

    document.getElementById('prompt-suggester-modal').classList.add('modal--visible');
    document.getElementById('modal-overlay').classList.add('modal-overlay--visible');

    this.showLoading();
    const prompts = await window.promptService.loadPrompts(document.getElementById('modal-language').value);
    this.displayPrompts(prompts);
  }

  close() {
    document.getElementById('prompt-suggester-modal').classList.remove('modal--visible');
    document.getElementById('modal-overlay').classList.remove('modal-overlay--visible');
  }

  displayPrompts(prompts) {
    const promptList = document.getElementById('modal-prompt-list');

    if (!prompts || prompts.length === 0) {
      this.showEmptyState();
      return;
    }

    promptList.innerHTML = '';

    prompts.forEach((prompt, index) => {
      const promptElement = document.createElement('div');
      promptElement.className = 'prompt-item';

      const categoryElement = document.createElement('div');
      categoryElement.className = 'prompt-item__category';
      categoryElement.textContent = `${prompt.category} > ${prompt.sub_category || prompt.scenario || prompt.template_name}`;

      const textElement = document.createElement('div');
      textElement.className = 'prompt-item__text';

      // Get the prompt text
      const promptText = prompt.prompt_text || prompt.prompt_template;

      // Find all placeholders
      const placeholderMatches = promptText.match(/\{(\d+)\}/g) || [];
      const placeholderCount = placeholderMatches.length;

      // Create input fields container (hidden by default, will show inline inputs instead)
      const inputContainer = document.createElement('div');
      inputContainer.className = 'prompt-item__inputs';
      inputContainer.style.display = 'none'; // Hide the bottom inputs

      // Store input references for the apply button
      const inputs = [];

      // Function to create inline input elements
      const createInlineInputs = () => {
        let htmlContent = promptText;

        // Replace each {n} with an input field
        for (let i = 1; i <= placeholderCount; i++) {
          const inputId = `input-${index}-${i}`;
          const inputHTML = `<input type="text" class="prompt-item__inline-input" id="${inputId}" placeholder="Enter value for {${i}}" data-placeholder-num="${i}">`;
          htmlContent = htmlContent.replace(`{${i}}`, inputHTML);
        }

        textElement.innerHTML = htmlContent;

        // Get references to the created input elements and add event listeners
        inputs.length = 0; // Clear previous inputs
        for (let i = 1; i <= placeholderCount; i++) {
          const inputId = `input-${index}-${i}`;
          const input = document.getElementById(inputId);
          if (input) {
            inputs.push(input);

            // Prevent click event from bubbling up to promptElement
            input.addEventListener('click', (e) => {
              e.stopPropagation();
            });

            // Add keyboard navigation
            input.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                const currentIndex = inputs.indexOf(input);
                if (currentIndex > 0) {
                  inputs[currentIndex - 1].focus();
                }
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const currentIndex = inputs.indexOf(input);
                if (currentIndex < inputs.length - 1) {
                  inputs[currentIndex + 1].focus();
                } else {
                  applyButton.focus();
                }
              } else if (e.key === 'Enter') {
                e.preventDefault();
                applyButton.click();
              }
            });
          }
        }
      };

      // Function to show plain text
      const showPlainText = () => {
        textElement.textContent = promptText;
        inputs.length = 0;
      };

      // Initially show plain text
      showPlainText();

      // Create apply button
      const applyButton = document.createElement('button');
      applyButton.textContent = 'Apply Prompt';
      applyButton.className = 'prompt-item__apply';

      // Add click handler for the prompt
      promptElement.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.prompt-item').forEach(item => {
          item.classList.remove('prompt-item--active');
        });

        // Hide all other apply buttons
        document.querySelectorAll('.prompt-item__apply').forEach(button => {
          button.classList.remove('prompt-item__apply--visible');
        });

        // Hide all other inline inputs by showing plain text
        document.querySelectorAll('.prompt-item').forEach((item, itemIndex) => {
          if (itemIndex !== index) {
            const textEl = item.querySelector('.prompt-item__text');
            const originalPrompt = prompts[itemIndex].prompt_text || prompts[itemIndex].prompt_template;
            textEl.textContent = originalPrompt;
          }
        });

        const isActive = promptElement.classList.contains('prompt-item--active');

        if (!isActive) {
          // Show inline inputs and apply button
          createInlineInputs();
          applyButton.classList.add('prompt-item__apply--visible');
          promptElement.classList.add('prompt-item--active');

          // Focus the first input when showing
          setTimeout(() => {
            if (inputs.length > 0) {
              inputs[0].focus();
            }
          }, 100);
        } else {
          // Hide inline inputs and show plain text
          showPlainText();
          promptElement.classList.remove('prompt-item--active');
        }
      });

      // Add apply button click handler
      applyButton.addEventListener('click', (e) => {
        e.stopPropagation();
        let finalPrompt = promptText;
        inputs.forEach((input, inputIndex) => {
          finalPrompt = finalPrompt.replace(`{${inputIndex + 1}}`, input.value);
        });
        window.chatInputUtils.applyPromptToChat(finalPrompt);
        this.close();
      });

      promptElement.appendChild(categoryElement);
      promptElement.appendChild(textElement);
      promptElement.appendChild(inputContainer);
      promptElement.appendChild(applyButton);
      promptList.appendChild(promptElement);
    });
  }
}

// Make Modal available globally
window.Modal = Modal;