import * as vscode from "vscode";
import unibeautify, {
  LanguageOptionValues,
  BeautifyData,
  Language,
} from "unibeautify";
import { UnibeautifyVSCodeSettings } from "./index";
import { getTextEdits, translateTextEdits } from "./diffUtils";
import { extname } from "path";
import cosmiconfig, { ExplorerOptions } from "cosmiconfig";
import fs from "fs";

export class EditProvider
  implements
    vscode.DocumentRangeFormattingEditProvider,
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

  // tslint:disable-next-line:max-func-args
  public provideDocumentRangeFormattingEdits(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): PromiseLike<vscode.TextEdit[]> {
    const text: string = document.getText(range);
    return this.beautifyRange({ document, range, options, token })
      .then((newText: string) => getTextEdits(text, newText))
      .then(textEdits => translateTextEdits(textEdits, range))
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private beautifyRange({
    document,
    range,
    options,
    token,
  }: {
    document: vscode.TextDocument;
    range: vscode.Range;
    options: vscode.FormattingOptions;
    token: vscode.CancellationToken;
  }): Promise<string> {
    console.log("FormattingOptions", options);
    const text: string = document.getText(range);
    const fileExtension = this.fileExtensionForDocument(document);
    const filePath = document.fileName;
    const projectPath = vscode.workspace.rootPath;
    return EditProvider.beautifyOptions().then(beautifyOptions => {
      const languageName = this.languageNameForDocument(document);
      const beautifyData: BeautifyData = {
        fileExtension,
        filePath,
        languageName,
        options: beautifyOptions,
        projectPath,
        text,
      };
      console.log("beautifyData", beautifyData);
      return unibeautify.beautify(beautifyData).catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
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

  public static beautifyOptions(
    path: string = vscode.workspace.rootPath
  ): Promise<LanguageOptionValues> {
    try {
      const vscodeSettings = vscode.workspace.getConfiguration("unibeautify");
      let defaultConfigOverride = vscodeSettings.defaultConfig;
      let pathToConfig = path;

      let cosmiOptions: ExplorerOptions = {};
      const explorer = cosmiconfig("unibeautify", cosmiOptions);
      const defaultConfig: LanguageOptionValues = {};

      if (defaultConfigOverride) {
        pathToConfig = defaultConfigOverride;

        return explorer
          .load(pathToConfig)
          .then(returnResult)
          .catch(catchError);
      }

      return explorer
        .search(pathToConfig)
        .then(returnResult)
        .catch(catchError);

      function returnResult(result: any) {
        if (!result) return defaultConfig;

        return result.config;
      }

      function catchError() {
        return vscode.window.showErrorMessage(
          `We could not find your configuration file: ${pathToConfig}. Please correct your path, otherwise the plugin will not work!`
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
