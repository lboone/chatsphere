import React from "react";

interface KBDProps {
  commandKey: string;
  letterKey: string;
}
const KBD = ({ commandKey, letterKey }: KBDProps) => {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
      <span className="text-sm uppercase">{commandKey}</span>
      <span className="uppercase">{letterKey} </span>
    </kbd>
  );
};

export default KBD;
