import { describe, expect, test } from 'bun:test';
import { buildProjects, type GitHubRepository } from './github-projects';

function repository(overrides: Partial<GitHubRepository>): GitHubRepository {
  return {
    name: 'example',
    html_url: 'https://github.com/arifbazli/example',
    description: 'GitHub description',
    language: 'TypeScript',
    homepage: null,
    topics: [],
    fork: false,
    archived: false,
    private: false,
    pushed_at: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('buildProjects', () => {
  test('drops forks, archived, private and the profile README repository', () => {
    const projects = buildProjects(
      [
        repository({ name: 'kept' }),
        repository({ name: 'forked', fork: true }),
        repository({ name: 'old', archived: true }),
        repository({ name: 'secret', private: true }),
        repository({ name: 'ArifBazli' }),
      ],
      'arifbazli',
      'en',
    );
    expect(projects.map((p) => p.name)).toEqual(['kept']);
  });

  test('uses the curated outcome line in the requested locale', () => {
    const [en] = buildProjects([repository({ name: 'agent-code-search' })], 'arifbazli', 'en');
    const [ms] = buildProjects([repository({ name: 'agent-code-search' })], 'arifbazli', 'ms');
    expect(en?.summary).toStartWith('Lets AI coding agents');
    expect(ms?.summary).toStartWith('Membolehkan coding agent');
    expect(en?.featured).toBe(true);
  });

  test('falls back to the GitHub description for new repositories', () => {
    const [project] = buildProjects([repository({ name: 'brand-new' })], 'arifbazli', 'en');
    expect(project?.summary).toBe('GitHub description');
    expect(project?.featured).toBe(false);
  });

  test('lists featured projects in curated order, then the rest by latest push', () => {
    const projects = buildProjects(
      [
        repository({ name: 'older', pushed_at: '2026-01-01T00:00:00Z' }),
        repository({ name: 'agent-code-search' }),
        repository({ name: 'newer', pushed_at: '2026-06-01T00:00:00Z' }),
        repository({ name: 'AI-Agent-Guardrails-Hub' }),
      ],
      'arifbazli',
      'en',
    );
    expect(projects.map((p) => p.name)).toEqual([
      'AI-Agent-Guardrails-Hub',
      'agent-code-search',
      'newer',
      'older',
    ]);
  });

  test('treats an empty homepage as absent', () => {
    const [project] = buildProjects([repository({ homepage: '  ' })], 'arifbazli', 'en');
    expect(project?.homepage).toBeUndefined();
  });
});
