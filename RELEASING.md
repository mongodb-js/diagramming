## Releasing and Publishing

You can find the published package here: [@mongodb-js/diagramming](https://www.npmjs.com/package/@mongodb-js/diagramming)

Follow these steps to publish a new release:

### 1. Navigate to GitHub Releases
Go to the **Releases** tab in the sidebar of the main repository page.

### 2. Decide on the Version

Choose the version number based on [Semantic Versioning](https://semver.org/):

- `MAJOR.MINOR.PATCH` (e.g., `1.2.3`) — **Do not prefix with `v`**
- **Patch** – For bug fixes or security updates.
- **Minor** – For new features that are backwards compatible.
- **Major** – For breaking changes or significant redesigns.
- **Pre-releases** – For early/in-progress versions, use a suffix like `-alpha.1`, `-beta.2`, or `-rc.1` (e.g., `1.0.0-beta.1`).

### 3. Create the Release
1. Click **"Draft a new release"**. 
2. Create a **new Git tag** with your selected version (e.g., `1.2.3`). 
3. Point the release to the branch you're publishing from (typically `main`).
4. **Generate release notes** based on commit history.

### 4. Monitor the GitHub Workflow

After creating the release:

1. Go to the **Actions** tab. 
2. Look for the workflow triggered by the new release. 
3. This workflow handles building the package and **publishing it to npm**.
