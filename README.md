# AI Prompt Suggester Chrome Extension

Chrome extension for suggesting and customizing prompts for ChatGPT, Gemini, Claude, Perplexity, Grok, Mistral, DeepSeek, Copilot, Qwen, and Le Chat.

## Installation

1. Clone this repository:
```bash
git clone https://github.com/mrWD/ai-prompt-suggester-extension.git
```

2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Open any supported chat (ChatGPT, Gemini, Claude, Perplexity, Grok, Mistral, DeepSeek, Copilot, or Le Chat)
2. Look for the 💡 button:
   - On Gemini: The button appears after the last toolbox item
   - On Claude: The button appears in the input area toolbar
   - On Perplexity: The button appears in the input toolbar
   - On Grok: The button appears after the "Think" button
   - On Mistral: The button appears after the library selection button
   - On DeepSeek: The button appears after the last primary filled rectangle button in the input area
   - On Copilot: The button appears after the chat mode switcher's parent container
   - On Qwen: The button appears after the web search button
   - On other platforms: The button appears next to the system hint button
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
- Dynamic UI adaptation for different chat interfaces

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
- Perplexity (perplexity.ai)
- Grok (grok.com)
- Mistral (chat.mistral.ai)
- DeepSeek (chat.deepseek.com)
- Copilot (copilot.microsoft.com)
- Qwen (chat.qwen.ai)
- Le Chat (chat.lmsys.org)