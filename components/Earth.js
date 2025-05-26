import { Mesh, MeshBasicMaterial, MeshNormalMaterial, Object3D, SphereGeometry, Vector2 } from 'three';
import { getWebGL } from '..';
import { EarthMaterial } from '../materials/EarthMaterial/EarthMaterial';
import { CloudMaterial } from '../materials/CloudMaterial/CloudMaterial';
import { lerp } from '../utils';
import { clamp } from 'three/src/math/MathUtils.js';

export default class Earth {
    constructor() {
        this.webgl = getWebGL();
        this.scene = this.webgl.scene;

        this.base = new Object3D();
        this.wrapper = new Object3D();

        this.radius = 1;
        this.scale = 1;
        this.rotationY = 0;
        this.mousePos = new Vector2();

        this.init();

        this.base.add(this.wrapper);
        this.scene.add(this.base);
    }

    init() {
        this.mesh = this.createGeometry();
        this.clouds = this.createClouds();
    }

    createGeometry() {
        const geo = new SphereGeometry(this.radius, 64, 64);
        const material = new EarthMaterial();
        const mesh = new Mesh(geo, material);
        this.wrapper.add(mesh);
        return mesh;
    }

    createClouds() {
        const offset = 0.15;
        const geo = new SphereGeometry(this.radius + offset, 64, 64);
        const material = new CloudMaterial();
        const mesh = new Mesh(geo, material);
        this.wrapper.add(mesh);
        return mesh;
    }

    update() {
        this.clouds.rotation.y += 0.001;
        this.mesh.rotation.y += 0.00085;

        const factor = 0.002;
        const { dragDelta, normalizePos } = this.webgl.drag;

        const x = -dragDelta.x * factor;
        this.rotationY += x;

        const velocity = Math.abs(dragDelta.x) * 0.98;
        const s = clamp(1 - velocity * 0.005, 0.8, 1);
        this.scale = lerp(this.scale, s, 0.05);
        this.base.scale.set(this.scale, this.scale, this.scale);

        this.wrapper.rotation.y = lerp(this.wrapper.rotation.y, this.rotationY, 0.1);

        this.updateAbsolute();
    }

    updateAbsolute() {
        // Mouse
        const { dragDelta, normalizePos } = this.webgl.drag;
        this.mousePos.x = lerp(this.mousePos.x, normalizePos.x, 0.1);
        this.mousePos.y = lerp(this.mousePos.y, normalizePos.y, 0.1);

        this.base.rotation.x = this.mousePos.y * -0.1;
        this.base.rotation.y = this.mousePos.x * 0.1;
    }
}
