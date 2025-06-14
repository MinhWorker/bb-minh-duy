// scripts/seed.ts
// import { config } from 'dotenv';
// config({ path: '.env' }); // Load environment variables
import { categories, products, certifications, productsToCertifications, users } from '../db/schema'; // Adjust path
import { v4 as uuidv4 } from 'uuid'; // For manually generating UUIDs if needed for relationships
import db from '../db/drizzle';
import bcrypt from 'bcryptjs';


async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // --- 1. Clear existing data (Optional, for development) ---
    // Use cascade to ensure related join table entries are also deleted
    console.log('🗑️ Clearing existing data...');
    await db.delete(productsToCertifications); // Clear join table first
    await db.delete(products);
    await db.delete(categories);
    await db.delete(certifications);
    await db.delete(users); // Clear users if needed
    console.log('✅ Existing data cleared.');

    // --- 2. Insert Admin User ---
    console.log('Inserting admin user...');
    const adminPassword = 'bbmd123456';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const adminUser = {
      id: uuidv4(),
      username: 'adminmd',
      password: hashedPassword,
    };
    await db.insert(users).values(adminUser);

    console.log('✅ Admin user inserted.');
    // --- 3. Insert Categories ---
    console.log('Inserting categories...');
    const newCategories = [
      { id: uuidv4(), name: 'Electronics' },
      { id: uuidv4(), name: 'Books' },
      { id: uuidv4(), name: 'Clothing' },
      { id: uuidv4(), name: 'Home Goods' },
    ];
    await db.insert(categories).values(newCategories);
    console.log('✅ Categories inserted.');

    // --- 4. Insert Certifications ---
    console.log('Inserting certifications...');
    const newCertifications = [
      { id: uuidv4(), name: 'CE Certified', image: 'https://png.pngtree.com/png-clipart/20231206/original/pngtree-demo-red-flat-icon-isolated-demo-icon-photo-png-image_13786501.png' },
      { id: uuidv4(), name: 'ISO 9001', image: 'https://png.pngtree.com/png-clipart/20231206/original/pngtree-demo-red-flat-icon-isolated-demo-icon-photo-png-image_13786501.png' },
      { id: uuidv4(), name: 'Organic', image: 'https://png.pngtree.com/png-clipart/20231206/original/pngtree-demo-red-flat-icon-isolated-demo-icon-photo-png-image_13786501.png' },
      { id: uuidv4(), name: 'Fair Trade', image: 'https://png.pngtree.com/png-clipart/20231206/original/pngtree-demo-red-flat-icon-isolated-demo-icon-photo-png-image_13786501.png' },
    ];
    await db.insert(certifications).values(newCertifications);
    console.log('✅ Certifications inserted.');

    // --- 5. Insert Products ---
    console.log('Inserting products...');
    const electronicsCategoryId = newCategories.find(c => c.name === 'Electronics')?.id;
    const booksCategoryId = newCategories.find(c => c.name === 'Books')?.id;
    const clothingCategoryId = newCategories.find(c => c.name === 'Clothing')?.id;

    if (!electronicsCategoryId || !booksCategoryId || !clothingCategoryId) {
      throw new Error('Category IDs not found after insertion!');
    }

    const newProducts = [
      {
        id: uuidv4(),
        name: 'Smartphone X',
        price: "15000000.00", // VND 15,000,000
        image: 'https://example.com/smartphone.png',
        description: 'Latest model smartphone with advanced features.',
        categoryId: electronicsCategoryId,
      },
      {
        id: uuidv4(),
        name: 'The Great Novel',
        price: "250000.00", // VND 250,000
        image: 'https://example.com/novel.png',
        description: 'An epic story of adventure and discovery.',
        categoryId: booksCategoryId,
      },
      {
        id: uuidv4(),
        name: 'Cotton T-Shirt',
        price: "120000.00", // VND 120,000
        image: 'https://example.com/tshirt.png',
        description: '100% organic cotton t-shirt, comfortable and stylish.',
        categoryId: clothingCategoryId,
      },
      {
        id: uuidv4(),
        name: 'Smart TV 55"',
        price: "10000000.00", // VND 10,000,000
        image: 'https://example.com/smarttv.png',
        description: 'Ultra HD Smart TV for immersive viewing.',
        categoryId: electronicsCategoryId,
      },
    ];
    await db.insert(products).values(newProducts);
    console.log('✅ Products inserted.');

    // --- 6. Insert ProductsToCertifications (Join Table) ---
    console.log('Linking products to certifications...');
    const smartphoneXId = newProducts.find(p => p.name === 'Smartphone X')?.id;
    const tShirtId = newProducts.find(p => p.name === 'Cotton T-Shirt')?.id;
    const smartTvId = newProducts.find(p => p.name === 'Smart TV 55"')?.id;

    const ceCertId = newCertifications.find(c => c.name === 'CE Certified')?.id;
    const isoCertId = newCertifications.find(c => c.name === 'ISO 9001')?.id;
    const organicCertId = newCertifications.find(c => c.name === 'Organic')?.id;
    const fairTradeCertId = newCertifications.find(c => c.name === 'Fair Trade')?.id;


    if (!smartphoneXId || !tShirtId || !smartTvId || !ceCertId || !isoCertId || !organicCertId || !fairTradeCertId) {
      throw new Error('Product or Certification IDs not found for linking!');
    }

    const newProductsToCertifications = [
      // Smartphone X has CE and ISO 9001 certifications
      { productId: smartphoneXId, certificationId: ceCertId },
      { productId: smartphoneXId, certificationId: isoCertId },
      // Cotton T-Shirt has Organic and Fair Trade certifications
      { productId: tShirtId, certificationId: organicCertId },
      { productId: tShirtId, certificationId: fairTradeCertId },
      // Smart TV has CE certification
      { productId: smartTvId, certificationId: ceCertId },
    ];
    await db.insert(productsToCertifications).values(newProductsToCertifications);
    console.log('✅ Products linked to certifications.');


    console.log('🎉 Seeding complete!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1); // Exit with an error code
  } finally {
    process.exit(0); // Exit successfully
  }
}

seed();
