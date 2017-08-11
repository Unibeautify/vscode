import { Beautifier } from "unibeautify";
const PrettyDiff: Beautifier = require("beautifier-prettydiff");

export const beautifiers: Beautifier[] = [
    PrettyDiff,
];
