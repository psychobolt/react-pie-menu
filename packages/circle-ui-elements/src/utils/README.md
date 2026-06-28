# Utils

## Functions

### Get End Angle

Returns the computed end angle for a slice, given a starting angle and a value.

```ts
import { getEndAngle } from '@psychobolt/circle-ui-elements/utils/functions';

const endAngle: number = getEndAngle(startAngle, value);
```

#### Parameters

- `startAngle` (**number**): The starting angle in degrees.
- `value` (**number**):
  - If between 0 and 1 (inclusive): interpreted as a fraction of the full circle (360 degrees).
  - If greater than 1: interpreted as an angle in degrees.

#### Returns

- (**number**) The end angle in degrees, calculated as `startAngle + (value * 360)` (if `value` is 0–1) or `startAngle + value` (if `value` > 1).

#### Example

```ts
// Using a fraction (e.g., quarter of a circle)
getEndAngle(0, 0.25); // 90

// Using an angle in degrees
getEndAngle(45, 90); // 135
```

### Sector Path

Returns the SVG path data string representing a circular sector.

```ts
import { sectorPath } from '@psychobolt/circle-ui-elements/utils/functions';

const path: string = sectorPath({/* options */});
```

#### Options (Optional)

- `center` (**[number, number]**): The x and y coordinate of the circle center. e.g. `[0.5, 0.5]`
- `outerRadius` (**number**): The radius of the circle.
- `innterRadius` (**number**): The inner radius (hole) of the circle.
- `value` (**number**): The value representing the angle or fraction of the slice.
- `startAngle` (**number**): The starting angle (in degrees).
- `endAngle` (**number**): The ending angle (in degrees).

#### Returns

- (**string**) The SVG path data string representing the circular sector. This can be used as the `d` attribute in an SVG `<path>` element.

### Compute Sector Path

Computes the SVG path string for a circular slice given either a decimal value (0-1, as proportion of a circle) or a central angle value (in degrees).

```ts
import { computeSectorPath } from '@psychobolt/circle-ui-elements/utils/functions';

const path: string = computeSectorPath({/* options */});
```

#### Options (Optional)

- `innterRadius` (**number**): The inner radius (hole) of the circle.
- `value` (**number**):
  - If `value` is between 0 and 1, it's treated as a proportion of the circle (value \* 360 deg).
  - If `value` > 1, it's treated as a central angle in degrees.
- `startAngle` (**number**): Can be provided to shift the start of the sector (default 0).

#### Returns

- (**string**) SVG path data string for the computed circular sector. This can be used directly as the `d` attribute of an SVG `<path>` element.
