import { BoxGeometry, GridHelper, Mesh, MeshBasicMaterial } from 'three';
import { getWebGL } from '..';
import gsap from 'gsap';

export default class Cube {
    constructor() {
        this.webgl = getWebGL();
        this.scene = this.webgl.scene;

        this.init();
    }

    init() {
        // this.grid = this.createDebug();
        // this.cube = this.createGeometry();
    }

    createGeometry() {
        const PARAMS = { scale: 0 };

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 'white' });
        const mesh = new Mesh(geometry, material);

        this.scene.add(mesh);
        return mesh;
    }

    createDebug() {
        const mesh = new GridHelper(10, 10);
        this.scene.add(mesh);
        return mesh;
    }

    update() {
        // this.cube.rotation.x += 0.01;
    }
}
