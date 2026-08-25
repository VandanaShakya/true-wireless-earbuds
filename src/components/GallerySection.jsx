import { galleryImages } from '../data/features'

const GallerySection = () => {
  return (
    <section id="gallery" className="gallery-section relative z-10 h-screen overflow-hidden">
      <div className="gallery-stage relative h-full w-full">
        {galleryImages.map((image, index) => (
          <figure
            key={image.id}
            className="gallery-img absolute overflow-hidden rounded-sm will-change-transform"
            data-slot={index}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default GallerySection
