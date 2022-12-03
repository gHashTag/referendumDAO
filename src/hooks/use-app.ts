import {useContext} from 'react';

import {AppContext} from 'src/contexts/app';

export function useApp() {
  const context = useContext(AppContext);

  return context;
}
