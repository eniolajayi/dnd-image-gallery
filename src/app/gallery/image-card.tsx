import Image from "next/image";

export type ImageCardProps = {
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  src: string;
  alt: string;
};

export default function ImageCard(props: ImageCardProps) {
  return (
    <figure className="w-[200px] h-[200px]">
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
