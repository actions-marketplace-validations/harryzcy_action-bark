import * as github from '@actions/github'

interface NotificationInput {
  status: string
  title: string
  body: string
  github_server_url: string
}

interface Notification {
  title: string
  body: string
  github_runs_url: string
}

export function generateNotification(input: NotificationInput): Notification {
  const { repo, owner } = github.context.repo
  const { runId } = github.context
  const url = `${input.github_server_url}/${owner}/${repo}/actions/runs/${runId}`

  if (input.status === 'custom') {
    return {
      title: input.title,
      body: input.body,
      github_runs_url: url
    }
  }

  let status_word: string
  if (input.status === 'success') status_word = 'succeeded'
  if (input.status === 'failure') status_word = 'failed'
  else status_word = 'is cancelled'

  const body = `Actions #${github.context.runNumber} on ${repo} ${status_word}`

  return {
    title: 'Github Actions',
    body,
    github_runs_url: url
  }
}
