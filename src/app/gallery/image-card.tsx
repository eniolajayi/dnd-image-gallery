import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export type ImageCardProps = {
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  src: string;
  alt: string;
  tags?: string | string[];
};

export default function ImageCard(props: ImageCardProps) {
  return (
    <figure className="w-[250px] h-[250px] relative">
      <div className="w-full h-6 absolute top-1 left-[2px]">
        <Badge variant="secondary">{props.alt}</Badge>
      </div>
      <Image
        width={300}
        height={300}
        alt={props.alt}
        src={props.src}
        className="w-full h-full object-cover"
        title={props.alt}
      />
    </figure>
  );
}
