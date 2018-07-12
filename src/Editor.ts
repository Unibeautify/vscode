import * as vscode from "vscode";

export class Editor {
  constructor(private textEditor: vscode.TextEditor) {}

  static get activeTextEditor(): Editor | undefined {
    const textEditor = vscode.window.activeTextEditor;
    return textEditor ? new Editor(textEditor) : undefined;
  }

  static get activeDocument(): vscode.TextDocument | undefined {
    const textEditor = this.activeTextEditor;
    if (textEditor) {
      return textEditor.document;
    }
    return undefined;
  }

  get document(): vscode.TextDocument | undefined {
    return this.textEditor.document;
  }

  get text(): string | undefined {
    if (this.document) {
      return this.document.getText();
    }
    return undefined;
  }

  public setText(newText: string, range: vscode.Range = this.fullRange) {
    return this.textEditor.edit(editBuilder =>
      editBuilder.replace(range, newText)
    );
  }

  get fullRange(): vscode.Range {
    if (this.document) {
      return this.document.validateRange(
        new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
      );
    }
    return new vscode.Range(0, 0, 0, 0);
  }
}
