import { Grid, PhotosGalleryItem } from "..";

export const PhotosGallery = ({ images }) => {
  return (
    <Grid>
      {images.map(({ id, avg_color, alt, src }) => (
        <PhotosGalleryItem key={id} avg_color={avg_color} alt={alt} src={src} />
      ))}
    </Grid>
  );
};
