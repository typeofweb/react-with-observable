import { danger, warn } from 'danger';
var fs = require('fs');
var path = require('path');

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

// Request changes to src also include changes to tests.
const allFiles = danger.git.modified_files.concat(danger.git.created_files);
const hasAppChanges = allFiles.some(p => p.includes('.tsx'));
const hasTestChanges = allFiles.some(p => p.includes('.spec.tsx'));

const modifiedSpecFiles = danger.git.modified_files.filter(function(filePath) {
  return filePath.match(/\.spec\.(js|jsx|ts|tsx)$/gi);
});

const testFilesIncludeExclusion = modifiedSpecFiles.reduce(
  function(acc, value) {
    var content = fs.readFileSync(value).toString();
    var invalid = content.includes('it.only') || content.includes('describe.only');
    if (invalid) {
      acc.push(path.basename(value));
    }
    return acc;
  },
  [] as string[]
);

if (testFilesIncludeExclusion.length > 0) {
  fail('An `only` was left in tests (' + testFilesIncludeExclusion.join(', ') + ')');
}

if (hasAppChanges && !hasTestChanges) {
  warn('This PR does not include changes to tests, even though it affects app code.');
}
