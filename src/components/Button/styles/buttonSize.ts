const sizeBreakPoints = {
    small: `
            height: 1.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            font-size: 0.875rem;
      `,
    medium: `
            height: 2rem;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            font-size: 1rem;
      `,
    large: `
            height: 2.5rem;
            padding-left: 1.125rem;
            padding-right: 1.125rem;
            & + & {
            margin-left: 0.875rem;
            }
            font-size: 1.125rem;
      `,
};

export const buttonSize = (key: keyof typeof sizeBreakPoints) => {
    return sizeBreakPoints[key];
};