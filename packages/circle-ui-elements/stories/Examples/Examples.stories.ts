import { html, svg } from 'lit';

import preview from '.storybook/preview';
import sectorStyles from 'Sector/Sector.module.scss';
import circleStyles from 'Circle/Circle.module.scss';
import utilities from 'utilities.module.scss';
import { computeSectorPath, sectorPath } from 'utils/functions';
import { withWidth, withHeight } from 'stories/utils/decorators';
import { StoryIdGenerator } from 'stories/utils/functions';
import styles from './Examples.module.scss';

interface Args {
  containerScale?: number;
  sliceCount?: number;
}

const MAX_RANGE = 100;
const MAX_CONTAINER_WIDTH = 800;
const containerScale = (324 / MAX_CONTAINER_WIDTH) * MAX_RANGE;

const meta = preview.type<{ args: Args }>().meta({
  title: 'Examples',
  tags: ['autodocs'],
  decorators: [withHeight, withWidth].map((withSize, i) => (Story, context) => {
    const { args } = context;
    const decoratedStory = withSize(
      `${((args.containerScale ?? containerScale) / MAX_RANGE) * MAX_CONTAINER_WIDTH}px`
    )(Story, context);
    if (i === 0) {
      return html`<div class="${styles.pieExample}">${decoratedStory}</div>`;
    }
    return decoratedStory;
  }),
  argTypes: {
    containerScale: {
      control: 'range',
      min: 0,
      max: MAX_RANGE
    }
  },
  args: {
    containerScale
  }
});

export default meta;

const generateStoryId = StoryIdGenerator('examples');

export const Default = meta.story({
  args: {
    sliceCount: 3
  },
  render: ({ sliceCount = 3 }) => {
    const id = generateStoryId();
    const slicePathId = `${id}___slice_path`;
    const slicePathIds = Array.from(
      { length: sliceCount },
      (_, i) => `${slicePathId}_${i + 1}`
    );
    const value = 360 / slicePathIds.length;
    return html`
      <svg width="0" height="0" styles="position: absolute;">
        <defs>
          ${slicePathIds.map(
            (id, i) => svg`
            <clippath id=${id} clipPathUnits="objectBoundingBox">
              <path d=${computeSectorPath({ startAngle: value * i, value })} />
            </clippath>
          `
          )}
        </defs>
      </svg>
      <div class="${circleStyles.circle} ${utilities.objectFill}">
        ${slicePathIds.map(
          (id) => html`
            <div
              class="${styles.slice} ${sectorStyles.sector} ${sectorStyles.top} ${utilities.objectFill}"
              style="clip-path: url(#${id});"
            ></div>
          `
        )}
      </div>
    `;
  }
});

export const TextFlow = meta.story({
  render: () => {
    const slicePathId = 'text_flow_slice_path';
    const slicePath1Id = `${slicePathId}_1`;
    const slicePath2Id = `${slicePathId}_2`;
    const slicePath3Id = `${slicePathId}_3`;
    return html`
      <svg width="0" height="0" styles="position: absolute;">
        <defs>
          <clippath id=${slicePath1Id} clipPathUnits="objectBoundingBox">
            <path d=${sectorPath({ startAngle: 270, endAngle: 360 })} />
          </clippath>
          <clippath id=${slicePath2Id} clipPathUnits="objectBoundingBox">
            <path d=${sectorPath({ startAngle: 45, endAngle: 90 })} />
          </clippath>
          <clippath id=${slicePath3Id} clipPathUnits="objectBoundingBox">
            <path d=${sectorPath({ startAngle: 90, endAngle: 270 })} />
          </clippath>
        </defs>
      </svg>
      <div
        class="${circleStyles.circle} ${styles.bgYellow} ${utilities.objectFill}"
      >
        <div
          class="${styles.slice} ${sectorStyles.sector} ${sectorStyles.top} ${utilities.objectFill} ${styles.bgOrange}"
          style="clip-path: url(#${slicePath1Id});"
        >
          <div
            class="${styles.sliceOutside} ${styles.top}"
            style="shape-outside: polygon(100% 0, 30% 30%, 0 100%, 0 0);"
          ></div>
          <div
            class="${styles.sliceOutside} ${styles.right}"
            style="shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);"
          ></div>
          <div
            class="${styles.sliceOutside} left"
            style="shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);"
          ></div>
          <span class=${styles.bgWhite}
            >Sometimes a web page's text content appears to be funneling your
            attention towards a spot on the page to drive you to follow a
            particular link. Sometimes you don't notice.</span
          >
        </div>
        <div
          class="${styles.slice} ${sectorStyles.sector} ${sectorStyles.top} ${utilities.objectFill} ${styles.bgPink}"
          style="clip-path: url(#${slicePath2Id})"
        >
          <div
            class="${styles.sliceOutside} ${styles.left}"
            style="width: 85%; shape-outside: polygon(100% 0, 100% 29%, 60% 100%, 0 100%, 0 0)"
          ></div>
          <div
            class="${styles.sliceOutside} ${styles.right}"
            style="width: 15%; shape-outside: polygon(0 29%, 0 0, 100% 0, 100% 100%, 75% 65%)"
          ></div>
          <div class="${styles.sliceOutside} ${styles.right}"></div>
          <span class=${styles.bgWhite}
            >The default behavior; the text in the heading wraps
            "normally"</span
          >
        </div>
        <div
          class="${styles.slice} ${sectorStyles.sector} ${sectorStyles.top} ${utilities.objectFill} ${styles.bgBlue} ${styles.white}"
          style="clip-path: url(#${slicePath3Id});"
        >
          <div
            class="${styles.sliceOutside} ${styles.right}"
            style="shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);"
          ></div>
          <div
            class="${styles.sliceOutside} ${styles.left}"
            style="shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);"
          ></div>
          <div
            class="${styles.sliceOutside} bottom ${styles.left}"
            style="shape-outside: polygon(0% 0%, 30% 70%, 100% 100%, 0% 100%);"
          ></div>
          <div
            class="${styles.sliceOutside} bottom ${styles.right}"
            style="shape-outside: polygon(100% 0%, 70% 70%, 0% 100%, 100% 100%);"
          ></div>
          The quiet harbor slowly woke as the morning sun spread soft light
          across the water. Small waves tapped gently against the wooden pier
          while distant gulls drifted in wide circles overhead. A few early
          walkers paused to watch the boats rocking in the tide, enjoying the
          cool breeze and the calm rhythm of the sea. Moments like this feel
          unhurried and spacious, where every sound carries farther and every
          movement seems deliberate. It is the kind of peaceful scene that
          invites you to linger, breathe deeply, and simply observe the world as
          it gradually comes alive.
        </div>
      </div>
    `;
  }
});
