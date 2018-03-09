import * as vscode from "vscode";

export class Editor {
    constructor(private textEditor: vscode.TextEditor) {
    }

    //     const editor = this.activeTextEditor;
    // if (!editor) return;
    // const doc = editor.document;
    // if (!doc) return;

    // const text: string = doc.getText();
    // const range = doc.

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

    setText(newText: string, range: vscode.Range = this.fullRange) {
        return this.textEditor.edit(editBuilder =>
            editBuilder.replace(range, newText)
        );
    }

    get fullRange(): vscode.Range {
        return this.document.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));
    }

}