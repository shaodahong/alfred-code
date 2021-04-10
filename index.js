const os = require("os");
const alfy = require("alfy");
const alfredNotifier = require("alfred-notifier");

// Checks for available update and updates the `info.plist`
alfredNotifier();

const userHomeDir = os.homedir();
const codeCachePath = `${userHomeDir}/Library/Application Support/Code/storage.json`;
const codeCacheJson = require(codeCachePath);
let emptyOutput = [];

try {
  if (alfy.input) {
    return;
  }

  emptyOutput = [...codeCacheJson.lastKnownMenubarData.menus.File.items]
    .find(({ label }) => label === "Open &&Recent")
    .submenu.items.filter(({ uri }) => !!uri)
    .map(({ uri }) => {
      const path = uri.path;
      const title = path.replace(/.*\//i, "");
      return {
        title,
        subtitle: path.replace("file://", ""),
        arg: path,
      };
    });
} catch (error) {
  alfy.log(error);
}

alfy.output(
  alfy.inputMatches(emptyOutput, (item, input) => {
    return item.title.includes(input);
  })
);
