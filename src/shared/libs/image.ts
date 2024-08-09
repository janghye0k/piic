import sharp from 'sharp';
import imageSize from 'image-size';

const MAX_WIDTH = 1920 * 2;
const MAX_HEIGHT = 1080 * 2;

export async function optimizeImage(image: File) {
  const filename = image.name.replaceAll(' ', '_');
  const buffer = Buffer.from(await image.arrayBuffer());
  const { width, height } = imageSize(buffer);
  let optimized: Buffer;

  if ((width && width > MAX_WIDTH) || (height && height > MAX_HEIGHT)) {
    optimized = await sharp(buffer).resize(MAX_WIDTH, MAX_HEIGHT).webp().toBuffer();
  } else {
    optimized = await sharp(buffer).webp().toBuffer();
  }

  const converted = new File([optimized], filename, { type: 'image/webp' });
}
