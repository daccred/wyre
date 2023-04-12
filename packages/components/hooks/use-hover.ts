import type { RefObject } from 'react';
import { useState } from 'react';
// See: https://usehooks-ts.com/react-hook/use-event-listener
import useEventListener from './use-event-listener';

/**
 * React UI sensor hook that determine if the mouse element is in the hover element using Javascript Typescript instead CSS. This way you can separate the logic from the UI.
 */
function useHover<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>): boolean {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEventListener('mouseenter', handleMouseEnter, elementRef);
  useEventListener('mouseleave', handleMouseLeave, elementRef);

  return value;
}

export default useHover;
