#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs-extra');1
const path = require('path');

module.exports = function(root, appPath) {

  const ownPath = path.dirname(
    require.resolve(path.join(__dirname, '..', 'package.json'))
  );

  const templatePath = path.join(ownPath, 'template');
  fs.copySync(templatePath, root);

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  try {
    fs.moveSync(
      path.join(appPath, 'gitignore'),
      path.join(appPath, '.gitignore'),
      []
    );
  } catch (err) {
    // Append if there's already a `.gitignore` file there
    if (err.code === 'EEXIST') {
      const data = fs.readFileSync(path.join(appPath, 'gitignore'));
      fs.appendFileSync(path.join(appPath, '.gitignore'), data);
      fs.unlinkSync(path.join(appPath, 'gitignore'));
    } else {
      throw err;
    }
  }
  
  if (tryGitInit(appPath)) {
    console.log();
    console.log('Initialized a git repository.');
  }
}

function tryGitInit(appPath) {
  let didInit = false;
  try {
    execSync('git --version', {
      stdio: 'ignore'
    });
    if (isInGitRepository()) {
      return false;
    }

    execSync('git init', {
      stdio: 'ignore'
    });
    didInit = true;

    execSync('git add -A', {
      stdio: 'ignore'
    });
    execSync('git commit -m "Initial commit from Egeo CLI"', {
      stdio: 'ignore',
    });
    return true;
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // In the future, we might supply our own committer
      // like Ember CLI does, but for now, let's just
      // remove the Git files to avoid a half-done state.
      try {
        // unlinkSync() doesn't work on directories.
        fs.removeSync(path.join(appPath, '.git'));
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false;
  }
}

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}