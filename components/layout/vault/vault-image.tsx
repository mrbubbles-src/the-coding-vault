import VaultCldImage from './vault-cdimage';
import { getCldImageUrl } from 'next-cloudinary';

const VaultImage = async ({
  url,
  caption,
  original_filename,
  public_id,
  width,
  height,
}: {
  url: string;
  caption: string;
  original_filename: string;
  public_id: string;
  width: number;
  height: number;
}) => {
  const imageUrl = getCldImageUrl({
    src: public_id,
  });
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${response.type};base64,${base64}`;

  return (
    <figure className="text-center">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <VaultCldImage
          src={url}
          alt={caption || original_filename}
          width={width}
          height={height}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={dataUrl}
          className="rounded-md shadow-md"
        />
      </a>
      {caption && (
        <figcaption className="mt-1 text-sm text-gray-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default VaultImage;
