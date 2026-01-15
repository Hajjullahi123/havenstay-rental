import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates on re-seed
  await prisma.favorite.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.property.deleteMany();

  const properties = [
    {
      title: 'The Golden Penthouse',
      description: 'A masterpiece of modern architecture. This 42nd-floor penthouse offers 360-degree views of the Atlantic Ocean and Lagos skyline. Featuring smart home automation and a private infinity pool.',
      price: 8500,
      priceLabel: '$8,500/mo',
      location: 'Eko Atlantic, Lagos',
      address: 'Plot 1, Azuri Towers, Eko Atlantic City, Lagos',
      lat: 6.4253,
      lng: 3.4095,
      type: 'Apartment',
      beds: 4,
      baths: 4.5,
      area: '4,200 sqft',
      amenities: ['High-speed WiFi', '24/7 Security', 'Swimming Pool', 'Gym', 'Backup Generator', 'Air Conditioning'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      status: 'AVAILABLE',
      featured: true
    },
    {
      title: 'Seaside Zen Villa',
      description: 'Find your peace in this minimalist villa designed by award-winning architects. Floor-to-ceiling glass walls merge the indoor luxury with the serene outdoor beachfront.',
      price: 5200,
      priceLabel: '$5,200/mo',
      location: 'Lekki Phase 1, Lagos',
      address: '15 Ocean View Estate, Lekki, Lagos',
      lat: 6.4411,
      lng: 3.4833,
      type: 'Villa',
      beds: 5,
      baths: 4,
      area: '3,800 sqft',
      amenities: ['Swimming Pool', 'Parking', '24/7 Security', 'Air Conditioning', 'Water Heater'],
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      status: 'AVAILABLE',
      featured: true
    },
    {
      title: 'Smart Tech Hub Office',
      description: 'Boost your startup productivity in this high-tech office space. Equipped with fiber-optic internet, ergonomic furniture, and collaborative "glass boxes" for meetings.',
      price: 3200,
      priceLabel: '$3,200/mo',
      location: 'Victoria Island, Lagos',
      address: '88 Innovation Way, Victoria Island, Lagos',
      lat: 6.4312,
      lng: 3.4245,
      type: 'Office',
      beds: 0,
      baths: 2,
      area: '2,500 sqft',
      amenities: ['High-speed WiFi', 'Backup Generator', 'Parking', '24/7 Security', 'Air Conditioning'],
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      status: 'AVAILABLE',
      featured: false
    },
    {
      title: 'Cozy Urban Studio',
      description: 'Perfect for the digital nomad. This compact yet highly functional studio features foldable furniture and a vibrant community workspace on the rooftop.',
      price: 1200,
      priceLabel: '$1,200/mo',
      location: 'Ikeja Gra, Lagos',
      address: '22 Sobo Arobiodu St, Ikeja GRA, Lagos',
      lat: 6.5912,
      lng: 3.3561,
      type: 'Apartment',
      beds: 1,
      baths: 1,
      area: '650 sqft',
      amenities: ['High-speed WiFi', '24/7 Security', 'Parking', 'Air Conditioning'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      status: 'AVAILABLE',
      featured: false
    }
  ];

  for (const property of properties) {
    await prisma.property.create({
      data: {
        ...property,
        amenities: JSON.stringify(property.amenities)
      }
    });
  }

  console.log('Database seeded successfully with 4 premium properties.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
