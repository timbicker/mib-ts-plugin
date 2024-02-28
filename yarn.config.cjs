/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');

module.exports = defineConfig({
  async constraints({Yarn}) {
    function checkDependency(name, version) {
      for (const dep of Yarn.dependencies({ ident: name })) {
        dep.update(version);
      }
    }

    for (const workspace of Yarn.workspaces()) {
      workspace.set('engines.node', `18`);
    }
    checkDependency('react', '^18')
    checkDependency('typescript', '^5')
  },
});
