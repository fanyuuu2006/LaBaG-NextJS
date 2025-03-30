import React from "react";

// 擴充時轉 Intetface
export type OutsideLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * 外部連結組件
 * @param {OutsideLinkProps} props
 */

export const OutsideLink: React.FC<OutsideLinkProps> = (
  props: OutsideLinkProps
) => {
  const { target, rel, children, ...rest } = props;
  return (
    <a {...rest} target={target ?? "_blank"} rel={rel ?? "noopener noreferrer"}>
      {children ?? props.href}
    </a>
  );
};
