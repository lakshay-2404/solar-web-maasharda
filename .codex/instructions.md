# Codex Local Workflow

## Workflow Orchestration
1. Default to plan mode for any non-trivial task with 3 or more steps or architectural choices.
2. If execution goes sideways, stop, re-ground in facts, and re-plan before continuing.
3. Use plan mode for verification work too, not just implementation.
4. Write detailed specs up front so implementation choices are explicit.

## Subagent Strategy
1. Use subagents liberally for research, repo exploration, and parallel analysis.
2. Keep one focused task per subagent so findings stay clean and reusable.
3. Push expensive discovery work out of the main context window whenever it helps clarity.

## Self-Improvement Loop
1. After any user correction, update `tasks/lessons.md`.
2. Turn the correction into a durable rule that prevents the same mistake.
3. Review relevant lessons at the start of each session.

## Verification Before Done
1. Do not mark work complete without proving it works.
2. Compare behavior before and after changes when that comparison matters.
3. Run tests, inspect logs, and demonstrate correctness.
4. Ask whether the result would pass staff-level review before closing the task.

## Demand Elegance
1. For non-trivial changes, pause and check whether there is a simpler or more elegant approach.
2. If the current fix feels hacky, replace it with the cleaner design before presenting it.
3. Keep simple fixes simple and avoid over-engineering.

## Autonomous Bug Fixing
1. When a bug is reported, inspect logs, traces, and failing checks directly.
2. Fix root causes instead of stopping for hand-holding.
3. Minimize context switching for the user.

## Task Management
1. Write the plan to `tasks/todo.md` with checkable items before implementation.
2. Check in before major implementation work.
3. Mark progress in `tasks/todo.md` as work advances.
4. Add a concise review section to `tasks/todo.md` after verification.
5. Capture durable lessons in `tasks/lessons.md`.

## Core Principles
1. Simplicity first: keep changes as small and direct as possible.
2. No lazy fixes: find the root cause and meet senior-engineer quality standards.
3. Minimal impact: touch only what is necessary and avoid collateral regressions.
