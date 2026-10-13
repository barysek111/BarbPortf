/**
 * One shared scatter composition (Framer “Canvas” layer). Image slots index into the
 * neighbor project’s pool (0–7). Replace or extend per project later via content.
 */
export type NextProjectCanvasFrame = {
  imageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

/** World space centered on the stage; y grows downward. */
export const NEXT_PROJECT_CANVAS_FRAMES: NextProjectCanvasFrame[] = [
  { imageIndex: 0, x: -548, y: -1720, w: 64, h: 84 },
  { imageIndex: 1, x: -420, y: -1580, w: 88, h: 66 },
  { imageIndex: 2, x: -260, y: -1688, w: 56, h: 72 },
  { imageIndex: 3, x: -88, y: -1760, w: 72, h: 96 },
  { imageIndex: 4, x: 96, y: -1620, w: 60, h: 80 },
  { imageIndex: 5, x: 280, y: -1704, w: 76, h: 58 },
  { imageIndex: 6, x: 420, y: -1540, w: 52, h: 68 },
  { imageIndex: 7, x: 512, y: -1660, w: 68, h: 90 },
  { imageIndex: 0, x: -600, y: -1420, w: 70, h: 52 },
  { imageIndex: 2, x: -340, y: -1380, w: 58, h: 76 },
  { imageIndex: 4, x: -120, y: -1488, w: 82, h: 62 },
  { imageIndex: 1, x: 48, y: -1320, w: 54, h: 70 },
  { imageIndex: 6, x: 220, y: -1410, w: 64, h: 86 },
  { imageIndex: 3, x: 380, y: -1288, w: 72, h: 54 },
  { imageIndex: 5, x: 540, y: -1360, w: 60, h: 78 },
  { imageIndex: 7, x: -480, y: -1180, w: 66, h: 88 },
  { imageIndex: 1, x: -200, y: -1120, w: 76, h: 56 },
  { imageIndex: 0, x: 12, y: -1208, w: 58, h: 74 },
  { imageIndex: 4, x: 180, y: -1088, w: 84, h: 64 },
  { imageIndex: 2, x: 360, y: -1160, w: 62, h: 82 },
  { imageIndex: 6, x: -560, y: -920, w: 72, h: 54 },
  { imageIndex: 3, x: -300, y: -880, w: 54, h: 70 },
  { imageIndex: 5, x: -64, y: -960, w: 68, h: 92 },
  { imageIndex: 7, x: 140, y: -840, w: 56, h: 72 },
  { imageIndex: 0, x: 300, y: -920, w: 80, h: 60 },
  { imageIndex: 4, x: 480, y: -800, w: 64, h: 84 },
  { imageIndex: 1, x: -520, y: -640, w: 60, h: 78 },
  { imageIndex: 6, x: -240, y: -600, w: 70, h: 52 },
  { imageIndex: 2, x: -40, y: -680, w: 52, h: 66 },
  { imageIndex: 5, x: 120, y: -560, w: 74, h: 56 },
  { imageIndex: 3, x: 320, y: -648, w: 58, h: 76 },
  { imageIndex: 7, x: 500, y: -520, w: 66, h: 88 },
  { imageIndex: 0, x: -580, y: -360, w: 56, h: 72 },
  { imageIndex: 4, x: -360, y: -320, w: 78, h: 58 },
  { imageIndex: 2, x: -140, y: -400, w: 64, h: 86 },
  { imageIndex: 6, x: 80, y: -280, w: 54, h: 70 },
  { imageIndex: 1, x: 260, y: -368, w: 72, h: 54 },
  { imageIndex: 5, x: 440, y: -240, w: 62, h: 80 },
  { imageIndex: 3, x: -500, y: -80, w: 68, h: 52 },
  { imageIndex: 7, x: -220, y: -40, w: 58, h: 74 },
  { imageIndex: 0, x: 20, y: -120, w: 76, h: 58 },
  { imageIndex: 4, x: 200, y: 0, w: 64, h: 84 },
  { imageIndex: 2, x: 400, y: -88, w: 52, h: 68 },
  { imageIndex: 6, x: -420, y: 160, w: 70, h: 56 },
  { imageIndex: 1, x: -160, y: 200, w: 60, h: 78 },
  { imageIndex: 5, x: 60, y: 120, w: 82, h: 62 },
  { imageIndex: 3, x: 280, y: 240, w: 54, h: 72 },
  { imageIndex: 7, x: 460, y: 180, w: 66, h: 54 },
  { imageIndex: 0, x: -540, y: 400, w: 58, h: 76 },
  { imageIndex: 4, x: -280, y: 440, w: 74, h: 56 },
  { imageIndex: 2, x: -60, y: 360, w: 64, h: 86 },
  { imageIndex: 6, x: 160, y: 480, w: 56, h: 70 },
  { imageIndex: 1, x: 340, y: 400, w: 68, h: 52 },
  { imageIndex: 5, x: 520, y: 520, w: 62, h: 80 },
  { imageIndex: 3, x: -480, y: 680, w: 72, h: 54 },
  { imageIndex: 7, x: -200, y: 720, w: 54, h: 70 },
  { imageIndex: 0, x: 40, y: 640, w: 80, h: 60 },
  { imageIndex: 4, x: 240, y: 760, w: 58, h: 74 },
  { imageIndex: 2, x: 420, y: 680, w: 66, h: 88 },
  { imageIndex: 6, x: -560, y: 920, w: 64, h: 52 },
  { imageIndex: 1, x: -320, y: 960, w: 70, h: 56 },
  { imageIndex: 5, x: -100, y: 880, w: 52, h: 68 },
  { imageIndex: 3, x: 100, y: 1000, w: 76, h: 58 },
  { imageIndex: 7, x: 300, y: 920, w: 60, h: 78 },
  { imageIndex: 0, x: 500, y: 1040, w: 68, h: 54 },
  { imageIndex: 4, x: -400, y: 1180, w: 56, h: 72 },
  { imageIndex: 2, x: -140, y: 1220, w: 74, h: 56 },
  { imageIndex: 6, x: 80, y: 1140, w: 62, h: 82 },
  { imageIndex: 1, x: 280, y: 1260, w: 54, h: 70 },
  { imageIndex: 5, x: 460, y: 1180, w: 72, h: 52 },
  { imageIndex: 3, x: -520, y: 1420, w: 66, h: 86 },
  { imageIndex: 7, x: -240, y: 1460, w: 58, h: 76 },
  { imageIndex: 0, x: 20, y: 1380, w: 64, h: 48 },
  { imageIndex: 4, x: 200, y: 1500, w: 78, h: 60 },
  { imageIndex: 2, x: 400, y: 1420, w: 52, h: 68 },
  { imageIndex: 6, x: -360, y: 1680, w: 70, h: 54 },
  { imageIndex: 1, x: -80, y: 1720, w: 60, h: 80 },
  { imageIndex: 5, x: 160, y: 1640, w: 84, h: 64 },
  { imageIndex: 3, x: 360, y: 1760, w: 56, h: 72 },
  { imageIndex: 7, x: 520, y: 1680, w: 68, h: 52 },
];

export const NEXT_PROJECT_CANVAS_FIELD_TOP =
  NEXT_PROJECT_CANVAS_FRAMES.reduce((min, frame) => Math.min(min, frame.y), Infinity);
export const NEXT_PROJECT_CANVAS_FIELD_BOTTOM =
  NEXT_PROJECT_CANVAS_FRAMES.reduce((max, frame) => Math.max(max, frame.y + frame.h), -Infinity);

/** Position spread and thumb scale applied at render time. */
export const NEXT_PROJECT_CANVAS_SPREAD = 1.58;
export const NEXT_PROJECT_CANVAS_SIZE_SCALE = 2;
/** Rendered thumb width (px); height follows each asset’s intrinsic aspect ratio. */
export const NEXT_PROJECT_CANVAS_THUMB_MAX_WIDTH = 216;
export const NEXT_PROJECT_CANVAS_TILE_GAP = 320;

export function applyNextProjectCanvasFrameLayout(frame: NextProjectCanvasFrame): NextProjectCanvasFrame {
  return {
    ...frame,
    x: Math.round(frame.x * NEXT_PROJECT_CANVAS_SPREAD),
    y: Math.round(frame.y * NEXT_PROJECT_CANVAS_SPREAD),
    w: Math.round(frame.w * NEXT_PROJECT_CANVAS_SIZE_SCALE),
    h: Math.round(frame.h * NEXT_PROJECT_CANVAS_SIZE_SCALE),
  };
}

function scaledFrameBounds(frames: NextProjectCanvasFrame[]) {
  const top = frames.reduce((min, frame) => Math.min(min, frame.y), Infinity);
  const bottom = frames.reduce((max, frame) => Math.max(max, frame.y + frame.h), -Infinity);
  return { top, bottom };
}

const SCALED_BASE_FRAMES = NEXT_PROJECT_CANVAS_FRAMES.map(applyNextProjectCanvasFrameLayout);
const SCALED_BOUNDS = scaledFrameBounds(SCALED_BASE_FRAMES);

export const NEXT_PROJECT_CANVAS_SCALED_FIELD_TOP = SCALED_BOUNDS.top;
export const NEXT_PROJECT_CANVAS_SCALED_FIELD_BOTTOM = SCALED_BOUNDS.bottom;

/** Vertical repeat stride (one scatter band + gap). */
export const NEXT_PROJECT_CANVAS_TILE_PERIOD =
  SCALED_BOUNDS.bottom - SCALED_BOUNDS.top + NEXT_PROJECT_CANVAS_TILE_GAP;

export const NEXT_PROJECT_CANVAS_TILES_ABOVE = 1;
export const NEXT_PROJECT_CANVAS_TILES_BELOW = 4;

export type TiledNextProjectCanvasFrame = NextProjectCanvasFrame & { tileId: string };

/** Same scatter repeated vertically so scroll/drag never runs out of thumbs. */
export function getTiledNextProjectCanvasFrames(): TiledNextProjectCanvasFrame[] {
  const period = NEXT_PROJECT_CANVAS_TILE_PERIOD;
  const tiles: TiledNextProjectCanvasFrame[] = [];

  for (let t = -NEXT_PROJECT_CANVAS_TILES_ABOVE; t <= NEXT_PROJECT_CANVAS_TILES_BELOW; t++) {
    const yShift = t * period;
    SCALED_BASE_FRAMES.forEach((frame, index) => {
      tiles.push({
        ...frame,
        y: frame.y + yShift,
        tileId: `${t}-${index}`,
      });
    });
  }

  return tiles;
}

export const NEXT_PROJECT_CANVAS_TILED_FIELD_BOTTOM =
  SCALED_BOUNDS.bottom + NEXT_PROJECT_CANVAS_TILES_BELOW * NEXT_PROJECT_CANVAS_TILE_PERIOD;
