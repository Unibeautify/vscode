import * as path from "path";
import * as fs from "fs";

import { beautifiers } from "../src/beautifiers";

const readmePath = path.resolve(__dirname, "../../README.md");

function main() {
  const newReadmeContents = replaceSupportTable(getReadmeContents());
  // console.log(newReadmeContents);
  setReadmeContents(newReadmeContents);
}

function getReadmeContents(): string {
  return fs.readFileSync(readmePath).toString();
}

function setReadmeContents(newContents: string): void {
  fs.writeFileSync(readmePath, newContents);
}

abstract class SectionReplacer {
  constructor(private section: string) {}

  private get pattern() {
    return new RegExp(`${this.start}(.+\n)+${this.end}`);
  }
  private get start(): string {
    return `<!--START:${this.section}-->\n`;
  }
  private get end(): string {
    return `<!--END:${this.section}-->\n`;
  }

  public replace(original: string): string {
    return original.replace(
      this.pattern,
      `${this.start}${this.contents}\n${this.end}`
    );
  }

  protected abstract get contents(): string;
}

class SupportTableReplacer extends SectionReplacer {
  constructor(private original: string) {
    super("SUPPORT-TABLE");
  }
  public generate(): string {
    return super.replace(this.original);
  }
  protected get contents(): string {
    return this.header;
  }
  private get header(): string {
    return `| # | Beautifier | Documentation |\n| --- | --- | --- |\n${this.rows.join(
      "\n"
    )}`;
  }
  private get rows(): string[] {
    return this.beautifierNames
      .sort()
      .map((name, index) => `| ${index + 1} | ${name} | ${docUrl(name)} |`);
  }
  private get beautifierNames(): string[] {
    return beautifiers.map(beautifier => beautifier.name);
  }
}

function docUrl(beautifierName: string): string {
  return `https://unibeautify.com/docs/beautifier-${slugify(
    beautifierName
  )}.html`;
}

function slugify(beautifierName: string): string {
  return beautifierName.split(" ").join("-").toLocaleLowerCase();
}

function replaceSupportTable(original: string): string {
  return new SupportTableReplacer(original).generate();
}

main();
