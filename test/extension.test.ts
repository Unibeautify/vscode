import { activate } from "../src/index";
import * as vscode from "vscode";

// Defines a Jest test suite to group tests of similar kind together
describe("Extension", () => {
  // Defines a Jest unit test
  test("Activate", () => {
    const context: vscode.ExtensionContext = {
      subscriptions: [],
    } as any;
    activate(context);

    expect(context.subscriptions.length).toBeGreaterThan(0);
  });
});
