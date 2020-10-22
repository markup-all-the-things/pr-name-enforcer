# Pull Request Name Enforcer

github action for enforcing regex matching name on PR.

## Usage

### Create Workflow

Create a workflow (eg: `.github/workflows/pr-name-enforcer.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) to utilize the action with content:

```
# This workflow will enforce name on pull requests.

name: 'PR Name Enforcer'
on:
    pull_request:
        types: [opened, edited, reopened]

jobs:
    enforce:
        runs-on: ubuntu-latest

        steps:
            - uses: derkinderfietsen/pr-name-enforcer@v1
              with:
                  repo-token: '${{ secrets.GITHUB_TOKEN }}'
                  regex: '/^(feat|fix)\:\s((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)\s([\-\w\/\\\.\_\{\}\(\)]+\s+){4,}/'
                  regex-flags: 'gm'

```

_Note: This grants access to the `GITHUB_TOKEN` so the action can make calls to GitHub's rest API_