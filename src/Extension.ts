import * as vscode from "vscode";
import unibeautify, {
    LanguageOptionValues,
} from "unibeautify";
import { beautifiers } from "./beautifiers";
import { Editor } from "./Editor";

export class Extension {

    constructor(private context: vscode.ExtensionContext) {
    }

    activate() {
        const { subscriptions } = this;
        subscriptions.push(...this.createCommands());
        this.loadBeautifiers();
    }

    deactivate() {
        this.subscriptions.forEach(disposable => disposable.dispose());
    }

    get subscriptions() {
        return this.context.subscriptions;
    }

    createCommands(): Disposable[] {
        const beautifyFileCommand = vscode.commands.registerCommand("Unibeautify.beautifyFile", this.beautifyFile.bind(this));
        const beautifySelectionCommand = vscode.commands.registerCommand("Unibeautify.beautifySelection", this.beautifySelection.bind(this));
        return [
            beautifyFileCommand,
            beautifySelectionCommand,
        ];
    }

    loadBeautifiers() {
        unibeautify.loadBeautifiers(beautifiers);
    }

    beautifyFile() {
        console.log("Beautify file");
        const editor = Editor.activeTextEditor;
        if (!editor) return;

        const text: string = editor.text;
        const options: LanguageOptionValues = {};
        const languageName = "JavaScript";
        unibeautify.beautify({
            languageName,
            options,
            text,
        })
            .then((result: string) => {
                console.log("Result:", result);
                editor.setText(result);
            })
            .catch(error => this.showError(error));

    }

    beautifySelection() {
        console.log("Beautify selection");
    }

    showError(error: Error) {
        vscode.window.showErrorMessage(error.message);
    }

}

export interface Disposable {
    dispose(): any;
}
