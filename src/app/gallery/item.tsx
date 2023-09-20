import { forwardRef } from "react";

type ItemProps = { id: number | string };
export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {id}
      </div>
    );
  }
);

Item.displayName = "Item";
