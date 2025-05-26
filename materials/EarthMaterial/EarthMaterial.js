import { ShaderMaterial } from 'three';
import { getWebGL } from '../..';
import Shaders from './Shaders';

export class EarthMaterial extends ShaderMaterial {
    constructor(opts = {}) {
        super();
        const webgl = (this.webgl = getWebGL());

        this.uniforms = {
            ...webgl.uniforms,
            map: { value: webgl.textures.earth },
        };

        this.transparent = true;

        Shaders.use(this);
    }
}

let singleton = null;
EarthMaterial.use = () => (singleton = singleton ?? new EarthMaterial());
EarthMaterial.unuse = () => {};
