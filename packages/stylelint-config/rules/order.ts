import { flatten, unflatten } from 'flat';
import config from 'stylelint-config-hudochenkov/order';

const { 'order/order': _, ...order } = config.rules ?? {};
type Rules = NonNullable<typeof config.rules>;

const rulesFlattened: Record<string, Rules[keyof Rules]> = flatten(order);

const updatedRules: Rules = unflatten(
  {
    ...rulesFlattened,
    'order/order.0': [
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'reset'
      },
      'custom-properties',
      'declarations',
      {
        type: 'at-rule',
        name: 'include'
      },
      {
        type: 'at-rule',
        name: 'at-root'
      },
      'rules',
      'at-rules'
    ],
    'order/order.1.severity': 'error',
    'order/properties-order.1.severity': 'error'
  },
  { overwrite: true }
);

export default updatedRules;
