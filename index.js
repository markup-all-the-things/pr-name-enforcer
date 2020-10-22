const core = require('@actions/core');
const github = require('@actions/github');

const getPrNumber = () => {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }
  return pullRequest.number;
}

const getPrName = async (client) => {
  const prNumber = getPrNumber();
  if (!prNumber) {
    core.error("Could not get pull request number from context, exiting");
    return;
  }
  const { data: pullRequest } = await client.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: prNumber
  });

  return pullRequest.name
}

async function run() {
  try {
    const token = core.getInput("repo-token", { required: true });
    const regex = new RegExp(core.getInput("regex", { required: true }), core.getInput("regex-flags", { required: false }))
    const errorMessage = core.getInput("error-message", { required: false }) || `PR name does not match provided regex: ${regex}`

    const client = github.getOctokit(token)

    const prName = await getPrName(client)

    if (!prName.match(regex)) {
      core.setFailed(errorMessage);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();