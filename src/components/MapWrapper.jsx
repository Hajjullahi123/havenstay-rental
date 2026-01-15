'use client';
import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => <div style={{ height: '500px', width: '100%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>Loading Map...</div>
});

const ClientPropertyMap = ({ properties, center, zoom }) => {
  return <PropertyMap properties={properties} center={center} zoom={zoom} />;
};

export default ClientPropertyMap;
