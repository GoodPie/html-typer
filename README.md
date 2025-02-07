# HTML Typer

**HTML Typer** is a lightweight TypeScript package that brings your HTML content to life with a smooth typewriter effect. It auto-sanitizes input using DOMPurify, supports nested elements, and even comes with a ready-to-use React component for seamless integration into dynamic UIs.

## Features

- **Typewriter Animation:** Gradually renders text for a captivating effect.
- **Auto-Sanitization:** Uses DOMPurify to secure your content against XSS.
- **Nested HTML Support:** Processes complex HTML structures.
- **React Integration:** Includes a dedicated React component for effortless use.
- **TypeScript-Ready:** Fully typed with generated declaration files.

## Installation

Install HTML Typer and its dependencies (only TypeScript and DomPurify) using npm:

```bash
npm install html-typer
```

If you're using React, ensure you have React installed in your project.

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

### React

Please keep in mind, React was an after thought. This is a very basic wrapper on the JS functionality.

```tsx
import React from 'react';
import { HTMLTyper } from 'html-typer/react';

function App() {
  return (
    <div>
      <HTMLTyper html="<p>Hello, <strong>World!</strong></p>" speed={50} />
    </div>
  );
}

export default App;
```

### Testing

This project uses Jest and React Testing Library. To run tests:

```bash
npm run test
```

## License

This project is licen.sed under the MIT License.