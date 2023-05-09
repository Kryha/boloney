# Contributing to Boloney!

We would love for you to contribute to Boloney! and help make it even better than it is
today! As a contributor, here are the guidelines we would like you to follow:

- [Code of Conduct](#coc)
- [Question or Problem?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Submission Guidelines](#submit)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="coc"></a> Code of Conduct

Help us keep Boloney! open and inclusive. Please read and follow our [Code of Conduct](code_of_conduct.md).

## <a name="question"></a> Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests.

If you would like to chat about the question in real-time, you can reach out via [Aleo Discord](https://discord.gg/aleohq) in the "Boloney" channel.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the [issues tracker](https://github.com/Kryha/boloney/issues), maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will systematically ask you to provide some clear steps to reproduce this issue. Keep in mind that maintainers invest their time trying to reproduce and fix bugs, and any extra information you provide will speed up the resolution of the issue. Please, consider the time you put into asking properly for an issue to be fixed. We would like to spend our time fixing issues and adding new features, not investigating irrelevant reports.

Include things like:

- Version of Boloney! used
- Browser and version used
- Step by step guide on how reach the issue

You can file new [issues in github](https://github.com/Kryha/boloney/issues)

### <a name="branch-naming"></a> Branch Naming

Accepted branch prefixes:

- `feature/` - for new features
- `fix/` - for bug fixes
- `hotfix/` - for quick fixes to the production branch
- `docs/` - for documentation changes
- `test/` - for adding tests
- `chore/` - for updating build tasks, package manager configs, etc
- `refactor/` - for refactoring code

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/Kryha/boloney/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
2. Fork the Kryha/boloney repo.
3. Make your changes in a new git branch:

   ```shell
   git checkout -b fix/my-fix-branch develop
   ```

4. Create your patch, **including appropriate test cases**.
5. Follow our [Coding Rules](#rules).
6. Run the full Boloney! test suite, as described in the [Readme][readme],
   and ensure that all tests pass.
7. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

8. Push your branch to GitHub:

   ```shell
   git push origin fix/my-fix-branch
   ```

9. In GitHub, send a pull request to `boloney:develop`.

- If we suggest changes then:

  - Make the required updates.
  - Re-run the Boloney! test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase develop -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete fix/my-fix-branch
  ```

- Check out the develop branch:

  ```shell
  git checkout develop -f
  ```

- Delete the local branch:

  ```shell
  git branch -D fix/my-fix-branch
  ```

- Update your develop with the latest upstream version:

  ```shell
  git pull --ff upstream develop
  ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.
- Make sure you're correctly setting up your IDE to follow the project config files for ESLint & Prettier.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the Boloney! change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```txt
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Check the [last commits](https://github.com/Kryha/boloney/commits)

Samples:

```txt
docs(changelog): update changelog to beta.5
```

```txt
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **feature**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **chore**: A code change that improves performance, changes in the format and style of the code, refactoring for clarity, upgrades a dependency, etc.
- **build**: Changes that affect the build system or external dependencies (example scopes: example kustomize, skaffold, docker)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Azure, GithubActions)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- **frontend**
- **backend**
- **deployment**
- **documentation**
- **infrastructure**

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

<hr>

[readme]: https://github.com/Kryha/boloney/blob/develop/README.md
[github]: https://github.com/Kryha/boloney
