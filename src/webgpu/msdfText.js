//msdfText.js

import * as THREE from 'three/webgpu';
import { MSDFTextGeometry, MSDFTextNodeMaterial } from 'three-msdf-text-utils/webgpu';
import { texture, mix, uniform, clamp, attribute, step, float, smoothstep, mrt } from 'three/tsl';

export default class MSDFText {
  constructor() {}

  #worldPositionBounds;
  #mesh;

  async initialize(
    text = 'Pardesi Naari',
    position = new THREE.Vector3(0, 0, 0),
    uProgress,
    perlinTexture,
    fontAtlasTexture
  ) {
    // Load font data from absolute path
    const response = await fetch('/fonts/Cinzel/Cinzel.json');
    const fontData = await response.json();

    // Create text geometry
    const textGeometry = new MSDFTextGeometry({
      text,
      font: fontData,
      width: 1000,
      align: 'center',
    });

    const textMaterial = this.createTextMaterial(fontAtlasTexture, perlinTexture, uProgress);

    // Adjust to remove visual artifacts
    textMaterial.alphaTest = 0.1;
    this.#mesh = new THREE.Mesh(textGeometry, textMaterial);

    // With this we make the height of lineHeight 0.3 world units
    const targetLineHeight = 0.5;
    const lineHeightPx = fontData.common.lineHeight;
    let textScale = targetLineHeight / lineHeightPx;

    this.#mesh.scale.set(textScale, textScale, textScale);
    const meshOffset = -(textGeometry.layout.width / 2) * textScale;

    this.#mesh.position.set(position.x + meshOffset, position.y, position.z);
    this.#mesh.rotation.x = Math.PI;
    // Compute the world position bounds of our text
    textGeometry.computeBoundingBox();
    this.#mesh.updateWorldMatrix(true, false);
    this.#worldPositionBounds = new THREE.Box3().setFromObject(this.#mesh);
    return this.#mesh;
  }

  getRandomPositionInMesh() {
    if (!this.#worldPositionBounds) return new THREE.Vector3(0, 0, 0);
    const min = this.#worldPositionBounds.min;
    const max = this.#worldPositionBounds.max;
    const x = Math.random() * (max.x - min.x) + min.x;
    const y = Math.random() * (max.y - min.y) + min.y;
    const z = Math.random() * 0.5;
    return new THREE.Vector3(x, y, z);
  }

  createTextMaterial(fontAtlasTexture, perlinTexture, uProgress) {
    const textMaterial = new MSDFTextNodeMaterial({
      map: fontAtlasTexture,
      transparent: true,
    });

    const glyphUv = attribute('glyphUv', 'vec2');
    const center = attribute('center', 'vec2');

    const uNoiseRemapMin = uniform(0.48);
    const uNoiseRemapMax = uniform(0.9);
    const uCenterScale = uniform(0.05);
    const uGlyphScale = uniform(0.75);
    const uDissolvedColor = uniform(new THREE.Color('#5E5E5E'));
    const uDesatComplete = uniform(0.45);
    const uBaseColor = uniform(new THREE.Color('#ECCFA3'));

    const customUv = center.mul(uCenterScale).add(glyphUv.mul(uGlyphScale));

    const perlinTextureNode = texture(perlinTexture, customUv).x;
    const perlinRemap = clamp(perlinTextureNode.sub(uNoiseRemapMin).div(uNoiseRemapMax.sub(uNoiseRemapMin)), 0, 1);
    const dissolve = step(uProgress, perlinRemap);
    const desaturationProgress = smoothstep(float(0.0), uDesatComplete, uProgress);

    const colorMix = mix(uBaseColor, uDissolvedColor, desaturationProgress);
    textMaterial.colorNode = colorMix;
    const msdfOpacity = textMaterial.opacityNode;
    textMaterial.opacityNode = msdfOpacity.mul(dissolve);
    textMaterial.mrtNode = mrt({
      bloomIntensity: float(0.4).mul(dissolve),
    });

    return textMaterial;
  }

  destroy() {
    if (this.#mesh) {
      this.#mesh.geometry.dispose();
      this.#mesh.material.dispose();
    }
  }
}
