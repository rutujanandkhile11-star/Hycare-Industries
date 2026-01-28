import { useState, useEffect, useRef } from "react";
import photoStore from "../../store/photostore";

const DashboardPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  // ✅ LOAD PHOTOS ON MOUNT
  useEffect(() => {
    photoStore.load();
    setPhotos([...photoStore.photos]);
  }, []);

  const clearMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setEditingId(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const addOrUpdatePhoto = async (e) => {
    e.preventDefault();
    if (!title) return;

    let imageBase64 = null;
    if (file) imageBase64 = await toBase64(file);

    if (editingId) {
      const oldPhoto = photos.find((p) => p.id === editingId);
      const updatedPhoto = {
        id: editingId,
        title,
        image: imageBase64 || oldPhoto.image,
      };
      photoStore.update(editingId, updatedPhoto);
      setMessage("✅ Photo updated successfully");
    } else {
      if (!imageBase64) {
        alert("Please select an image");
        return;
      }
      const newPhoto = { id: Date.now(), title, image: imageBase64 };
      photoStore.add(newPhoto);
      setMessage("✅ Photo uploaded successfully");
    }

    setPhotos([...photoStore.photos]);
    resetForm();
    clearMessage();
  };

  const editPhoto = (photo) => {
    setTitle(photo.title);
    setEditingId(photo.id);
    setPreviewImage(photo.image);
    setFile(null);
  };

  const deletePhoto = (id) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      photoStore.delete(id);
      setPhotos([...photoStore.photos]);
      setMessage("🗑 Photo deleted successfully");
      clearMessage();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Photo Management</h2>

      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={addOrUpdatePhoto} className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Photo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control mb-2"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            if (f) setPreviewImage(URL.createObjectURL(f));
          }}
          required={!editingId}
        />

        <button className="btn btn-primary">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {photos.length ? (
            photos.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt="" width="100" />
                </td>
                <td>{p.title}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editPhoto(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePhoto(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No photos added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPhotos;
