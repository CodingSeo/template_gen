#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
    .option('-gh -github', 'github message sets')
    .option('-gl -gitlab', 'gitlab message sets')

program.parse(process.argv);

const option = program.opts();
if (option.Github) {
    console.log('upcoming')
}
else if (option.Gitlab) {
    copyRecursiveSync(__dirname + '/templates/gitlab', '.gitlab')
} else {
    program.help();
}

function mkdir(dir_path) {
    if (!fs.existsSync(dir_path)) {
        fs.mkdirSync(dir_path, { recursive: true });
    }
}

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        mkdir(dest);
        fs.readdirSync(src).forEach((child) => 
            copyRecursiveSync(path.join(src, child), path.join(dest, child)));
    } else {
        fs.copyFileSync(src, dest);
    }
}