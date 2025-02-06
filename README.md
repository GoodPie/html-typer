# animate-html-rendering

Animate your HTML content with a smooth typewriter effect. This library gradually renders text and nested HTML elements while sanitizing the input using [DOMPurify](https://github.com/cure53/DOMPurify).

## Features

- **Typewriter Effect:** Gradually animates text character by character.
- **Nested HTML Support:** Handles nested elements and text nodes.
- **Built-in Sanitization:** Uses DOMPurify to prevent XSS risks.
- **TypeScript & JavaScript:** Written in TypeScript and compiled to JS for seamless integration.

## Installation

Install via npm:

~~~bash
npm install animate-html-rendering dompurify
~~~

## Usage

### JavaScript

~~~js
import { animateHtmlRendering } from 'animate-html-rendering';

const container = document.getElementById('myContainer');
const html = `<p class="intro">Hello, <strong>World!</strong></p>`;

animateHtmlRendering(container, html, 50).then(() => {
  console.log('Animation complete!');
});
~~~

### TypeScript

~~~ts
import { animateHtmlRendering } from 'animate-html-rendering';

const container = document.getElementById('myContainer') as HTMLElement;
const html = `<p class="intro">Hello, <strong>World!</strong></p>`;

await animateHtmlRendering(container, html, 50);
~~~

## Running Tests

This project uses Jest for testing. To run tests, use:

~~~bash
npm test
~~~

*(Note: The tests simulate DOM interactions with jsdom and use fake timers to control the animation speed.)*

## Contributing

Contributions are welcome! Feel free to open issues, fork the repository, and submit pull requests.

## License

This project is licensed under the MIT License.