// https://feathericons.dev/cpu
export function Cpu(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
      <rect height="16" rx="2" ry="2" width="16" x="4" y="4" />
      <rect height="6" width="6" x="9" y="9" />
      <line x1="9" x2="9" y1="1" y2="4" />
      <line x1="15" x2="15" y1="1" y2="4" />
      <line x1="9" x2="9" y1="20" y2="23" />
      <line x1="15" x2="15" y1="20" y2="23" />
      <line x1="20" x2="23" y1="9" y2="9" />
      <line x1="20" x2="23" y1="14" y2="14" />
      <line x1="1" x2="4" y1="9" y2="9" />
      <line x1="1" x2="4" y1="14" y2="14" />
    </svg>
  );
}
