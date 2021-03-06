import palette from '../../../utils/palette';

const colorBreakPoints = {
    white: `
        background: ${palette.gray2};
        color: ${palette.gray7};
        &:hover {
            background: ${palette.gray1};
        }
    `,
    dark: `
        background: ${palette.gray6};
        color: ${palette.gray0};
        &:hover {
            background: ${palette.gray5};
        }
    `
};

export const buttonColor = (key: keyof typeof colorBreakPoints) => {
    return colorBreakPoints[key]
};
