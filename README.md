# HTML Typer

**HTML Typer** is a lightweight TypeScript package that brings your HTML content to life with a smooth typewriter effect. It auto-sanitizes input using DOMPurify, supports nested elements.

## Features

- **Typewriter Animation:** Gradually renders text for a captivating effect.
- **Auto-Sanitization:** Uses DOMPurify to secure your content against XSS.
- **Nested HTML Support:** Processes complex HTML structures.
- **TypeScript-Ready:** Fully typed with generated declaration files.

## Installation

Install HTML Typer and its dependencies (only TypeScript and DomPurify) using npm:

```bash
npm install @goodpie/html-typer
```

For React, install the following:

```bash
npm install @goodpie/html-typer-react
```

## Usage

### Vanilla JavaScript/TypeScript

```typescript
import { animateHtmlRendering } from 'html-typer';

const container = document.getElementById('myContainer');
const htmlContent = `<p>Hello, <strong>World!</strong></p>`;

animateHtmlRendering(container, htmlContent, 50).then(() => {
  console.log('Animation complete!');
});
```
### Testing

This project uses Jest. To run tests:

```bash
npm run test
```

## License

This project is licensed under the MIT License.