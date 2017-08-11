import * as vscode from "vscode";
import { Extension } from "./Extension";
import { EditProvider } from "./EditProvider";
import unibeautify from "unibeautify";
import { beautifiers } from "./beautifiers";

// let extension: Extension | undefined;
export function activate(context: vscode.ExtensionContext) {
    // extension = new Extension(context);
    // extension.activate();

    unibeautify.loadBeautifiers(beautifiers);

    const editProvider = new EditProvider();
    const documentSelector: vscode.DocumentSelector = [ "javascript" ];
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider(documentSelector, editProvider),
        vscode.languages.registerDocumentRangeFormattingEditProvider(documentSelector, editProvider),
    );
};

export function deactivate() {
    // extension && extension.deactivate();
    // extension = undefined;
};
