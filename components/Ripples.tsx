"use client";

import RipplesBase, { RipplesProps as RipplesBaseProps } from "react-ripples";

import { ReactNode } from "react";

interface RipplesProps extends RipplesBaseProps {
  children: ReactNode;
}

export default function Ripples({ children, ...props }: RipplesProps) {
  return (
    <RipplesBase
      placeholder={undefined}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      {...props}
    >
      {children}
    </RipplesBase>
  );
}
