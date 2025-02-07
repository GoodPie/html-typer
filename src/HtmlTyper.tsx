import React, {useRef, useEffect} from 'react';
import {animateHtmlRendering} from './index';
import {HTMLTyperProps} from "./HtmlTyperProps";


/**
 * HTMLTyper is a React component that renders HTML with a typewriter effect.
 */
export const HtmlTyper: React.FC<HTMLTyperProps> = ({
                                                      html,
                                                      speed = 50,
                                                      className,
                                                      style,
                                                    }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateHtmlRendering(containerRef.current, html, speed);
    }
  }, [html, speed]);

  return <div ref={containerRef} className={className} style={style}/>;
};