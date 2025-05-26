import { ShaderMaterial } from 'three';
import { getWebGL } from '../..';
import Shaders from './Shaders';

export class CloudMaterial extends ShaderMaterial {
    constructor(opts = {}) {
        super();
        const webgl = (this.webgl = getWebGL());

        this.uniforms = {
            ...webgl.uniforms,
            map: { value: webgl.textures.clouds },
            noise: { value: webgl.textures.noise },
        };

        this.transparent = true;

        Shaders.use(this);
    }
}

let singleton = null;
CloudMaterial.use = () => (singleton = singleton ?? new CloudMaterial());
CloudMaterial.unuse = () => {};
