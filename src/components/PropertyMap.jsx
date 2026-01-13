'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PropertyMap = ({ properties, center = [6.45, 3.45], zoom = 12 }) => {
  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)', zIndex: 1 }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((p) => (
          p.lat && p.lng && (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
              <Popup>
                <div style={{ minWidth: '150px' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{p.title}</h4>
                  <p style={{ margin: '0 0 8px', color: 'var(--accent)', fontWeight: '700' }}>{p.priceLabel}</p>
                  <Link href={`/property/${p.id}`} style={{
                    display: 'block',
                    textAlign: 'center',
                    background: 'var(--accent)',
                    color: 'var(--bg-main)',
                    padding: '6px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
