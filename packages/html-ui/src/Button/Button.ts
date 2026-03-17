import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { StoryPseudoStateProps } from 'commons/esm/.storybook/utils/story-generators.js';
import classNames from 'classnames';

import type { SizeEnum } from './Sizes/Primary.variants';
import styles from './Button.module.scss';

type Size = keyof typeof SizeEnum;

export interface Props extends StoryPseudoStateProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: string;
  /**
   * Please use `variant` property
   *
   * @deprecated
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: Size;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  variant = styles.storybookButtonPrimary,
  backgroundColor,
  size = 'medium',
  label,
  storyPseudo,
  storyAttr,
  onClick
}: Props) => {
  const mode = primary ? styles.storybookButtonPrimary : variant;

  return html`
    <button
      type="button"
      class=${classNames(
        styles.storybookButton,
        styles[`storybook-button--${size}`],
        mode,
        storyPseudo
      )}
      style=${backgroundColor ? styleMap({ backgroundColor }) : nothing}
      ${storyAttr}
      @click=${onClick}
    >
      ${label}
    </button>
  `;
};
