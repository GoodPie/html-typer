import React from 'react';
import {render, act} from '@testing-library/react';
import HtmlTyper from "../src/HtmlTyper";


// Polyfill requestAnimationFrame for tests if needed.
global.requestAnimationFrame = (cb: FrameRequestCallback): number => setTimeout(cb, 16);

describe('AnimatedText component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('renders animated text', async () => {
    const html = 'Hello';
    const {container} = render(<HtmlTyper html={html} speed={10}/>);

    // Initially, the container should be empty
    expect(container.textContent).toBe('');

    // Advance timers to simulate the animation finishing.
    await act(async () => {
      jest.runAllTimers();
    });

    // Now, the container should include the rendered text.
    expect(container.textContent).toContain('Hello');
  });

  test('applies className and style props', async () => {
    const html = 'Hello';
    const className = 'my-animated-text';
    const style = {color: 'red'};

    const {container} = render(
      <HtmlTyper html={html} speed={10} className={className} style={style}/>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain(className);
    expect(div.style.color).toBe('red');
  });
});