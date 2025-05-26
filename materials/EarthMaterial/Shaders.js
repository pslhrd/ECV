import hotMaterial from '../../utils';

import fs from './EarthMaterial.frag';
import vs from './EarthMaterial.vert';

export default hotMaterial(vs, fs, update => {
    if (import.meta.hot) import.meta.hot.accept(update);
});
