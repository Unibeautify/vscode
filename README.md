# Unibeautify for VSCode

[![Build Status](https://travis-ci.com/Unibeautify/vscode.svg?branch=master)](https://travis-ci.com/Unibeautify/vscode) [![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/Glavin001.unibeautify-vscode.svg)](https://marketplace.visualstudio.com/items?itemName=Glavin001.unibeautify-vscode) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

> [Unibeautify](https://unibeautify.com/) for [Visual Studio Code](https://code.visualstudio.com/)

![demo](https://user-images.githubusercontent.com/1885333/37237670-0f06fcde-23ed-11e8-9200-4d2089323fe1.gif)

## Install

Search for `Unibeautify` extension and click `Install`.
See [Install an extension](https://code.visualstudio.com/docs/editor/extension-gallery#_install-an-extension) for more details.

```bash
code --install-extension Glavin001.unibeautify-vscode
```

## Usage

### Configure

> Important: You must first configure for the extension to work properly.

Use the [Unibeautify assistant](https://assistant.unibeautify.com/#/setup) for an interactive setup of your configuration file. Simply select the languages you want, and it will walk you though the options available. At the end simply download or copy to your clipboard your configuration.

See https://unibeautify.com/docs/config-file.html for details.

#### Example Configuration File

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

### Keyboard Shortcut

From [Stack Overflow](https://stackoverflow.com/a/29973358/2578205):

- Windows: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
- Mac: <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>
- Ubuntu: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>

### Command Palette

Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (<kbd>Ctrl</kbd> +<kbd>Shift</kbd>+ <kbd>P</kbd> or <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on Mac) and search for `format`:

![format](https://user-images.githubusercontent.com/1885333/37503575-f6c0092a-28b7-11e8-9bf6-6573d3eab76c.png)

- `Format Document` - Formats the entire editor document.
- `Format Selection` - Formats only the selection. Only appears when text selected.

## Contribute

### Running extension

1. Open this repository inside VSCode
2. Open `Debug Side Bar`

![debug sidebar](https://msdnshared.blob.core.windows.net/media/2016/10/image364.png)

3. Run (`B` below) with `Launch Extension`

![debug](https://code.visualstudio.com/assets/docs/editor/debugging/debugging_hero.png)

See https://code.visualstudio.com/docs/extensions/testing-extensions for more information.
