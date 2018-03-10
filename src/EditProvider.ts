import * as vscode from "vscode";
import unibeautify, {
  LanguageOptionValues,
  BeautifyData,
  Language,
} from "unibeautify";
import { getTextEdits, translateTextEdits } from "./diffUtils";
import { extname } from "path";

export class EditProvider
  implements vscode.DocumentRangeFormattingEditProvider,
    vscode.DocumentFormattingEditProvider {
  public provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): PromiseLike<vscode.TextEdit[]> {
    return this.provideDocumentRangeFormattingEdits(
      document,
      this.fullRange(document),
      options,
      token
    );
  }

  private fullRange(document: vscode.TextDocument): vscode.Range {
    return document.validateRange(
      new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
    );
  }

  public provideDocumentRangeFormattingEdits(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): PromiseLike<vscode.TextEdit[]> {
    console.log("FormattingOptions", options);
    const text: string = document.getText(range);
    const beautifyOptions: LanguageOptionValues = {};
    const languageName = this.languageNameForDocument(document);
    const fileExtension = this.fileExtensionForDocument(document);
    const filePath = document.fileName;
    const projectPath = vscode.workspace.rootPath;
    const beautifyData: BeautifyData = {
      languageName,
      fileExtension,
      filePath,
      projectPath,
      options: beautifyOptions,
      text,
    };
    console.log("beautifyData", beautifyData);
    return unibeautify
      .beautify(beautifyData)
      .then((newText: string) => getTextEdits(text, newText))
      .then(textEdits => translateTextEdits(textEdits, range))
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private languageNameForDocument(
    document: vscode.TextDocument
  ): string | undefined {
    const languages = this.languagesForDocument(document);
    if (languages.length === 0) {
      return;
    }
    return languages[0].name;
  }

  private languagesForDocument(document: vscode.TextDocument): Language[] {
    return unibeautify.findLanguages({ vscodeLanguage: document.languageId });
  }

  private fileExtensionForDocument(document: vscode.TextDocument): string {
    const { fileName } = document;
    if (fileName) {
      return extname(fileName).slice(1);
    }
    return undefined;
  }
}
