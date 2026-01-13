'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval, addDays, format } from 'date-fns';

const BookingClient = ({ property }) => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 30)]);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/properties/${property.id}/availability`);
        if (res.ok) {
          const data = await res.json();
          setBookedDates(data.map(b => ({
            start: new Date(b.checkIn),
            end: b.checkOut ? new Date(b.checkOut) : new Date(b.checkIn)
          })));
        }
      } catch (err) {
        console.error("Availability fetch failed", err);
      }
    };
    fetchAvailability();
  }, [property.id]);

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return bookedDates.some(range =>
        isWithinInterval(date, { start: range.start, end: range.end })
      );
    }
    return false;
  };

  const handleBook = () => {
    const checkInStr = dateRange[0].toISOString();
    const checkOutStr = dateRange[1] ? dateRange[1].toISOString() : '';
    router.push(`/booking/${property.id}?checkIn=${checkInStr}&checkOut=${checkOutStr}`);
  };

  return (
    <div className="glass-card" style={{ padding: '32px' }}>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Monthly Rent</h3>
      <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '24px' }}>{property.priceLabel}</p>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '700' }}>CHECK AVAILABILITY</label>
        <div className="preview-calendar">
          <Calendar
            onChange={setDateRange}
            value={dateRange}
            selectRange={true}
            tileDisabled={tileDisabled}
            minDate={new Date()}
          />
        </div>
        <style jsx global>{`
          .preview-calendar .react-calendar {
            width: 100% !important;
            background: rgba(0,0,0,0.2) !important;
            border: 1px solid var(--glass-border) !important;
            border-radius: 12px !important;
            font-size: 0.8rem !important;
            color: white !important;
          }
          .preview-calendar .react-calendar__tile {
            color: white !important;
            height: 35px !important;
            padding: 5px !important;
          }
           .preview-calendar .react-calendar__month-view__weekdays__weekday {
            padding: 0.5em !important;
          }
          .preview-calendar .react-calendar__tile--active {
            background: var(--accent) !important;
            color: var(--bg-main) !important;
          }
           .preview-calendar .react-calendar__tile--disabled {
            background: rgba(239, 68, 68, 0.1) !important;
            color: rgba(255,255,255,0.2) !important;
          }
          .preview-calendar .react-calendar__navigation button {
            color: white !important;
          }
        `}</style>
      </div>

      <button
        onClick={handleBook}
        style={{
          width: '100%',
          padding: '16px',
          background: 'var(--accent)',
          color: 'var(--bg-main)',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '1.1rem',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer'
        }}
      >Book This House</button>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>You won't be charged yet</p>
    </div>
  );
};

export default BookingClient;
