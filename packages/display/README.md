# @tailor-cms/ce-video-display

End-user component for the **Video** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Renders the element as learners see it in published content.

## Installation

```sh
npm install @tailor-cms/ce-video-display
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import { Display } from '@tailor-cms/ce-video-display';
```

## Element

| Property | Value |
| --- | --- |
| Name | Video |
| Type | `VIDEO` |
| Icon | [`mdi-video`](https://pictogrammers.com/library/mdi/) |
| Composite | No |

## Packages

This element ships as four packages, published together from the
[`ce-video`](https://github.com/tailor-cms/ce-video) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-video-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-video-manifest) | Shared element definition |
| [`@tailor-cms/ce-video-edit`](https://www.npmjs.com/package/@tailor-cms/ce-video-edit) | Authoring component |
| [`@tailor-cms/ce-video-display`](https://www.npmjs.com/package/@tailor-cms/ce-video-display) | End-user component |
| [`@tailor-cms/ce-video-server`](https://www.npmjs.com/package/@tailor-cms/ce-video-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.
