// Module imports
import {
  Assets,
  // BaseTexture,
  // BufferResource,
  Filter,
  SpriteMaskFilter,
  Texture,
  // Texture,
  // WRAP_MODES,
} from "pixi.js";
import { Container, Sprite, useTick } from "@pixi/react";
import tinycolor from "tinycolor2";
import { useEffect, useMemo, useRef } from "react";
import { useStore } from "statery";

// Local imports
import { isBlockVisible } from "../../store/reducers/isBlockVisible.js";
import { LEVEL_LAYOUT } from "../../data/LEVEL_LAYOUT.js";
import { PixiOverworldRouter } from "../PixiOverworldRouter/PixiOverworldRouter.jsx";
import { PixiOverworldSection } from "../PixiOverworldSection/PixiOverworldSection.jsx";
import shader from "../../shaders/OverworldFog.glsl";
import { store } from "../../store/store.js";

/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworld() {
  const { cameraOffset, resolution, stageHeight, stageWidth, uiScale } =
    useStore(store);

  const ref = useRef();

  const fogmapBlocksToUnhide = useMemo(() => {
    const visibleBlocks = Object.values(LEVEL_LAYOUT.blocks).filter(
      (blockData) => isBlockVisible(blockData.name),
    );
    return Array.from(
      new Set(visibleBlocks.map((blockData) => blockData.fogmap || 0)).values(),
    );
  }, []);

  const overworldTexture = useMemo(
    () => Assets.get("overworld::background"),
    [],
  );
  const overworldFogMap = useMemo(() => Assets.get("overworld::fogmap"), []);

  const { scaledStageHeight, scaledStageWidth } = useMemo(
    () => ({
      scaledStageWidth: stageWidth * resolution,
      scaledStageHeight: stageHeight * resolution,
    }),
    [resolution, stageHeight, stageWidth, uiScale],
  );

  const mappedLayout = useMemo(() => {
    return Object.values(LEVEL_LAYOUT.sections).map((sectionData) => (
      <PixiOverworldSection key={sectionData.name} data={sectionData} />
    ));
  }, []);

  const uniforms = useMemo(() => {
    const color = tinycolor("#30346d").toRgb();
    const uFogColor = new Uint8Array(4);
    uFogColor[0] = color.r;
    uFogColor[1] = color.g;
    uFogColor[2] = color.b;
    uFogColor[3] = 255;

    const uFogmapBlocksToUnhide = new Uint8Array(64);
    for (let i = 0; i < 64; i++) {
      uFogmapBlocksToUnhide[i] = fogmapBlocksToUnhide[i] || 0;
    }

    return {
      uFogColor,
      uTime: 0,
      uFogMap: overworldFogMap,
      uScale: uiScale,
      uStageHeight: scaledStageHeight,
      uStageWidth: scaledStageWidth,
      uFogmapBlocksToUnhide: fogmapBlocksToUnhide,
    };
  }, [
    fogmapBlocksToUnhide,
    overworldTexture,
    overworldFogMap,
    scaledStageHeight,
    scaledStageWidth,
    resolution,
    uiScale,
  ]);

  const filters = useMemo(() => {
    const filter = new Filter(null, shader, uniforms);
    filter.autoFit = false;
    return [filter];
  }, [uniforms]);

  // For animation
  useTick((_, { lastTime }) => {
    // prevent overflow in shader
    const adjustedCurrentTimeTime = lastTime % 1e10;
    const overlayFogFilter = filters[0];
    overlayFogFilter.uniforms.uTime = adjustedCurrentTimeTime;
  });

  return (
    <Container filters={filters} x={cameraOffset.x} y={cameraOffset.y}>
      <Sprite ref={ref} name={"background"} texture={overworldTexture} />

      {mappedLayout}

      <PixiOverworldRouter />
    </Container>
  );
}
