import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';
import TenantDashboardClient from '@/components/TenantDashboardClient';

export const metadata = {
  title: 'My Dashboard | HavenStay',
};

const TenantDashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const [bookings, favorites] = await Promise.all([
    prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        property: true,
        payment: true
      },
      orderBy: { id: 'desc' }
    }),
    prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        property: true
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const parsedBookings = bookings.map(b => ({
    ...b,
    property: {
      ...b.property,
      amenities: typeof b.property.amenities === 'string' ? JSON.parse(b.property.amenities) : b.property.amenities
    }
  }));

  const parsedFavorites = favorites.map(f => ({
    ...f,
    property: {
      ...f.property,
      amenities: typeof f.property.amenities === 'string' ? JSON.parse(f.property.amenities) : f.property.amenities
    }
  }));

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, <span style={{ color: 'var(--accent)' }}>{session.user.name || 'Resident'}</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your bookings and saved properties</p>
          </div>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--bg-main)' }}>
            {(session.user.name || 'R')[0].toUpperCase()}
          </div>
        </div>

        <TenantDashboardClient bookings={parsedBookings} favorites={parsedFavorites} />
      </div>
    </div>
  );
};

export default TenantDashboard;
