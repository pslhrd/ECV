import { map } from './utils';

export function createDrag(webgl) {
    const api = {
        pos: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
        dragDelta: { x: 0, y: 0 },
        normalizePos: { x: 0, y: 0 },
        isDragging: false,
    };

    function init() {
        const el = webgl.canvas;
        el.addEventListener('mousedown', start);
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseup', end);
    }

    function start(e) {
        api.isDragging = true;

        reset();
    }

    function move(e) {
        const position = {
            x: e.x,
            y: e.y,
        };

        const delta = {
            x: api.pos.x - position.x,
            y: api.pos.y - position.y,
        };

        api.pos.x = position.x;
        api.pos.y = position.y;

        const { viewport } = webgl;

        const size = { x: viewport.width, y: viewport.height };
        api.normalizePos.x = map(api.pos.x, 0, size.x, -1, 1);
        api.normalizePos.y = map(api.pos.y, 0, size.y, 1, -1);

        if (api.isDragging) {
            api.dragDelta.x = delta.x;
            api.dragDelta.y = delta.y;
        }
    }

    function end(e) {
        api.isDragging = false;
        reset();
    }

    function reset() {
        const delta = { x: 0, y: 0 };
        api.delta = delta;
        api.dragDelta = delta;
    }

    init();

    return api;
}
