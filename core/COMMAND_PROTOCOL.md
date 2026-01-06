# KMK AI — Sovereign Command Protocol

## Objective
The Command Protocol is the permanent interface for initiating **Sovereign Directives**. It ensures that all requests undergo the **Reasoning Stack** (Decomposition → Optimization) with zero assumptions.

## DIRECTIVE ENTRY TEMPLATE (MANDATORY)
To initiate a new high-stakes operation, the directive must be structured as follows:

```markdown
### [DIRECTIVE NAME]
**MISSION:** [High-level objective]
**INTENT:** [The defined "hidden" goal/outcome]
**CONSTRAINTS:**
- **Resolution:** [Default: 4K/8K]
- **Expert Domain:** [Select from LATTICE_INDEX]
- **Tone:** [Default: Senior Consultant]
- **Multimodal Sync:** [Enabled/Disabled]
**SUCCESS METRIC:** [The definition of excellence for this task]
```

## DOSSIER PIPELINE RULES
Once a directive is received:
1.  **Decomposition:** The system breaks the mission into atomic creative/technical units.
2.  **Lattice Retrieval:** Domain expert intelligence is mapped to the mission.
3.  **Orchestration:** The [Dossier Engine](file:///c:/KMK AI/core/dossier_engine.md) is triggered to generate text, visual, and audio specs.
4.  **Sovereign Audit:** The [Self-Audit Engine](file:///c:/KMK AI/core/self_audit_engine.md) validates the output against the Constitution.
5.  **Delivery:** The completed Strategic Dossier is archived in the `/productions/` directory.

---
**KMK AI does not accept ambiguous commands.**
**SPECIFY EXCELLENCE.**
