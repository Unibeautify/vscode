import * as vscode from "vscode";
import { EditProvider } from "./EditProvider";
import unibeautify, { LanguageOptionValues } from "unibeautify";
import { beautifiers } from "./beautifiers";
import { Edit } from "./diffUtils";

export function activate(context: vscode.ExtensionContext) {
  if (!isEnabled()) {
    console.log("Unibeautify is disabled");
    return;
  }
  unibeautify.loadBeautifiers(beautifiers);
  const { supportedLanguages } = unibeautify;
  return EditProvider.beautifyOptions().then((options: any) => {
    if (!options) return console.error("No options:", options);

    console.log("Supported languages", supportedLanguages);
    const enabledLanguages = supportedLanguages.filter(
      lang => options[lang.name] !== false
    );
    console.log("Options", options);
    console.log("Enabled languages", enabledLanguages);
    const languageFilters: vscode.DocumentFilter[] = enabledLanguages.reduce(
      (filters, { vscodeLanguages = [] }) => {
        const languages: vscode.DocumentFilter[] = vscodeLanguages.map(
          language => ({ language, scheme: "file" })
        );
        return [...filters, ...languages];
      },
      [] as vscode.DocumentFilter[]
    );
    const patternFilters: vscode.DocumentFilter[] = enabledLanguages
      .filter(language => language.extensions.length > 0)
      .map(language => ({
        pattern: `**/*{${language.extensions.join(",")}}`,
        scheme: "file",
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
  });
}

export function deactivate() {}

function isEnabled(): boolean {
  return Boolean(vscodeSettings().enabled);
}

function vscodeSettings(): UnibeautifyVSCodeSettings {
  return vscode.workspace.getConfiguration("unibeautify") as any;
}

export interface UnibeautifyVSCodeSettings {
  enabled: boolean;
}
