# Unibeautify for VSCode

[![Build Status](https://travis-ci.com/Unibeautify/vscode.svg?branch=master)](https://travis-ci.com/Unibeautify/vscode) [![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/Glavin001.unibeautify-vscode.svg)](https://marketplace.visualstudio.com/items?itemName=Glavin001.unibeautify-vscode) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

> [Unibeautify](https://unibeautify.com/) for [Visual Studio Code](https://code.visualstudio.com/)

![demo](https://user-images.githubusercontent.com/1885333/37237670-0f06fcde-23ed-11e8-9200-4d2089323fe1.gif)

## :tada: Install

Search for `Unibeautify` extension and click `Install`.
See [Install an extension](https://code.visualstudio.com/docs/editor/extension-gallery#_install-an-extension) for more details.

```bash
code --install-extension Glavin001.unibeautify-vscode
```

## :books: Support

See https://github.com/Unibeautify/vscode/blob/master/src/beautifiers.ts for list of supported beautifiers.

<!--START:SUPPORT-TABLE-->
| # | Beautifier | Documentation |
| --- | --- | --- |
| 1 | ClangFormat | https://unibeautify.com/docs/beautifier-clangformat.html |
| 2 | ESLint | https://unibeautify.com/docs/beautifier-eslint.html |
| 3 | JS-Beautify | https://unibeautify.com/docs/beautifier-js-beautify.html |
| 4 | PHP-CS-Fixer | https://unibeautify.com/docs/beautifier-php-cs-fixer.html |
| 5 | Prettier | https://unibeautify.com/docs/beautifier-prettier.html |
| 6 | Pretty Diff | https://unibeautify.com/docs/beautifier-pretty-diff.html |
<!--END:SUPPORT-TABLE-->

## :art: Usage

### :wrench: Configure

> Important: You must first configure for the extension to work properly.

Use the [Unibeautify Assistant](https://assistant.unibeautify.com/#/setup) for an interactive setup of your configuration file. Simply select the languages you want and the configuration assistant will walk you though the options available. At the end, simply download or copy to your clipboard your configuration.

#### :pencil: Example Configuration File

See https://unibeautify.com/docs/config-file.html for details.

Given the following scenario:
- [x] Enable language [JavaScript](https://unibeautify.com/docs/language-javascript.html)
- [x] Enable beautifier [Prettier](https://unibeautify.com/docs/beautifier-prettier.html)
- [x] Configure option [`indent_style`](https://unibeautify.com/docs/option-indent-style.html) to be `space`
- [x] Configure option [`indent_size`](https://unibeautify.com/docs/option-indent-size.html) to be `2`

Create a `.unibeautifyrc.yml` file in your project's root directory with the following contents:


```yaml
---
JavaScript: # Enable language
  beautifiers: ["Prettier"] # Enable beautifiers
  indent_style: "space"
  indent_size: 2
```

Then look at https://unibeautify.com/docs/beautifier-prettier.html and https://unibeautify.com/docs/options-for-languages.html for more supported options.

### :zap: Keyboard Shortcut

From [Stack Overflow](https://stackoverflow.com/a/29973358/2578205):

- Windows: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
- Mac: <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>
- Ubuntu: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>

### :musical_keyboard: Command Palette

Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (<kbd>Ctrl</kbd> +<kbd>Shift</kbd>+ <kbd>P</kbd> or <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on Mac) and search for `format`:

![format](https://user-images.githubusercontent.com/1885333/37503575-f6c0092a-28b7-11e8-9bf6-6573d3eab76c.png)

- `Format Document` - Formats the entire editor document.
- `Format Selection` - Formats only the selection. Only appears when text selected.

## :question: FAQ

### How do I add language support for a non-standard file extension?

This section is for you if you are seeing the following error message after running `Format Document` or similar:

![There is no document formatter for 'plaintext'-files installed.](https://user-images.githubusercontent.com/1885333/41636879-5665cf80-7427-11e8-9b8e-9488f02d4a62.png)

See https://code.visualstudio.com/docs/languages/overview#_adding-a-file-extension-to-a-language for VSCode documentation on `file.associations` [setting](https://code.visualstudio.com/docs/getstarted/settings).
For example, the `.vscode/settings.json` below adds the `.myphp` file extension to the `php` language identifier:

```json
{
  "files.associations": {
    "*.myphp": "php"
  }
}
```

| Before | After |
| --- | --- |
| ![before](https://user-images.githubusercontent.com/1885333/41636908-7a91d494-7427-11e8-97b1-e4e7ce8fea8a.png) | ![after](https://user-images.githubusercontent.com/1885333/41636940-b4606e10-7427-11e8-9d2c-93d8a7d24116.png)

### How do I disable a supported language?

By default all languages supported by Unibeautify will be enabled.

You can disable a specific language by setting the language options to `false` as shown below.

> **Important**: You must restart/reload VSCode after enabling/disabling a language.

Example `.unibeautifyrc.yml`:

```yaml
---
CSS: false # Disable CSS!
JavaScript: # Enable TypeScript
  beautifiers: ["Prettier"] # Enable beautifiers
  indent_style: "space"
  indent_size: 2
```

| Before | After |
| --- | --- |
| Beautified CSS files | ![There is no document formatter for 'css'-files installed.](https://user-images.githubusercontent.com/1885333/41637148-d28b5764-7428-11e8-9763-007f44fe6787.png) |

## Contributing

See [CONTRIBUTING.md](https://github.com/Unibeautify/vscode/blob/master/CONTRIBUTING.md).
