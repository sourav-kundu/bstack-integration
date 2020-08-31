/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
 const { Octokit } = require("@octokit/rest");
 const octokit = new Octokit();

module.exports = app => {
  // Your code here

  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })

  app.on('pull_request.opened', async context => {
    const repoOwner = context.payload.repository.owner.login;
    const repoName = context.payload.repository.name;
    const commit_sha = context.payload.pull_request.base.sha;
    const checksName = "BrowserStack Tests";

/**    await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
    owner: repoOwner,
    repo: repoName,
    name: 'BrowserStack Ruby Tests',
    head_sha: commit_sha,
    mediaType: {
      previews: [
        'antiope'
      ]
    }
  }) */
  octokit.checks.create({
        repoOwner,
repoName,
checksName,
commit_sha })
console.log('Check created');
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
