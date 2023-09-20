import ImageCard, { ImageCardProps } from "./image-card";
import SortableItem from "./sortable-item";

type SortableImageCardProps = ImageCardProps & { id: string | number };

export default function SortableImageCard({
  id,
  ...props
}: SortableImageCardProps) {
  return (
    <SortableItem id={id}>
      <ImageCard {...props} />
    </SortableItem>
  );
}
