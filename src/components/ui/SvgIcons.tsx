import React from 'react';

import Svg, {Path} from 'react-native-svg';
import {SvgProps} from 'react-native-svg/src/elements/Svg';

export const PasteIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 3h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2Zm-1-2h1c1.306 0 2.418.835 2.83 2h1.42a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3.5v2a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h2V6a3 3 0 0 1 3-3h1.42A3.001 3.001 0 0 1 14 1ZM8.75 9h4a3 3 0 0 1 3 3v4h3.5a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1.42A3.001 3.001 0 0 1 15 7h-1a3.001 3.001 0 0 1-2.83-2H9.75a1 1 0 0 0-1 1v3Zm5 3a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8Zm-7.5 1a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Zm0 3.5a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Z"
      fill="currentColor"
    />
  </Svg>
);
