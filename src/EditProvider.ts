import * as vscode from "vscode";
import unibeautify, {
    LanguageOptionValues
} from "unibeautify";
import { getTextEdits, translateTextEdits } from "./diffUtils";

export class EditProvider
    implements vscode.DocumentRangeFormattingEditProvider,
    vscode.DocumentFormattingEditProvider {

    provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): PromiseLike<vscode.TextEdit[]> {
        console.log("FormattingOptions", options);
        const text: string = document.getText(range);
        const beautifyOptions: LanguageOptionValues = {};
        const languageName = "JavaScript";
        return unibeautify.beautify({
            languageName,
            options: beautifyOptions,
            text,
        })
            .then((newText: string) => {
                console.log("oldText:", text);
                console.log("newText:", newText);
                return getTextEdits(text, newText);
            })
            .then((textEdits) => {
                console.log("range:", range);
                console.log("textEdits1:", textEdits);
                textEdits = translateTextEdits(textEdits, range);
                console.log("textEdits2:", textEdits);
                return textEdits;
            })
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            })
            ;
    }
    provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): PromiseLike<vscode.TextEdit[]> {
        return this.provideDocumentRangeFormattingEdits(document, this.fullRange(document), options, token);
    }

    fullRange(document: vscode.TextDocument): vscode.Range {
        return document.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));
    }

}