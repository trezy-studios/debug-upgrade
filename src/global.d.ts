declare namespace React {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare module '*.glsl' {
  const value: string
  export default value
}
