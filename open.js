const alfy = require("alfy");
const { exec } = require("child_process");
const arg = process.argv[2];

const codeCommand = process.env.insiders === "1" ? "code-insiders" : "code";

exec(
  `${codeCommand} -n '${decodeURI(arg.replace("file://", ""))}'`,
  (err, stdout, stderr) => {
    if (err) {
      return;
    }
  }
);
