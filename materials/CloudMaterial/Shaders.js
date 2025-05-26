import hotMaterial from '../../utils';

import fs from './CloudMaterial.frag';
import vs from './CloudMaterial.vert';

export default hotMaterial(vs, fs, update => {
    if (import.meta.hot) import.meta.hot.accept(update);
});
