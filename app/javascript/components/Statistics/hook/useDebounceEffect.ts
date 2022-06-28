import * as React from 'react';

export const useDebouncedEffect = (effect, deps, delay) => {
  React.useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
  }, [...deps || [], delay]);
};
