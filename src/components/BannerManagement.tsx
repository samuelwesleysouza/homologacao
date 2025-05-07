import React, { useState } from 'react';
import { useBanner } from '../context/BannerContext';
import { Banner } from '../types/banner';

interface BannerManagementProps {
  onBannerChange?: () => void;
}

export const BannerManagement: React.FC<BannerManagementProps> = ({ onBannerChange }) => {
  const { banners, addBanner, updateBanner, deleteBanner } = useBanner();
  const [newBanner, setNewBanner] = useState({
    imageUrl: '',
    altText: '',
    isActive: true
  });
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setNewBanner(prev => ({ ...prev, imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    addBanner({
      id: Date.now().toString(),
      imageUrl: newBanner.imageUrl,
      altText: newBanner.altText,
      isActive: newBanner.isActive,
      createdAt: new Date().toISOString()
    });
    setNewBanner({ imageUrl: '', altText: '', isActive: true });
    if (onBannerChange) onBannerChange();
  };

  const handleUpdate = () => {
    if (!selectedBanner) return;

    updateBanner({
      ...selectedBanner,
      imageUrl: newBanner.imageUrl,
      altText: newBanner.altText,
      isActive: newBanner.isActive
    });
    setIsEditing(false);
    if (onBannerChange) onBannerChange();
  };

  const handleDelete = (id: string) => {
    deleteBanner(id);
    if (onBannerChange) onBannerChange();
  };

  return (
    <div className="banner-management">
      <h2>Gerenciamento de Banners</h2>
      
      <div className="banner-form">
        <div className="form-group">
          <label>Imagem do Banner:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="form-group">
          <label>Texto Alternativo:</label>
          <input
            type="text"
            value={newBanner.altText}
            onChange={(e) => setNewBanner(prev => ({ ...prev, altText: e.target.value }))}
          />
        </div>
        <button onClick={handleSubmit}>Adicionar Banner</button>
      </div>

      <div className="banner-list">
        <h3>Banners Atuais</h3>
        <div className="banners-grid">
          {banners.map((banner) => (
            <div key={banner.id} className="banner-item">
              <img src={banner.imageUrl} alt={banner.altText} />
              <div className="banner-actions">
                <button onClick={() => {
                  setSelectedBanner(banner);
                  setNewBanner({
                    imageUrl: banner.imageUrl,
                    altText: banner.altText,
                    isActive: banner.isActive
                  });
                  setIsEditing(true);
                }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(banner.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing && selectedBanner && (
        <div className="edit-banner">
          <h3>Editar Banner</h3>
          <div className="form-group">
            <label>Texto Alternativo:</label>
            <input
              type="text"
              value={newBanner.altText}
              onChange={(e) => setNewBanner(prev => ({ ...prev, altText: e.target.value }))}
            />
          </div>
          <button onClick={handleUpdate}>Salvar Alterações</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};