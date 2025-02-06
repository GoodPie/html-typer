import { animateHtmlRendering } from '../src';

describe('animateHtmlRendering', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `<div id="container"><div id="scrollContainer"></div></div>`;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders text gradually', async () => {
    const container = document.getElementById('scrollContainer') as HTMLElement;
    const html = 'Hello';

    const animationPromise = animateHtmlRendering(container, html, 10);

    // Fast-forward timers to complete the animation
    jest.runAllTimers();

    await animationPromise;

    expect(container.textContent).toContain('Hello');
  });
});