// Documentation generation script for library UI components
// Uses react-docgen-typescript to parse component files and generate markdown docs
import * as fs from "fs";
import * as path from "path";
import { parse, ParserOptions, ComponentDoc } from "react-docgen-typescript";
import { execSync } from "child_process";

// Path to components directory
const componentsDir = path.join(__dirname, "..", "components");
// Directories to skip (not containing components)
const SKIP_DIRECTORIES: string[] = ["assets", "icons", "utils"];

const parserOptions: ParserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop): boolean =>
    !prop.parent ||
    !!(prop.parent.fileName && !prop.parent.fileName.includes("node_modules")),
};

// Get files that have been staged for commit
function getChangedFiles(): string[] {
  try {
    const stagedChanges = execSync("git diff --staged --name-only", {
      encoding: "utf-8",
    })
      .trim()
      .split("\n");

    return stagedChanges
      .filter((file) => file !== "")
      .filter((file) => file.startsWith("components/") && file.endsWith(".tsx"))
      .filter(
        (file) =>
          !file.includes(".stories.") &&
          !file.includes(".test.") &&
          !file.includes(".spec.")
      );
  } catch (error) {
    console.error(`Error getting changed files: ${(error as Error).message}`);
    return [];
  }
}

// Convert component props to markdown table format
function toMarkdownTable(props: Record<string, any>): string {
  if (!props || Object.keys(props).length === 0) return "";

  let md =
    "| Prop | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n";

  Object.entries(props).forEach(([name, prop]) => {
    const typeName = prop.type.name
      .replace(/\s\|\s(undefined|null)$/, "?")
      .replace(/\((.*)\)/, "$1");

    md += `| ${name} | \`${typeName}\` | ${
      prop.defaultValue?.value ? `\`${prop.defaultValue.value}\`` : ""
    } | ${prop.description || ""} |\n`;
  });

  return md;
}

// Process a component directory to generate documentation
function processComponentDirectory(
  dirPath: string,
  componentName: string
): boolean {
  const filesToCheck = fs
    .readdirSync(dirPath)
    .filter(
      (f) =>
        f.endsWith(".tsx") &&
        !f.includes(".stories") &&
        !f.includes(".test") &&
        !f.includes(".spec")
    );

  if (filesToCheck.length === 0) {
    return false;
  }

  for (const file of filesToCheck) {
    const fullPath = path.join(dirPath, file);

    try {
      const docs: ComponentDoc[] = parse(fullPath, parserOptions);

      if (docs.length) {
        let mainComponentDoc: ComponentDoc | null = null;
        let utilityDocs: ComponentDoc[] = [];
        let variantDocs: ComponentDoc[] = [];

        // First pass - identify main component and variants
        for (const doc of docs) {
          const name = doc.displayName || "";

          // Check for variant exports
          if (name === "variants" || name.includes("Variant")) {
            variantDocs.push(doc);
            continue;
          }

          // Look for exact component name match
          if (name === componentName || name === file.replace(".tsx", "")) {
            mainComponentDoc = doc;
            break;
          }
        }

        // If no exact match, look for components that start with capital letter
        if (!mainComponentDoc) {
          for (const doc of docs) {
            const name = doc.displayName || "";
            if (name && /^[A-Z]/.test(name) && !variantDocs.includes(doc)) {
              mainComponentDoc = doc;
              break;
            }
          }
        }

        // Last resort - find any non-variant doc or use first doc
        if (!mainComponentDoc && docs.length > 0) {
          for (const doc of docs) {
            if (!variantDocs.includes(doc)) {
              mainComponentDoc = doc;
              break;
            }
          }

          if (!mainComponentDoc && docs.length > 0) {
            mainComponentDoc = docs[0];
          }
        }

        // Separate remaining docs into utilities
        if (mainComponentDoc) {
          utilityDocs = docs.filter(
            (doc) => doc !== mainComponentDoc && !variantDocs.includes(doc)
          );
        }

        if (mainComponentDoc) {
          // Use component name as fallback if displayName is 'variants'
          const mainComponentName =
            mainComponentDoc.displayName === "variants"
              ? componentName
              : mainComponentDoc.displayName || componentName;

          // Start building markdown content
          let md = `# ${mainComponentName}\n\n${mainComponentDoc.description ? mainComponentDoc.description + "\n\n" : ""}`;
          const propsTable = toMarkdownTable(mainComponentDoc.props);
          if (propsTable) {
            md += `## Props\n\n${propsTable}`;
          }

          // Add variant docs with a clear section header
          variantDocs.forEach((variantDoc) => {
            if (variantDoc.displayName) {
              const variantPropsTable = toMarkdownTable(variantDoc.props);
              if (variantPropsTable) {
                md += `\n\n## ${variantDoc.displayName} Props\n\n${variantPropsTable}`;
              }
            }
          });

          // Add utility docs
          utilityDocs.forEach((utilDoc) => {
            if (utilDoc.displayName) {
              const utilPropsTable = toMarkdownTable(utilDoc.props);
              if (utilPropsTable) {
                md += `\n\n## ${utilDoc.displayName} Props\n\n${utilPropsTable}`;
              }
            }
          });

          const outputFilename = `${componentName}.md`;

          const outputPath = path.join(dirPath, outputFilename);
          fs.writeFileSync(outputPath, md);

          console.log(`Generated docs for ${mainComponentName}`);
          return true;
        }
      }
    } catch (error) {
      console.error(`Error parsing ${fullPath}: ${(error as Error).message}`);
    }
  }

  return false;
}

// Generate documentation for components that have been staged for commit
function generateDocsForChangedFiles(): void {
  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    console.log("No changed component files detected.");
    return;
  }

  const componentDirsToProcess = new Set<string>();

  // Extract component directories from changed files
  changedFiles.forEach((file) => {
    const parts = file.replace("components/", "").split("/");

    if (parts.length >= 1) {
      const componentDir = parts[0];

      // Skip directories that don't contain components
      if (!SKIP_DIRECTORIES.includes(componentDir)) {
        componentDirsToProcess.add(componentDir);
      }
    }
  });

  // Process each component directory
  componentDirsToProcess.forEach((componentDir) => {
    const dirPath = path.join(componentsDir, componentDir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      processComponentDirectory(dirPath, componentDir);
    }
  });
}

generateDocsForChangedFiles();
