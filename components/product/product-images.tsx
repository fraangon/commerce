/* eslint-disable @next/next/no-img-element */

type Image = {
  url: string;
  width: number;
  height: number;
  altText: string;
};

export default function ProductImages({ images }: { images: Image[] }) {
  return (
    <div className="flex h-full w-full cursor-pointer flex-col justify-center space-y-3 pt-20">
      {images.map((image) => (
        <img
          className="h-full w-full rounded bg-brand-200 object-cover [&:first]:aspect-square"
          src={image.url}
          alt={image.altText}
          key={image.url}
        />
      ))}
    </div>
  );
}
