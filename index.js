const os = require("os");
const alfy = require("alfy");
const alfredNotifier = require("alfred-notifier");
const { title } = require("process");

// Checks for available update and updates the `info.plist`
alfredNotifier();

const userHomeDir = os.homedir();
const codeCachePath = `${userHomeDir}/Library/Application Support/Code/Backups/workspaces.json`;
const codeCacheJson = require(codeCachePath);

const recentWorkspace = [...codeCacheJson.folderURIWorkspaces].filter(Boolean);

const emptyOutput = recentWorkspace
  .map(file => {
    const title = file.replace(/.*\//i, "");
    return {
      title: title,
      subtitle: file,
      arg: file,
    };
  })
  // Because latest recent in bottom
  .reverse();

alfy.output(
  alfy.inputMatches(emptyOutput, (item, input) => {
    return item.title.includes(input);
  })
);
