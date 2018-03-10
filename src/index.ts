import * as vscode from "vscode";
import { Extension } from "./Extension";
import { EditProvider } from "./EditProvider";
import unibeautify from "unibeautify";
import { beautifiers } from "./beautifiers";

export function activate(context: vscode.ExtensionContext) {
  unibeautify.loadBeautifiers(beautifiers);
  const { supportedLanguages } = unibeautify;
  const languageFilters: vscode.DocumentFilter[] = supportedLanguages.reduce(
    (filters, { vscodeLanguages = [] }) => {
      const languages: vscode.DocumentFilter[] = vscodeLanguages.map(
        language => ({ language })
      );
      return [...filters, ...languages];
    },
    [] as vscode.DocumentFilter[]
  );
  const patternFilters: vscode.DocumentFilter[] = supportedLanguages
    .filter(language => language.extensions.length > 0)
    .map(language => ({
      pattern: `**/*{${language.extensions.join(",")}}`,
    }));
  const documentSelector: vscode.DocumentSelector = [
    ...languageFilters,
    ...patternFilters,
  ];
  console.log("Unibeautify documentSelector", documentSelector);
  const editProvider = new EditProvider();
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      documentSelector,
      editProvider
    ),
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      documentSelector,
      editProvider
    )
  );
}

export function deactivate() {}
