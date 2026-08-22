# Research sources

Initial primary sources informing the feasibility assessment. Last reviewed 2026-08-22.

## WordPress application and data APIs

- [REST API Handbook](https://developer.wordpress.org/rest-api/) — describes using WordPress data to build new admin and front-end experiences.
- [REST API endpoint reference](https://developer.wordpress.org/rest-api/reference/) — core entities including posts, revisions, media, templates, navigation, and blocks.
- [REST API authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/) — cookie authentication, nonces, capabilities, and application passwords.
- [WordPress Core Data](https://developer.wordpress.org/block-editor/reference-guides/data/data-core/) — entity records, autosaves, revisions, permissions, undo, and persistence actions.
- [Heartbeat API](https://developer.wordpress.org/plugins/javascript/heartbeat-api/) — near-real-time polling that can participate in editor presence and locking behavior.

## Editor and rendering platform

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/) — public components for creating a custom block editor.
- [Building a custom block editor](https://developer.wordpress.org/block-editor/how-to-guides/platform/custom-block-editor/) — example use of `BlockEditorProvider` and a custom application shell.
- [`parse_blocks()`](https://developer.wordpress.org/reference/functions/parse_blocks/) — parses serialized block content into a block tree.
- [`render_block` filter](https://developer.wordpress.org/reference/hooks/render_block/) — filters each rendered block with access to parsed block data.
- [Rendered Blocks REST endpoint](https://developer.wordpress.org/rest-api/reference/rendered-blocks/) — authoritative server rendering for registered dynamic blocks.
- [Block API versions](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/) — iframe-editor behavior and compatibility requirements.

## Structured content and constrained design

- [Block Bindings](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-bindings/) — connects block attributes to metadata, post/term data, and pattern overrides.
- [Block Locking API](https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/block-locking/) — move, remove, edit, and content-only restrictions.
- [Introduction to Patterns](https://developer.wordpress.org/themes/patterns/introduction-to-patterns/) — synced and unsynced pattern behavior.
- [Synced Pattern overrides](https://developer.wordpress.org/news/2024/06/an-introduction-to-overrides-in-synced-patterns/) — editable instance content while preserving synchronized design.
- [`theme.json` global settings and styles](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/) — design tokens, control restrictions, and block style variations.
- [Block stylesheets](https://developer.wordpress.org/themes/features/block-stylesheets/) — per-block theme styles.

## Current Core direction

- [WordPress 7.0 Field Guide](https://make.wordpress.org/core/2026/05/14/wordpress-7-0-field-guide/) — modernized admin, pattern editing, expanded `contentOnly`, PHP-only block registration, DataViews/DataForm, and Block Bindings changes.
- [WordPress 7.0 “Armstrong”](https://wordpress.org/news/2026/05/armstrong/) — release overview.
- [DataViews and DataForm in WordPress 7.0](https://make.wordpress.org/core/2026/03/04/dataviews-dataform-et-al-in-wordpress-7-0/) — current declarative data UI capabilities.
- [Client-Side Abilities API in WordPress 7.0](https://make.wordpress.org/core/2026/03/24/client-side-abilities-api-in-wordpress-7-0/) — discoverable, annotated actions that may inform future agent integration.

## Related product experiment

- [OpenStation repository](https://github.com/WordPress/openstation) — demonstrates an opt-in WordPress admin shell built as a plugin using public hooks, native windows, iframes, REST endpoints, and a same-origin message bridge.
- [OpenStation plugin page](https://wordpress.org/plugins/desktop-mode/) — user-facing positioning and current feature overview.

## Research caveat

Core capabilities demonstrate feasibility; they do not determine the WPs UX. Internal or unstable Gutenberg APIs should not become accidental foundations without explicit compatibility testing and a version strategy.

