#!/usr/bin/env node

const { execSync } = require("child_process");
const inquirer = require("inquirer");
const fs = require("fs");
const process = require("process");
const path = require("path");
const figlet = require("figlet");
const fs_extra = require("fs-extra");
const delay = require("delay");

// path base
const pathBase = process.cwd();
console.log("path: " + pathBase);

const questionsConsole = (value) => {
  const questions = [
    {
      name: "folderName",
      type: "input",
      message: value + " What name would you like to use for the new project? ",
    },
    {
      type: "list",
      name: "engine",
      message: "Which template engine would you like to use?",
      // choices may be defined as an array or a function that returns an array
      choices: ["HTML5", "Handlebars", "Pug", "EJS"],
      default: "HTML5",
    },
  ];
  return inquirer.prompt(questions);
};

//Make main project folder
const createFile = (data) => {
  fs.mkdir(data.folderName, function (err) {
    if (err) {
      return console.error(err);
    }
    // path and init a project nodejs
    if (fs.existsSync(data.folderName)) {
      let createdAt = new Date();
      console.log("Project folder was been created! at: ", createdAt);
      try {
        // Change the directory
        process.chdir(data.folderName);
        console.log("Directory has successfully been changed.");
        console.log("");
        console.log("Node.js initialization...");
        execSync(
          `npm init -y && npm install --save @babel/node bcrypt consign consolidate cors express json jsonwebtoken mongoose morgan nodemailer path rimraf && npm install --save-dev  @babel/cli @babel/core @babel/preset-env nodemon`,
          (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          }
        );
        if (
          fs.existsSync(path.join(__dirname, data.folderName, "package.json"))
        ) {
          console.log("✈️ ... creating scripts ...");

          const pkgJsonPath =
            require.main.paths[0].split("node_modules")[0] +
            `${data.folderName}/package.json`;

          const json = require(pkgJsonPath);

          if (!json.hasOwnProperty("scripts")) {
            json.scripts = {};
          }
          json.scripts["build"] =
            "babel src -d dist --source-maps --copy-files";
          json.scripts["serve"] = "babel-node src/index.js";
          json.scripts["start-dev"] = "nodemon src/index.js --exec babel-node";
          json.scripts["clean"] = "rimraf dist";
          json.scripts["start"] = "node dist/index.js";
          json.scripts["watch-dist"] = "nodemon dist/index.js";
          fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2));
        }
      } catch (err) {
        // Printing error if occurs
        console.error("error while changing directory");
      }

      switch (data.engine) {
        case "HTML5":
          console.log("Yuem is running with HMTL5");

          console.log(process.cwd()); // carpeta del proyecto creada

          let source = "../lib/html";
          let destination = process.cwd();

          fs_extra.copy(source, destination, function (err) {
            if (err) {
              console.log(
                "An error occured while the project have been created!"
              );
              return console.error(err);
            }
            console.log("Creation project: completed!");
          });
          break;

        case "Handlebars":
          console.log("Yuem is running with Handlebars");

          console.log(process.cwd()); // carpeta del proyecto creada
          execSync(
            `npm install --save express-handlebars`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }
              console.log(`stdout: ${stdout}`);
              console.log(" ");
            }
          );
          let sourceHBS = "../lib/hbs";
          let destinationHBS = process.cwd();

          fs_extra.copy(sourceHBS, destinationHBS, function (err) {
            if (err) {
              console.log(
                "An error occured while the project have been created!"
              );
              return console.error(err);
            }
            console.log("Creation project: completed!");
          });
          break;

        case "Pug":
          console.log("Yuem is running with Pug");

          console.log(process.cwd()); // carpeta del proyecto creada
          execSync(`npm install --save pug`, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(" ");
          });
          let sourcePUG = "../lib/pug";
          let destinationPUG = process.cwd();

          fs_extra.copy(sourcePUG, destinationPUG, function (err) {
            if (err) {
              console.log(
                "An error occured while the project have been created!"
              );
              return console.error(err);
            }
            console.log("Creation project: completed!");
          });
          break;

        case "EJS":
          console.log("Yuem is running with EJS");

          console.log(process.cwd()); // carpeta del proyecto creada
          execSync(`npm install --save ejs`, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(" ");
          });
          let sourceEJS = "../lib/ejs";
          let destinationEJS = process.cwd();

          fs_extra.copy(sourceEJS, destinationEJS, function (err) {
            if (err) {
              console.log(
                "An error occured while the project have been created!"
              );
              return console.error(err);
            }
            console.log("Creation project: completed!");
          });
          break;

        default:
          break;
      }
    }
    //end folder
  });
};

// IIFE (Immediately Invoked Function Expression)
const customDelay = delay.createWithTimers({ clearTimeout, setTimeout });
(async () => {
  await fs.readFile("./common/yuem.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log(data);
    }
  });
  const result = await customDelay(5000, { value: "🧛‍♀️" });
  createFile(await questionsConsole(result));
})();
