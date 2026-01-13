'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval, addDays, format, parseISO, differenceInDays } from 'date-fns';

const BookingForm = ({ property }) => {
  const searchParams = useSearchParams();
  const initialCheckIn = searchParams.get('checkIn') ? parseISO(searchParams.get('checkIn')) : new Date();
  const initialCheckOut = searchParams.get('checkOut') ? parseISO(searchParams.get('checkOut')) : addDays(initialCheckIn, 7);

  const [dateRange, setDateRange] = useState([initialCheckIn, initialCheckOut]);
  const [bookedDates, setBookedDates] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [receipt, setReceipt] = useState(null);
  const [showSimulatedOverlay, setShowSimulatedOverlay] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const nights = dateRange[1] ? differenceInDays(dateRange[1], dateRange[0]) : 0;
  const stayCost = (property.price / 30) * (nights || 1);
  const serviceFee = 20;
  const totalAmount = stayCost + serviceFee;

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

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (paymentMethod === 'online') {
      setShowSimulatedOverlay(true);
      setPaymentStep(1);

      try {
        const checkoutRes = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            propertyId: property.id,
            amount: totalAmount
          })
        });
        const checkoutData = await checkoutRes.json();

        if (checkoutData.url) {
          // Real Stripe redirect
          window.location.href = checkoutData.url;
          return;
        }

        // Simulated flow continues if no real Stripe URL (e.g. no API key)
        await new Promise(r => setTimeout(r, 2000));
        setPaymentStep(2);
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error("Stripe error:", err);
      }
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn: dateRange[0].toISOString(),
          checkOut: dateRange[1] ? dateRange[1].toISOString() : null,
          paymentMethod,
          amount: totalAmount
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setShowSimulatedOverlay(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '24px' }}>✅</div>
          <h1 style={{ marginBottom: '16px' }}>Booking Request Sent!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Your request for <strong>{property.title}</strong> has been submitted.
            {paymentMethod === 'manual' ? ' Our team will verify your payment receipt and contact you shortly.' : ' You will receive a confirmation email shortly.'}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/" style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px', fontWeight: '700' }}>
              Back to Home
            </Link>
            <Link href="/dashboard" style={{ padding: '12px 24px', background: 'var(--accent)', color: 'var(--bg-main)', borderRadius: '12px', fontWeight: '700' }}>
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) 1fr', gap: '40px' }}>
      {/* Left: Booking Form */}
      <form onSubmit={handleBooking} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>Select Dates</h3>
          <div className="custom-calendar" style={{ color: '#000' }}>
            <Calendar
              onChange={setDateRange}
              value={dateRange}
              selectRange={true}
              tileDisabled={tileDisabled}
              minDate={new Date()}
            />
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Selected: {format(dateRange[0], 'MMM dd')} - {dateRange[1] ? format(dateRange[1], 'MMM dd, yyyy') : '...'}
          </p>
          <style jsx global>{`
            .react-calendar {
              width: 100% !important;
              background: rgba(255,255,255,0.05) !important;
              border: 1px solid var(--glass-border) !important;
              border-radius: 12px !important;
              font-family: inherit !important;
              color: white !important;
              padding: 10px;
            }
            .react-calendar__tile {
              color: white !important;
              border-radius: 8px;
            }
            .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
              background-color: var(--accent) !important;
              color: var(--bg-main) !important;
            }
            .react-calendar__tile--now {
              background: rgba(212, 175, 55, 0.2) !important;
            }
            .react-calendar__tile--active {
              background: var(--accent) !important;
              color: var(--bg-main) !important;
            }
            .react-calendar__tile--disabled {
              background: rgba(239, 68, 68, 0.2) !important;
              color: rgba(255,255,255,0.3) !important;
              cursor: not-allowed;
            }
            .react-calendar__navigation button {
              color: white !important;
              min-width: 44px;
              background: none;
              font-size: 1.2rem;
            }
            .react-calendar__month-view__weekdays {
              color: var(--accent) !important;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 0.7rem;
            }
          `}</style>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)' }}></div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Select Payment Method</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              onClick={() => setPaymentMethod('online')}
              style={{
                flex: 1, padding: '20px', borderRadius: '12px', border: '1px solid',
                borderColor: paymentMethod === 'online' ? 'var(--accent)' : 'var(--glass-border)',
                background: paymentMethod === 'online' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                cursor: 'pointer', textAlign: 'center', transition: 'var(--transition)'
              }}
            >
              <p style={{ fontSize: '1.5rem' }}>💳</p>
              <p style={{ fontWeight: '600' }}>Online Payment</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stripe/PayPal</p>
            </div>
            <div
              onClick={() => setPaymentMethod('manual')}
              style={{
                flex: 1, padding: '20px', borderRadius: '12px', border: '1px solid',
                borderColor: paymentMethod === 'manual' ? 'var(--accent)' : 'var(--glass-border)',
                background: paymentMethod === 'manual' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                cursor: 'pointer', textAlign: 'center', transition: 'var(--transition)'
              }}
            >
              <p style={{ fontSize: '1.5rem' }}>🏦</p>
              <p style={{ fontWeight: '600' }}>Bank Transfer</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manual Verification</p>
            </div>
          </div>
        </div>

        {paymentMethod === 'manual' && (
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--glass-border)' }}>
            <p style={{ marginBottom: '12px', fontSize: '0.9rem' }}>Please transfer <strong>{property.priceLabel}</strong> to:</p>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              <p>Bank: HavenStay Federal Bank</p>
              <p>Account: 0123456789</p>
              <p>Name: HavenStay Realty Ltd.</p>
            </div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Upload Receipt</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReceipt(e.target.files[0])}
              style={{ color: 'var(--text-muted)' }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%', padding: '16px', background: 'var(--accent)', color: 'var(--bg-main)',
            borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Processing...' : `Confirm & Pay $${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </button>
      </form>

      {/* Right: Summary */}
      <div style={{ height: 'fit-content' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <img src={property.image} alt={property.title} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
            <div>
              <h4 style={{ marginBottom: '4px' }}>{property.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{property.location}</p>
            </div>
          </div>
          <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)', marginBottom: '24px' }}></div>
          <h3 style={{ marginBottom: '16px' }}>Price Details</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-muted)' }}>
            <span>{nights} Nights Stay</span>
            <span>${stayCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-muted)' }}>
            <span>Service Fee</span>
            <span>$20.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', marginTop: '16px', borderTop: '1px solid var(--glass-border)', fontWeight: '700', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span style={{ color: 'var(--accent)' }}>${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {showSimulatedOverlay && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(10px)' }}>
          <div className="glass-card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', padding: '50px' }}>
            {paymentStep === 1 ? (
              <>
                <div className="spinner" style={{ width: '60px', height: '60px', border: '4px solid var(--glass-border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto 30px', animation: 'spin 1s linear infinite' }}></div>
                <h2 style={{ marginBottom: '10px' }}>Securing Transaction</h2>
                <p style={{ color: 'var(--text-muted)' }}>Communicating with your bank...</p>
              </>
            ) : (
              <>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
                <h2 style={{ marginBottom: '10px' }}>Payment Approved</h2>
                <p style={{ color: 'var(--text-muted)' }}>Redirecting you back to HavenStay</p>
              </>
            )}

            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes spin { to { transform: rotate(360deg); } }
            ` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
