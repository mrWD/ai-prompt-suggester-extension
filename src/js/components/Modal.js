// Modal component for displaying prompt suggestions
class Modal {
  constructor() {
    this.modalHTML = `
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
  }

  create() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = this.modalHTML;
    document.body.appendChild(modalContainer);

    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', () => this.close());
    document.getElementById('modal-overlay').addEventListener('click', () => this.close());
    document.getElementById('modal-language').addEventListener('change', async (e) => {
      const prompts = await window.promptService.loadPrompts(e.target.value);
      this.displayPrompts(prompts);
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

  async show() {
    document.getElementById('prompt-suggester-modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    const prompts = await window.promptService.loadPrompts(document.getElementById('modal-language').value);
    this.displayPrompts(prompts);
  }

  close() {
    document.getElementById('prompt-suggester-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
  }

  displayPrompts(prompts) {
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
        window.chatInputUtils.applyPromptToChat(finalPrompt);
        this.close();
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
}

// Make Modal available globally
window.Modal = Modal;