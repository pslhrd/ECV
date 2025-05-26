import { AmbientLight, DirectionalLight } from 'three';
import { getWebGL } from '..';

export default class Light {
    constructor() {
        this.webgl = getWebGL();
        this.scene = this.webgl.scene;

        this.init();
    }

    init() {
        const ambientLight = new AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xffffff, 1.5);
        this.scene.add(directionalLight);
    }
}
