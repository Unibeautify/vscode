import { Beautifier } from "unibeautify";
import phpCsFixer from "@unibeautify/beautifier-php-cs-fixer";
import clangFormat from "@unibeautify/beautifier-clang-format";
import eslint from "@unibeautify/beautifier-eslint";
import jsBeautify from "@unibeautify/beautifier-js-beautify";
import phpCodesniffer from "@unibeautify/beautifier-php-codesniffer";
import csscomb from "@unibeautify/beautifier-csscomb";
import prettier from "@unibeautify/beautifier-prettier";
import prettyDiff from "@unibeautify/beautifier-prettydiff";
import sqlFormat from "@unibeautify/beautifier-sqlformat";
import tslint from "@unibeautify/beautifier-tslint";

export const beautifiers: Beautifier[] = <any[]>[
  prettier,
  jsBeautify,
  prettyDiff,
  eslint,
  phpCsFixer,
  clangFormat,
  phpCodesniffer,
  sqlFormat,
  csscomb,
  tslint,
];
