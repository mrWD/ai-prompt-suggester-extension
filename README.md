# AI Prompt Suggester

A browser extension that suggests and customizes prompts for various AI chat platforms including ChatGPT, Gemini, Claude, Perplexity, Grok, Mistral, DeepSeek, Copilot, Qwen, Le Chat, and LM Arena.

## Features

- 💡 Smart prompt suggestions for various AI chat platforms
- 🌍 Multi-language support (English, German, Russian, Italian, French, Spanish, Chinese)
- 🔍 **Real-time search** with highlighting across prompt text and categories
- 🎯 **Inline input editing** - placeholders appear directly in prompt text
- 📋 **Copy functionality** - Copy prompts with Ctrl+C / Cmd+C
- ⌨️ **Advanced keyboard navigation** - Arrow keys, Enter, and keyboard shortcuts
- 🎨 Clean and intuitive interface with system theme support
- 🚀 Seamless integration with chat platforms
- 🔄 Real-time prompt preview with live input substitution
- 🔒 Robust error handling and state management
- 📦 Modular architecture with service-based design

## New UI Features

### 🔍 Search & Discovery
- **Instant search** - Filter prompts as you type
- **Search highlighting** - Matching text is highlighted in blue
- **Keyboard shortcut** - Press `Ctrl+F` / `Cmd+F` to focus search
- **Auto-focus** - Search input is automatically focused when modal opens

### 🎯 Inline Input System
- **Visual integration** - Input fields appear directly where `{1}`, `{2}`, etc. placeholders are located
- **Real-time preview** - See exactly how your inputs will look in the final prompt
- **Smart navigation** - Move between inputs using arrow keys
- **No more bottom forms** - Inputs are embedded right in the prompt text

### ⌨️ Enhanced Keyboard Navigation
- **Search navigation** - `↑` / `↓` arrows to select prompts from search results
- **Input navigation** - Navigate between input fields with arrow keys:
  - `↑` / `↓` - Move to previous/next input
  - `←` / `→` - Move between inputs when at text beginning/end
- **Quick actions**:
  - `Enter` - Apply prompt to chat
  - `Ctrl+C` / `Cmd+C` - Copy prompt text
  - `Escape` - Close modal or clear selection

### 📋 Copy Functionality
- **Smart copying** - Copies current state with filled-in values
- **Visual feedback** - Success/error notifications slide in from top-right
- **Context aware** - Copies keyboard-selected or active prompt
- **Cross-platform** - Works on Windows, Mac, and Linux

### 💡 Contextual Help
- **Interactive tips** - Keyboard shortcuts shown when relevant
- **Professional design** - Styled keyboard key indicators
- **Action guidance** - Clear instructions for copy and apply actions

## Supported Browsers

- Chrome/Chromium (version 88+)
- Firefox (version 109+)
- Safari (version 15+)
- Edge (version 88+)
- Opera (version 75+)

## Supported Platforms

- ChatGPT (chat.openai.com)
- Google Gemini (gemini.google.com)
- Claude (claude.ai)
- Perplexity (www.perplexity.ai)
- Grok (grok.com)
- Mistral (chat.mistral.ai)
- DeepSeek (chat.deepseek.com)
- Microsoft Copilot (copilot.microsoft.com)
- Qwen (chat.qwen.ai)
- Le Chat (chat.lmsys.org)
- LM Arena (lmarena.ai)

## Installation

### Chrome/Edge/Opera
1. Clone this repository or download the ZIP file
2. Open Chrome/Edge/Opera and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

### Firefox
1. Clone this repository or download the ZIP file
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select any file from the extension directory

### Safari
1. Clone this repository or download the ZIP file
2. Open Safari and go to Preferences > Advanced
3. Enable "Show Develop menu in menu bar"
4. Go to Develop > Show Extension Builder
5. Click "+" and select "Add Extension"
6. Select the extension directory

## Usage

### Basic Usage
1. Visit any supported AI chat platform
2. Click the 💡 button in the chat interface
3. **Search** for prompts using the search bar (auto-focused)
4. **Navigate** with `↑` / `↓` arrow keys or click to select
5. **Customize** prompts with inline inputs that appear in-place
6. **Apply** with `Enter` key or "Apply to Chat" button

### Advanced Keyboard Shortcuts
- `Ctrl+F` / `Cmd+F` - Focus search input
- `↑` / `↓` - Navigate between search results
- `Enter` - Select prompt (shows inputs if needed, applies if no inputs)
- `←` / `→` - Navigate between input fields at text boundaries
- `Ctrl+C` / `Cmd+C` - Copy current prompt text
- `Escape` - Close modal or clear current selection

### Power User Tips
- **Quick copy**: Select a prompt and press `Ctrl+C` to copy without applying
- **Efficient editing**: Use arrow keys to move between inputs seamlessly
- **Search workflow**: Type to search → Arrow keys to select → Enter to edit → Fill inputs → Enter to apply
- **Batch workflow**: Copy multiple prompts for use in other applications

## Technical Features

- **State Management**: Centralized state management using a dedicated PopupState class
- **Error Handling**: Robust error handling with graceful fallbacks
- **Service Architecture**: Modular design with separate services for different functionalities
- **Dynamic Inputs**: Smart placeholder detection and inline input field management
- **Cross-Platform Support**: Unified interface for multiple AI chat platforms
- **Performance Optimization**: Efficient DOM updates and event handling
- **Search Engine**: Real-time filtering with text highlighting
- **Clipboard Integration**: Modern clipboard API with fallback support

## Recent Updates

### Version 2.0 - Major UI Overhaul
- **🎯 Inline Input System** - Inputs now appear directly in prompt text
- **🔍 Real-time Search** - Find prompts instantly with highlighting
- **⌨️ Advanced Keyboard Navigation** - Full keyboard control for power users
- **📋 Copy Functionality** - Copy prompts with keyboard shortcuts
- **💡 Contextual Help** - Smart tips that appear when needed
- **🎨 Enhanced Design** - Professional card-based UI with improved spacing

### Previous Updates
- Added system theme support with improved dark mode colors
- Enhanced text contrast and readability in dark mode
- Added support for new languages (Italian, French, Spanish, Chinese)
- Improved language selection UI in both popup and modal interfaces
- Enhanced language switching with instant prompt updates
- Improved state management with PopupState class
- Enhanced error handling and recovery mechanisms
- Optimized prompt loading and caching
- Added support for new AI platforms

## Support the Project

If you find this extension helpful, consider supporting its development:

- ⭐ [Star on GitHub](https://github.com/mrWD/ai-prompt-suggester-extension)
- ☕ [Buy Me a Coffee](https://buymeacoffee.com/ipupok)
- 💖 [Support on Ko-fi](https://ko-fi.com/ipupok)
- 💰 [Donate with PayPal](https://www.paypal.com/donate/?hosted_button_id=VBNDB5AHYLGCY)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing, please ensure:

1. Your code follows the existing architecture patterns
2. You include appropriate error handling
3. You update the documentation for any new features
4. You test your changes across different platforms
5. Consider accessibility and keyboard navigation
6. Test the search and copy functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.