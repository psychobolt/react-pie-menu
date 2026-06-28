import {
  type CSSProperties,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react';
import { useUserEventCallback } from '@psychobolt/circle-ui-react/utils/hooks.js';
import { createLogger } from '@psychobolt/circle-ui-react/utils/test/functions.js';
import { Circle } from '@psychobolt/circle-ui-react/Circle';
import classNames from 'classnames';
import { fn } from 'storybook/test';

import preview from '.storybook/preview';
import { PieMenu } from 'PieMenu';
import { Slice } from 'Slice';
import styles from './Styles.module.scss';
import contextMenuStyles from './ContextMenu.module.scss';
import preferenceSelectorStyles from './PreferenceSelector.module.scss';
import simonStyles from './Simon.module.scss';
import icons from './Icons.module.scss';

interface Item {
  label: string;
  icon: string;
  startAngle?: number;
  items?: Item[];
}

const meta = preview.meta({
  title: 'Examples'
});

export default meta;

interface ContextArgs {
  x?: number;
  y?: number;
  visible?: boolean;
  items: Item[];
}

export const ContextMenu = meta.type<{ args: ContextArgs }>().story({
  args: {
    x: 150,
    y: 150,
    visible: false,
    items: [
      {
        label: 'Home',
        icon: `${icons.faSolid} ${icons.faHouse} ${icons.fa2X}`,
        startAngle: -22.5
      },
      {
        label: 'Facebook',
        icon: `${icons.faBrands} ${icons.faFacebookF} ${icons.fa2X}`
      },
      {
        label: 'Twitter',
        icon: `${icons.faBrands} ${icons.faTwitter} ${icons.fa2X}`
      },
      {
        label: 'LinkedIn',
        icon: `${icons.faBrands} ${icons.faLinkedinIn} ${icons.fa2X}`
      },
      {
        label: 'GitHub',
        icon: `${icons.faBrands} ${icons.faGithub} ${icons.fa2X}`
      },
      {
        label: 'RSS',
        icon: `${icons.faSolid} ${icons.faRss} ${icons.fa2X}`
      },
      {
        label: 'Pinterest',
        icon: `${icons.faBrands} ${icons.faPinterest} ${icons.fa2X}`
      },
      {
        label: 'Asterisk',
        icon: `${icons.faSolid} ${icons.faAsterisk} ${icons.fa2X}`
      }
    ]
  },
  decorators: [
    (Story, { args }) => {
      const [left, setLeft] = useState(0);
      const [top, setTop] = useState(0);
      const [x, setX] = useState(args.x);
      const [y, setY] = useState(args.y);
      const [visible, setVisible] = useState(args.visible);
      const container = useRef<HTMLElement>(document.body);

      useEffect(() => {
        setX(args.x);
      }, [args.x]);

      useEffect(() => {
        setY(args.y);
      }, [args.y]);

      useEffect(() => {
        setVisible(args.visible);
      }, [args.visible]);

      useLayoutEffect(() => {
        const { left, top } = container.current.getBoundingClientRect();
        setLeft(left);
        setTop(top);
      }, []);

      useUserEventCallback(container, 'pointerdown', (e) => {
        setX(e.clientX - left);
        setY(e.clientY - top);
        setVisible(true);
      });
      useUserEventCallback(container, 'pointerup', () => setVisible(false));

      return (
        <div
          className={classNames(
            contextMenuStyles.contextMenuExample,
            contextMenuStyles.fullHeight
          )}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className={classNames(
              contextMenuStyles.flexColumn,
              contextMenuStyles.flexAlignCenter
            )}
          >
            <p
              className={classNames(
                contextMenuStyles.sansSerif,
                contextMenuStyles.fontLarge
              )}
            >
              Touch and hold anywhere.
            </p>
            <div className={contextMenuStyles.logo} />
          </div>
          <Story args={{ ...args, x, y, visible }} />
        </div>
      );
    }
  ],
  render: ({ items, x, y, visible }) => {
    const style = useMemo((): CSSProperties | undefined => {
      const transform = [];
      typeof x === 'number' && transform.push(`translateX(calc(${x}px - 50%))`);
      typeof y === 'number' && transform.push(`translateY(calc(${y}px - 50%))`);
      return {
        visibility: visible ? 'visible' : 'hidden',
        transform: transform.length ? transform.join(' ') : undefined
      };
    }, [visible, x, y]);

    return (
      <PieMenu
        className={contextMenuStyles.menu}
        style={style}
        innerRadius={30}
        onContainer='body:pointermove'
      >
        {items?.map(({ icon, startAngle, label }, i) => {
          const message = `${label} selected`;
          return (
            <Slice
              key={i}
              className={contextMenuStyles.item}
              startAngle={startAngle}
              onPointerUp={fn(createLogger(message)).mockName(message)}
            >
              <i className={classNames(icon, styles.center)} />
            </Slice>
          );
        })}
      </PieMenu>
    );
  }
});

interface PreferenceArgs {
  categories: Item[];
  choices: [number, number, number, number];
}

export const PreferenceSelector = meta.type<{ args: PreferenceArgs }>().story({
  args: {
    categories: [
      {
        label: 'Payment',
        icon: `${icons.faSolid} ${icons.faMoneyBillAlt} ${icons.fa2X}`,
        startAngle: -60,
        items: [
          {
            label: 'Amazon Pay',
            icon: `${icons.faBrands} ${icons.faCcAmazonPay} ${icons.fa2X}`,
            startAngle: -20
          },
          {
            label: 'Amex',
            icon: `${icons.faBrands} ${icons.faCcAmex} ${icons.fa2X}`
          },
          {
            label: 'Apple Pay',
            icon: `${icons.faBrands} ${icons.faCcApplePay} ${icons.fa2X}`
          },
          {
            label: 'Discover',
            icon: `${icons.faBrands} ${icons.faCcDiscover} ${icons.fa2X}`
          },
          {
            label: 'MasterCard',
            icon: `${icons.faBrands} ${icons.faCcMastercard} ${icons.fa2X}`
          },
          {
            label: 'PayPal',
            icon: `${icons.faBrands} ${icons.faCcPaypal} ${icons.fa2X}`
          },
          {
            label: 'Visa',
            icon: `${icons.faBrands} ${icons.faCcVisa} ${icons.fa2X}`
          },
          {
            label: 'Etheremum',
            icon: `${icons.faBrands} ${icons.faEthereum} ${icons.fa2X}`
          },
          {
            label: 'Google Wallet',
            icon: `${icons.faBrands} ${icons.faGoogleWallet} ${icons.fa2X}`
          }
        ]
      },
      {
        label: 'Gender',
        icon: `${icons.faSolid} ${icons.faVenusMars} ${icons.fa2X}`,
        items: [
          {
            label: 'Genderless',
            icon: `${icons.faSolid} ${icons.faGenderless} ${icons.fa2X}`,
            startAngle: -36
          },
          {
            label: 'Female',
            icon: `${icons.faSolid} ${icons.faVenus} ${icons.fa2X}`
          },
          {
            label: 'Neuter',
            icon: `${icons.faSolid} ${icons.faNeuter} ${icons.fa2X}`
          },
          {
            label: 'Transgender',
            icon: `${icons.faSolid} ${icons.faTransgender} ${icons.fa2X}`
          },
          {
            label: 'Male',
            icon: `${icons.faSolid} ${icons.faMars} ${icons.fa2X}`
          }
        ]
      },
      {
        label: 'Location',
        icon: `${icons.faSolid} ${icons.faLocationArrow} ${icons.fa2X}`,
        items: [
          {
            label: 'Bath',
            icon: `${icons.faSolid} ${icons.faBath}`,
            startAngle: -10
          },
          {
            label: 'Bed',
            icon: `${icons.faSolid} ${icons.faBed}`
          },
          {
            label: 'Beer',
            icon: `${icons.faSolid} ${icons.faBeer}`
          },
          {
            label: 'Bicycle',
            icon: `${icons.faSolid} ${icons.faBicycle}`
          },
          {
            label: 'Building',
            icon: `${icons.faSolid} ${icons.faBuilding}`
          },
          {
            label: 'Car',
            icon: `${icons.faSolid} ${icons.faCar}`
          },
          {
            label: 'Coffee',
            icon: `${icons.faSolid} ${icons.faCoffee}`
          },
          {
            label: 'Gamepad',
            icon: `${icons.faSolid} ${icons.faGamepad}`
          },
          {
            label: 'Home',
            icon: `${icons.faSolid} ${icons.faHome}`
          },
          {
            label: 'Hospital',
            icon: `${icons.faSolid} ${icons.faHospital}`
          },
          {
            label: 'Phone Volume',
            icon: `${icons.faSolid} ${icons.faPhoneVolume}`
          },
          {
            label: 'Plane',
            icon: `${icons.faSolid} ${icons.faPlane}`
          },
          {
            label: 'Shower',
            icon: `${icons.faSolid} ${icons.faShower}`
          },
          {
            label: 'Street View',
            icon: `${icons.faSolid} ${icons.faStreetView}`
          },
          {
            label: 'Subway',
            icon: `${icons.faSolid} ${icons.faSubway}`
          },
          {
            label: 'Taxi',
            icon: `${icons.faSolid} ${icons.faTaxi}`
          },
          {
            label: 'Train',
            icon: `${icons.faSolid} ${icons.faTrain}`
          },
          {
            label: 'University',
            icon: `${icons.faSolid} ${icons.faUniversity}`
          }
        ]
      }
    ],
    choices: [-1, -1, -1, -1]
  },
  decorators: [
    (Story) => (
      <div className={preferenceSelectorStyles.preferenceSelectorExample}>
        <Story />
      </div>
    )
  ],
  render: ({ categories, ...props }) => {
    const [choices, setChoices] = useState(props.choices);
    const isValidChoice = (choice: number) =>
      // eslint-disable-next-line yoda
      -1 < choice && choice < categories.length;
    const items = isValidChoice(choices[0])
      ? (categories[choices[0]].items ?? [])
      : categories;

    useEffect(() => {
      setChoices(props.choices);
    }, [props.choices]);

    return (
      <PieMenu className={preferenceSelectorStyles.menu} innerRadius={30}>
        {items.map((category, i) => {
          const choice = !isValidChoice(choices[0]) ? choices[i + 1] : -1;
          const selectedCategory = categories[i]?.items?.[choice];
          return (
            <Slice
              key={i}
              className={classNames(
                preferenceSelectorStyles.item,
                !!selectedCategory && preferenceSelectorStyles.selected
              )}
              activeClassName={preferenceSelectorStyles.active}
              active={choices[choices[0] + 1] === i || undefined}
              startAngle={category.startAngle}
              onPointerUp={() =>
                setChoices(
                  choices.map((choice, j) =>
                    choices[0] + 1 === j ? i : choice
                  ) as typeof choices
                )
              }
            >
              <div className={styles.center}>
                {isValidChoice(choices[0]) ? (
                  <>
                    <i className={category.icon} />
                    {items.length < 6 && <p>{category.label}</p>}
                  </>
                ) : (
                  <i
                    className={classNames(
                      (selectedCategory ?? category).icon,
                      icons.fa2X
                    )}
                  />
                )}
              </div>
            </Slice>
          );
        })}
        {isValidChoice(choices[0]) && (
          <Circle
            className={preferenceSelectorStyles.center}
            onClick={() =>
              setChoices([-1, ...choices.slice(1)] as typeof choices)
            }
          >
            <i
              className={`${icons.faSolid} ${icons.faArrowLeft} ${icons.fa2X} ${styles.center}`}
            />
          </Circle>
        )}
      </PieMenu>
    );
  }
});

export const Simon = meta.type().story({
  decorators: [
    (Story) => (
      <div className={simonStyles.simonExample}>
        <Story />
      </div>
    )
  ],
  render: (_) => {
    const [message, setMessage] = useState<String>();
    const alert = () => setMessage('Ding!');
    return (
      <PieMenu className={simonStyles.menu} innerRadius={50}>
        <Slice className={simonStyles.red} onClick={alert} />
        <Slice className={simonStyles.blue} onClick={alert} />
        <Slice className={simonStyles.yellow} onClick={alert} />
        <Slice className={simonStyles.green} onClick={alert} />
        <Circle className={simonStyles.center}>{message}</Circle>
      </PieMenu>
    );
  }
});
