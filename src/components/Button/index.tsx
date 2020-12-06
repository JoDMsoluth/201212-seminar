import React from 'react';
import styled, { css as styledCss } from 'styled-components';
import { buttonColor } from './styles/buttonColor';
import { buttonSize } from './styles/buttonSize';
import "./styles/Button.module.scss";

export interface ButtonProps {
    size?: "small" | "medium" | "large";
    color?: "dark" | "white";
    children: string;
    [key: string]: any;
}

export default function Button({children, ...props}: ButtonProps) {
    return (
        <S.Button {...props}>
            {children}
        </S.Button>
    )
}

Button.defaultProps = {
    size: "medium",
    color: "white"
}

const S: any = {}

S.Button = styled.button<Pick<ButtonProps, "size" | "color">>`
    ${(props) => styledCss`
        ${buttonSize(props.size)}
        ${buttonColor(props.color)}
    `}
`;