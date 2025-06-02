// Button component for triggering prompt suggestions
class SuggestionButton {
  constructor() {
    this.buttonHTML = `
      <button style="
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
      ">💡</button>
    `;
  }

  create() {
    const targetElement = window.PlatformUtils.getTargetElement();
    if (!targetElement) {
      console.log('No target element found');
      return;
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = this.buttonHTML;
    const button = buttonContainer.firstElementChild;
    button.title = 'Get Prompt Suggestions';

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', () => {
      window.modal.show();
    });

    // Insert button after the target element
    targetElement.parentElement.insertBefore(button, targetElement.nextSibling);
  }
}

// Make SuggestionButton available globally
window.SuggestionButton = SuggestionButton;