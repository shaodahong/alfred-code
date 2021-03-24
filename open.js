const { exec } = require("child_process");
const arg = process.argv[2];

exec(`code -n ${arg.replace("file://", "")}`, (err, stdout, stderr) => {
  if (err) {
    return;
  }
});
