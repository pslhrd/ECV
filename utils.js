import { Vector2 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { TextureLoader, RepeatWrapping } from 'three';

const gltfLoader = new GLTFLoader();
const textureLoader = new TextureLoader();

export function loadGLTF(url, opts) {
    return new Promise((res, rej) => {
        gltfLoader.load(url, data => {
            opts.onLoad(data);
            res(data);
        });
    });
}

export function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

export const mousePos = new Vector2();
window.addEventListener('mousemove', onMove);

function onMove(e) {
    mousePos.set(e.x, e.y);
}

export async function loadTexture(url, opts) {
    const tex = await new Promise((resolve, reject) => {
        textureLoader.load(url, data => {
            if (opts.onLoad) {
                opts.onLoad(data);
            }
            resolve(data);
        });
    });
    if (opts.flipY !== undefined) tex.flipY = opts.flipY;
    if (opts.magFilter) {
        tex.magFilter = opts.magFilter;
    }
    if (opts.minFilter) {
        tex.minFilter = opts.minFilter;
    }
    if (opts.repeat) {
        tex.wrapS = RepeatWrapping;
        tex.wrapT = RepeatWrapping;
    } else {
        if (opts.wrapS) tex.wrapS = opts.wrapS;
        if (opts.wrapT) tex.wrapT = opts.wrapT;
    }
}

export default function hotMaterial(vs, fs, cb) {
    const obj = {
        vs,
        fs,
        use: instance => {
            instance.fragmentShader = fs;
            instance.vertexShader = vs;
        },
        unuse: () => {},
    };

    /// #if DEBUG
    if (import.meta.hot) {
        obj.instances = new Set();

        obj.use = instance => {
            instance.fragmentShader = fs;
            instance.vertexShader = vs;
            instance.needsUpdate = true;
            obj.instances.add(instance);
        };

        obj.unuse = instance => {
            obj.instances.delete(instance);
        };

        obj.update = newObj => {
            const o = newObj.default;
            obj.vs = o.vs;
            obj.fs = o.fs;
            o.use = obj.use;
            o.unuse = obj.unuse;
            o.instances = obj.instances;
            o.update = obj.update;
            obj.instances.forEach(instance => {
                instance.fragmentShader = obj.fs;
                instance.vertexShader = obj.vs;
                instance.needsUpdate = true;
            });
        };

        if (cb) cb(obj.update);
    }
    /// #endif

    return obj;
}
