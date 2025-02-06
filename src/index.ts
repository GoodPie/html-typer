import DOMPurify from 'dompurify';

export interface Chunk {
  tagName: string;
  classes?: string[];
  content?: string;
  children?: Chunk[];
}

/**
 * Animates the rendering of HTML content by gradually adding text.
 *
 * @param container - The element to render content into.
 * @param html - The HTML string to animate.
 * @param speed - The interval in milliseconds between each character.
 * @returns A promise that resolves when the animation is complete.
 */
export const animateHtmlRendering = async (
  container: HTMLElement,
  html: string,
  speed: number = 50
): Promise<void> => {
  speed = Math.max(1, speed);

  // Sanitize HTML before processing
  const sanitizedHtml = DOMPurify.sanitize(html);
  container.innerHTML = '';

  const chunks: Chunk[] = splitHtmlString(sanitizedHtml);

  // animateTextContent now has access to container via closure.
  const animateTextContent = (element: Node, text: string, speed: number): Promise<void> => {
    return new Promise(resolve => {
      let index = 0;
      const textInterval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text[index++];
        } else {
          clearInterval(textInterval);
          resolve();
        }

        // Auto-scroll to the bottom of the container's parent
        requestAnimationFrame(() => {
          if (container.parentElement) {
            container.parentElement.scrollTop = container.parentElement.scrollHeight;
          }
        });
      }, speed);
    });
  };

  const processChunk = async (chunks: Chunk[], parent: HTMLElement, speed: number) => {
    for (const chunk of chunks) {
      if (chunk.tagName === "#text") {
        const textNode = document.createTextNode("");
        parent.appendChild(textNode);
        await animateTextContent(textNode, chunk.content || "", speed);
      } else {
        const newElement = document.createElement(chunk.tagName);
        if (chunk.classes && chunk.classes.length > 0) {
          newElement.classList.add(...chunk.classes);
        }
        parent.appendChild(newElement);
        if (chunk.content) {
          await animateTextContent(newElement, chunk.content, speed);
        }
        if (chunk.children && chunk.children.length > 0) {
          await processChunk(chunk.children, newElement, speed);
        }
      }
    }
  };

  await processChunk(chunks, container, speed);
};

/**
 * Splits an HTML string into a structured set of chunks for animation.
 *
 * @param input - The HTML string to parse.
 * @returns An array of chunk objects representing the DOM structure.
 */
const splitHtmlString = (input: string): Chunk[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'text/html');
  const result: Chunk[] = [];

  const traverse = (node: ChildNode, parent: Chunk | null = null) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element: Chunk = {
        tagName: (node as HTMLElement).tagName.toLowerCase(),
        classes: (node as HTMLElement).className
          ? (node as HTMLElement).className.split(/\s+/).filter(c => !!c)
          : [],
        children: []
      };

      if (parent) {
        parent.children!.push(element);
      } else {
        result.push(element);
      }

      node.childNodes.forEach(child => traverse(child, element));
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim()) {
      const textChunk = {
        tagName: "#text",
        content: node.textContent.trim()
      };

      // Push text nodes at any level, including top-level (when parent is null)
      if (parent) {
        parent.children!.push(textChunk);
      } else {
        result.push(textChunk);
      }
    }
  };

  doc.body.childNodes.forEach(node => traverse(node));
  return result;
};