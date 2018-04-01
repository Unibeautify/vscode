/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require("assert");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as extension from "../src";

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension", function() {
  // Defines a Mocha unit test
  test("Activate", function() {
    const context: vscode.ExtensionContext = {
      subscriptions: [],
    } as any;
    extension.activate(context);

    assert.equal(true, context.subscriptions.length > 0);
  });
});
