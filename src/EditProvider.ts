import * as vscode from "vscode";
import unibeautify, {
  LanguageOptionValues,
  BeautifyData,
  Language,
} from "unibeautify";
import { getTextEdits, translateTextEdits } from "./diffUtils";
import { extname } from "path";
import cosmiconfig from "cosmiconfig";
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

  public provideDocumentRangeFormattingEdits(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): PromiseLike<vscode.TextEdit[]> {
    const text: string = document.getText(range);
    return this.beautifyRange(document, range, options, token)
      .then((newText: string) => getTextEdits(text, newText))
      .then(textEdits => translateTextEdits(textEdits, range))
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private beautifyRange(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): Promise<string> {
    console.log("FormattingOptions", options);
    const text: string = document.getText(range);
    const fileExtension = this.fileExtensionForDocument(document);
    const filePath = document.fileName;
    const projectPath = vscode.workspace.rootPath;
    return EditProvider.beautifyOptions(projectPath).then(beautifyOptions => {
      const languageName = this.languageNameForDocument(document);
      const beautifyData: BeautifyData = {
        languageName,
        fileExtension,
        filePath,
        projectPath,
        options: beautifyOptions,
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
      /**
       * Use a different `.unibeautify` config when vscode config is set and
       * define if the project config should extend the vscode config.
       *
       * @argument {unibeautify.defaultConfig} string path to a file
       * @argument {unibeautify.extendConfig} boolean extend or not
       */
      const vscodeSettings = vscode.workspace.getConfiguration("unibeautify");
      let defaultConfigOverride = vscodeSettings.defaultConfig;
      let extendConfig = vscodeSettings.extendConfig;
      let workspace = path;

      const explorerOptions: any = {};
      if (defaultConfigOverride) {
        path = defaultConfigOverride;
      }

      const explorer = cosmiconfig("unibeautify", explorerOptions);
      const defaultConfig: LanguageOptionValues = {};

      let isDirectory = fs.lstatSync(path).isDirectory();
      if (!isDirectory) {
        return explorer
          .load(path)
          .then(returnResult)
          .catch(catchError);
      } else {
        return explorer
          .search(path)
          .then(returnResult)
          .catch(catchError);
      }

      function returnResult(result: any) {
        if (!result) return defaultConfig;

        if (defaultConfigOverride && extendConfig) {
          let resultProject = fs.lstatSync(workspace).isDirectory()
            ? explorer.searchSync(workspace)
            : explorer.loadSync(workspace);
          const config = EditProvider.extend(
            {},
            result.config,
            resultProject.config
          );

          return resultProject.config;
        } else {
          return result.config;
        }
      }

      function catchError() {
        return vscode.window.showErrorMessage(
          `We could not find your configuration file: ${path}. Please correct your path, otherwise the plugin will not work!`
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static extend(...obj: any[]) {
    for (var i = 1; i < obj.length; i++)
      for (var key in obj[i])
        if (obj[i].hasOwnProperty(key)) {
          if (
            typeof obj[0][key] === "object" &&
            typeof obj[i][key] === "object"
          )
            this.extend(obj[0][key], obj[i][key]);
          else obj[0][key] = obj[i][key];
        } else {
          obj[0].push(obj[i][key]);
        }
    return obj[0];
  }
}
