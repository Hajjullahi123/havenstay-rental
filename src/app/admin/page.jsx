import React from 'react';
import prisma from '../../lib/prisma';
import AdminDashboardClient from '../../components/AdminDashboardClient';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Control Center | HavenStay',
};

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const [properties, bookings, statsData] = await Promise.all([
    prisma.property.findMany({ orderBy: { id: 'desc' } }),
    prisma.booking.findMany({
      include: {
        property: true,
        user: true,
        payment: true
      },
      orderBy: { id: 'desc' }
    }),
    prisma.$transaction([
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'VERIFIED' } }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.property.count({ where: { status: 'AVAILABLE' } }),
      prisma.payment.count({ where: { status: 'PENDING' } })
    ])
  ]);

  const stats = [
    { label: 'Total Revenue', value: `$${(statsData[0]._sum.amount || 0).toLocaleString()}`, icon: '💰' },
    { label: 'Active Bookings', value: bookings.length.toString(), icon: '📅' },
    { label: 'Available Houses', value: statsData[2].toString(), icon: '🏠' },
    { label: 'Pending Payments', value: statsData[3].toString(), icon: '⏳' },
  ];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Agency <span style={{ color: 'var(--accent)' }}>Control Center</span></h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</p>
            <h2 style={{ fontSize: '1.8rem' }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <AdminDashboardClient initialProperties={properties} initialBookings={bookings} />
    </div>
  );
};

export default AdminDashboard;
