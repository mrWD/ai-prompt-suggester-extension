// Copilot input handling
class CopilotInput {
  static getInputElement() {
    return document.querySelector('textarea#userInput');
  }
}

// Make CopilotInput available globally
window.CopilotInput = CopilotInput;