import React from 'react';
import { BannerManagement } from '../../components/BannerManagement';

export default function BannerManagementPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento de Banners</h1>
      <BannerManagement />
    </div>
  );
}