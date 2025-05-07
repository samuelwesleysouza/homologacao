import React, { createContext, useContext, useState } from 'react';

interface Banner {
  id: string;
  imageUrl: string;
  altText: string;
  isActive: boolean;
  createdAt: string;
}

interface BannerContextType {
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  addBanner: (banner: Banner) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  getBanners: () => Banner[];
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);

  const addBanner = (banner: Banner) => {
    setBanners(prev => [...prev, banner]);
  };

  const updateBanner = (banner: Banner) => {
    setBanners(prev => 
      prev.map(b => (b.id === banner.id ? banner : b))
    );
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
  };

  const getBanners = () => banners;

  return (
    <BannerContext.Provider 
      value={{ 
        banners, 
        setBanners, 
        addBanner, 
        updateBanner, 
        deleteBanner, 
        getBanners 
      }}
    >
      {children}
    </BannerContext.Provider>
  );

  return (
    <BannerContext.Provider 
      value={{ 
        banners, 
        setBanners, 
        addBanner, 
        updateBanner, 
        deleteBanner, 
        getBanners 
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};
