import { AxesHelper, CameraHelper, Object3D, PerspectiveCamera, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { mousePos } from '../utils';
import { map, lerp } from '../utils';
import gsap from 'gsap';
import { getWebGL } from '..';

const STORAGE_NAME = 'orbitPosECV';
const BASE_POS = { x: 1, y: 1, z: 1 };

export default class Camera {
    constructor() {
        this.webgl = getWebGL();
        this.scene = this.webgl.scene;

        this.main = this.createCamera();
        this.debug = this.createDebug();

        this.active = this.main;

        this.introProgress = 1;
        this.scrollProgress = 0;

        this.createPaneFolder();

        this.resize();
    }

    createCamera() {
        const camera = new PerspectiveCamera(55, this.webgl.viewportRatio, 0.01, 100);
        const helper = new CameraHelper(camera);

        camera.position.set(0, 0, 2.5);

        // this.scene.add(helper);
        this.scene.add(camera);
        return camera;
    }

    createDebug() {
        const camera = new PerspectiveCamera(55, this.webgl.viewportRatio, 0.01, 100);
        camera.position.set(10, 10, 10);
        camera.lookAt(0, 0, 0);

        const pos = localStorage.getItem(STORAGE_NAME) ? JSON.parse(localStorage.getItem(STORAGE_NAME)) : null;

        if (pos) {
            camera.position.set(pos.x, pos.y, pos.z);
        } else {
            camera.position.set(1, 1, 1).multiplyScalar(10);
        }

        this.scene.add(camera);
        this.orbitControl = new OrbitControls(camera, this.webgl.canvas);

        this.orbitControl.addEventListener('end', this.savePosition.bind(this));
        // this.orbitControl.enableZoom = false;
        return camera;
    }

    savePosition() {
        localStorage.setItem(STORAGE_NAME, JSON.stringify(this.debug.position));
    }

    createPaneFolder() {
        const folder = this.webgl.gui.addFolder({ title: 'Cameras', expanded: true });
        const opts = [
            { text: 'Main', value: this.main },
            { text: 'Debug', value: this.debug },
        ];

        folder
            .addBlade({
                view: 'list',
                label: 'Cameras',
                options: opts,
                value: this.active,
            })
            .on('change', e => {
                this.setCamera(e.value);
            });
    }

    setCamera(value) {
        this.active = value;
    }

    init() {}

    update() {
        this.orbitControl?.update();
        // this.main.position.x = lerp(this.main.position.x, x * mult, 0.05);
        // this.main.position.y = lerp(this.main.position.y, -y * mult, 0.05);

        // this.main.lookAt(0, 0, 0);
    }

    resize() {
        this.main.aspect = this.webgl.viewportRatio;
        this.main.updateProjectionMatrix();

        this.debug.aspect = this.webgl.viewportRatio;
        this.debug.updateProjectionMatrix();
    }
}
