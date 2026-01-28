const PHOTO_STORAGE_KEY = "photos";

const getPhotos = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(PHOTO_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const savePhotos = (photos) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos));
};

const photoStore = {
  photos: [],

  load() {
    this.photos = getPhotos();
  },

  add(photo) {
    this.photos.push(photo);
    savePhotos(this.photos);
  },

  update(id, updatedPhoto) {
    this.photos = this.photos.map((p) =>
      p.id === id ? updatedPhoto : p
    );
    savePhotos(this.photos);
  },

  delete(id) {
    this.photos = this.photos.filter((p) => p.id !== id);
    savePhotos(this.photos);
  },
};

export default photoStore;
