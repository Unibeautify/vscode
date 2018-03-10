import { Beautifier } from "unibeautify";
import Prettier from "@unibeautify/beautifier-prettier";
// const PrettyDiff: Beautifier = require("beautifier-prettydiff");

// const CustomBeautifier: Beautifier = {
//     name: "Test",
//     options: {
//         _: true,
//         CSS: true,
//         JavaScript: false,
//         TypeScript: {
//             // indent_size: true,
//             new_name: "indent_size",
//             // field1: true,
//             indent_size(value) { // number
//                 return value;
//             },
//             indent_char(value) { // string
//                 return value;
//             },
//             indent_preamble(value) { // boolean
//                 return value;
//             },
//             field3: [["indent_size", "indent_char"], (options) => {
//                 return options.indent_size + options.indent_char;
//             }]
//         }
//     },
//     beautify(data) {
//         return Promise.resolve("");
//     }
// };

export const beautifiers: Beautifier[] = [
  Prettier
  // PrettyDiff,
  // CustomBeautifier
];
