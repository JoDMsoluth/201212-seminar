// declaration.d.ts
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

// storybook은 mdx로 docs를 편하게 작성할 수 있습니다.
declare module '*.mdx';