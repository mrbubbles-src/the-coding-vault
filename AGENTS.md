# Agent Instructions

- Ask for clarification when current context is insufficient.
- Prioritize project files over assumptions.
- Source priority: project files > model knowledge.
- Never hallucinate APIs, files, paths, or framework behavior.
- Load documentation files only when the task explicitly requires guidance from them.
- Never load entire folders or unrelated docs.
- Load documentation only when the task explicitly requires guideline guidance.
- Use task keywords (e.g., “commit”, “naming”, “documentation”) to determine which guidelines to load.
- Relevant guidelines live under `documentation/agentic-guidelines/**/*-guidelines.md`; Load only files that match the task domain.
- Keep units of code small and responsibility-focused.
- Never commit secrets or sensitive data.
- Handle errors explicitly; if uncertain, ask for clarification instead of guessing.
- Favor clarity and correctness over automation.
- Only consider external project tools (MCP, DevTools) when the task specifies their use.
- Never create or update documentation unless explicitly asked to do so.
- Always follow documentation guidelines if asked to create or update documentation.
- Prefer import alias (`@/`) where configured; avoid relative up-navigations when avoidable.
