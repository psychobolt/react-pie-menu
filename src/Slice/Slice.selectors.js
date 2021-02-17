const context = key => ({ theme }) => theme.context?.[key];

export const startAngle = context('startAngle');
export const endAngle = context('endAngle');
export const skew = context('skew');
