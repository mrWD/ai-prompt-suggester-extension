# AI Prompt Suggester Chrome Extension

Chrome extension for suggesting and customizing prompts for ChatGPT, Gemini, Claude, and Le Chat.

## Installation

1. Clone this repository:
```bash
git clone https://github.com/mrWD/ai-prompt-suggester-extension.git
```

2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Open any supported chat (ChatGPT, Gemini, Claude, or Le Chat)
2. Look for the 💡 button next to the system hint button
3. Click the button to open the prompt suggestions modal
4. Select a prompt from the list
5. Fill in the required fields:
   - Use Tab or Up/Down arrows to navigate between fields
   - See live preview of your prompt as you type
   - Press Enter or click "Apply" to insert the prompt
6. The prompt will be automatically inserted into the chat input

## Features

- Multi-language support (English, German, Russian)
- Interactive prompt suggestions
- Live preview of customized prompts
- Keyboard navigation between fields
- Automatic focus on first input
- Support for multiple AI chat platforms

## Project Structure
- `manifest.json` — Chrome extension manifest
- `content.js` — Script for injecting UI into chat pages
- `popup.html`, `popup.js` — Extension popup window
- `prompts/` — Directory containing prompt templates in different languages
  - `en.json` — English prompts
  - `de.json` — German prompts
  - `ru.json` — Russian prompts

## Supported Platforms
- ChatGPT (chat.openai.com)
- Gemini (gemini.google.com)
- Claude (claude.ai)
- Le Chat (chat.lmsys.org)

## TODO
- Реализация UI для выбора и кастомизации промптов
- Интеграция с разными чатами