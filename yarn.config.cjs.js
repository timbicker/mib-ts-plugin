/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');

module.exports = defineConfig({
  async constraints({Yarn}) {
    for (const workspace of Yarn.workspaces()) {
      workspace.set('engines.node', `18`);
    }
    for (const dep of Yarn.dependencies({ ident: 'react' })) {
      dep.update(`18`);
    }
    for (const dep of Yarn.dependencies({ ident: 'typescript' })) {
      dep.update(`5`);
    }
  },
});
