# AI Prompt Suggester

A Chrome extension that suggests and customizes prompts for various AI chat platforms including ChatGPT, Gemini, Claude, Perplexity, Grok, Mistral, DeepSeek, Copilot, Qwen, Le Chat, and LM Arena.

## Features

- 💡 Smart prompt suggestions for various AI chat platforms
- 🌍 Multi-language support (English, German, Russian, Italian, French, Spanish, Chinese)
- 🎯 Easy prompt customization with dynamic inputs
- 🔄 Real-time prompt preview
- 🎨 Clean and intuitive interface
- 🚀 Seamless integration with chat platforms
- ⌨️ Keyboard navigation support
- 🎯 Improved platform-specific selectors
- 🔒 Robust error handling and state management
- 📦 Modular architecture with service-based design

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

1. Clone this repository or download the ZIP file
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Visit any supported AI chat platform
2. Click the 💡 button in the chat interface
3. Select your preferred language
4. Browse and select a prompt
5. Customize the prompt if needed
   - Use Tab/Arrow keys to navigate between inputs
   - Press Enter to apply the prompt
6. Click "Apply" to insert the prompt into the chat

## Technical Features

- **State Management**: Centralized state management using a dedicated PopupState class
- **Error Handling**: Robust error handling with graceful fallbacks
- **Service Architecture**: Modular design with separate services for different functionalities
- **Dynamic Inputs**: Smart placeholder detection and input field management
- **Cross-Platform Support**: Unified interface for multiple AI chat platforms
- **Performance Optimization**: Efficient DOM updates and event handling

## Recent Updates

- Added support for new languages (Italian, French, Spanish, Chinese)
- Improved language selection UI in both popup and modal interfaces
- Enhanced language switching with instant prompt updates
- Improved state management with PopupState class
- Enhanced error handling and recovery mechanisms
- Optimized prompt loading and caching
- Better keyboard navigation support
- Improved modal performance
- Fixed async prompt loading
- Enhanced platform-specific selectors
- Added support for new AI platforms

## Support the Project

If you find this extension helpful, consider supporting its development:

- [Buy Me a Coffee](https://buymeacoffee.com/ipupok)
- [Support on Ko-fi](https://ko-fi.com/ipupok)
- [Donate with PayPal](https://www.paypal.com/donate/?hosted_button_id=VBNDB5AHYLGCY)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing, please ensure:

1. Your code follows the existing architecture patterns
2. You include appropriate error handling
3. You update the documentation for any new features
4. You test your changes across different platforms

## License

This project is licensed under the MIT License - see the LICENSE file for details.