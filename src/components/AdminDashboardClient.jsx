'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, List, Calendar as CalendarIcon, Trash2, CheckCircle, ExternalLink, MapPin } from 'lucide-react';

const AdminDashboardClient = ({ initialProperties, initialBookings }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState(initialProperties);
  const [bookings, setBookings] = useState(initialBookings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProp, setNewProp] = useState({ title: '', location: '', address: '', price: '', type: 'Apartment', description: '', lat: '', lng: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80';

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) {
          imageUrl = uploadData.url;
        }
      }

      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProp,
          price: parseFloat(newProp.price),
          beds: 3, baths: 2, area: '1200 sqft', amenities: ['WiFi', 'Parking'],
          image: imageUrl
        })
      });
      if (res.ok) {
        const added = await res.json();
        setProperties([added, ...properties]);
        setShowAddModal(false);
        setNewProp({ title: '', location: '', address: '', price: '', type: 'Apartment', description: '', lat: '', lng: '' });
        setImageFile(null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (bookingId) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/verify`, { method: 'POST' });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, payment: { ...b.payment, status: 'VERIFIED' } } : b));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', background: 'var(--accent)', color: 'var(--bg-main)',
            borderRadius: '12px', fontWeight: '700', cursor: 'pointer', border: 'none'
          }}
        >
          <Plus size={20} /> Add New Property
        </button>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
          <button
            onClick={() => setActiveTab('properties')}
            style={{
              padding: '20px 40px', background: 'transparent', color: activeTab === 'properties' ? 'var(--accent)' : 'var(--text-muted)',
              borderBottom: activeTab === 'properties' ? '2px solid var(--accent)' : 'none',
              fontWeight: '600', cursor: 'pointer', border: 'none',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            <List size={18} /> Properties ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '20px 40px', background: 'transparent', color: activeTab === 'bookings' ? 'var(--accent)' : 'var(--text-muted)',
              borderBottom: activeTab === 'bookings' ? '2px solid var(--accent)' : 'none',
              fontWeight: '600', cursor: 'pointer', border: 'none',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            <CalendarIcon size={18} /> Bookings ({bookings.length})
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {activeTab === 'properties' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '16px' }}>Property</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'var(--transition)' }}>
                      <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={p.image} style={{ width: '50px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600' }}>{p.title}</span>
                      </td>
                      <td>{p.location}</td>
                      <td style={{ color: 'var(--accent)', fontWeight: '600' }}>{p.priceLabel}</td>
                      <td>
                        <span style={{
                          padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem',
                          background: p.status === 'AVAILABLE' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                          color: p.status === 'AVAILABLE' ? '#4ade80' : '#ff4d4d'
                        }}>{p.status}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                          <button onClick={() => window.open(`/property/${p.id}`, '_blank')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={18} /></button>
                          <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '16px' }}>Tenant</th>
                    <th>Property</th>
                    <th>Stay Duration</th>
                    <th>Payment</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: '600' }}>{b.user.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.user.email}</div>
                      </td>
                      <td style={{ fontWeight: '500' }}>{b.property.title}</td>
                      <td>
                        <div style={{ fontSize: '0.9rem' }}>{new Date(b.checkIn).toLocaleDateString()}</div>
                        {b.checkOut && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>to {new Date(b.checkOut).toLocaleDateString()}</div>
                        )}
                      </td>
                      <td>
                        <div style={{ fontWeight: '700', color: 'var(--accent)' }}>${b.amount.toLocaleString()}</div>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{b.payment?.method}</div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {b.payment?.status === 'PENDING' ? (
                          <button
                            onClick={() => handleVerify(b.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '4px',
                              padding: '8px 16px', background: 'var(--accent)', color: 'var(--bg-main)',
                              borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'
                            }}
                          >
                            <CheckCircle size={16} /> Verify
                          </button>
                        ) : (
                          <span style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                            <CheckCircle size={16} /> Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div className="glass-card" style={{ width: '500px', maxWidth: '90%', padding: '40px' }}>
            <h2 style={{ marginBottom: '24px' }}>Add Luxury Property</h2>
            <form onSubmit={handleAddProperty} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Property Title" required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} value={newProp.title} onChange={e => setNewProp({ ...newProp, title: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input type="text" placeholder="City (e.g. Lagos)" required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} value={newProp.location} onChange={e => setNewProp({ ...newProp, location: e.target.value })} />
                <input type="number" placeholder="Price (USD)" required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} value={newProp.price} onChange={e => setNewProp({ ...newProp, price: e.target.value })} />
              </div>
              <input type="text" placeholder="Full Address" required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} value={newProp.address} onChange={e => setNewProp({ ...newProp, address: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input type="text" placeholder="Lat (e.g. 6.4)" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} value={newProp.lat} onChange={e => setNewProp({ ...newProp, lat: e.target.value })} />
                <input type="text" placeholder="Lng (e.g. 3.4)" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} value={newProp.lng} onChange={e => setNewProp({ ...newProp, lng: e.target.value })} />
              </div>
              <textarea placeholder="Description" required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', minHeight: '100px' }} value={newProp.description} onChange={e => setNewProp({ ...newProp, description: e.target.value })}></textarea>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ color: 'var(--text-muted)' }} />

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '12px', background: 'var(--accent)', border: 'none', borderRadius: '8px', color: 'var(--bg-main)', fontWeight: '700', cursor: 'pointer' }}>{isSubmitting ? 'Adding...' : 'Save Property'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardClient;
