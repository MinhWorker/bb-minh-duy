// scripts/seed.ts
// import { config } from 'dotenv';
// config({ path: '.env' }); // Load environment variables (ensure this is uncommented if running outside Next.js context)

import { categories, products, certifications, productsToCertifications, users } from '../db/schema'; // Adjust path based on your project structure
import { v4 as uuidv4 } from 'uuid'; // For manually generating UUIDs if needed for relationships
import bcrypt from 'bcryptjs';
import db from '../db/drizzle';

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

    // --- 3. Insert Categories (up to 10) ---
    console.log('Inserting categories...');
    const categoryNames = [
      'Electronics', 'Books', 'Clothing', 'Home Goods', 'Sports & Outdoors',
      'Health & Beauty', 'Toys & Games', 'Automotive', 'Pet Supplies', 'Office Products'
    ];
    const newCategories = categoryNames.map(name => ({ id: uuidv4(), name }));
    await db.insert(categories).values(newCategories);
    console.log(`✅ ${newCategories.length} Categories inserted.`);

    // --- 4. Insert Certifications (up to 10) ---
    console.log('Inserting certifications...');
    const certificationNames = [
      'CE Certified', 'ISO 9001', 'Organic', 'Fair Trade', 'Energy Star',
      'RoHS Compliant', 'USDA Organic', 'Gluten-Free', 'Vegan Certified', 'Cruelty-Free'
    ];
    const placeholderImageUrl = 'https://png.pngtree.com/png-clipart/20231206/original/pngtree-demo-red-flat-icon-isolated-demo-icon-photo-png-image_13786501.png';
    const cloudinaryImageUrl = 'https://res.cloudinary.com/dx7p1lalk/image/upload/v1750931161/bb_minh_duy/certificates/bb_avu8lh.png';
    const newCertifications = certificationNames.map(name => ({
      id: uuidv4(),
      name: name,
      image: placeholderImageUrl // Using the same placeholder image
    }));
    await db.insert(certifications).values(newCertifications);
    console.log(`✅ ${newCertifications.length} Certifications inserted.`);

    // --- 5. Insert Products (up to 10-15, distributed across categories) ---
    console.log('Inserting products...');

    // Helper to find category ID by name
    const getCategoryId = (name: string) => newCategories.find(c => c.name === name)?.id;

    const productsData = [
      {
        name: 'Smartphone X', price: "15000000.00", categoryName: 'Electronics',
        description: 'Latest model smartphone with advanced features and stunning display.'
      },
      {
        name: 'The Great Novel with an extremely long name, I dont know will this fit or not but oh well', price: "250000.00", categoryName: 'Books',
        description: 'An epic story of adventure and discovery, a must-read classic.'
      },
      {
        name: 'Cotton T-Shirt', price: "120000.00", categoryName: 'Clothing',
        description: '100% organic cotton t-shirt, comfortable and stylish for everyday wear.'
      },
      {
        name: 'Smart TV 55"', price: "10000000.00", categoryName: 'Electronics',
        description: 'Ultra HD Smart TV for immersive viewing with built-in streaming apps.'
      },
      {
        name: 'Coding Handbook', price: "350000.00", categoryName: 'Books',
        description: 'Comprehensive guide for aspiring and experienced programmers.'
      },
      {
        name: 'Running Shoes Pro', price: "1800000.00", categoryName: 'Sports & Outdoors',
        description: 'Lightweight and durable running shoes for peak performance.'
      },
      {
        name: 'Organic Face Cream', price: "450000.00", categoryName: 'Health & Beauty',
        description: 'Nourishing face cream made with all-natural organic ingredients.'
      },
      {
        name: 'Building Blocks Set', price: "750000.00", categoryName: 'Toys & Games',
        description: 'Creative building blocks for endless hours of fun and imagination.'
      },
      {
        name: 'Car Phone Mount', price: "180000.00", categoryName: 'Automotive',
        description: 'Universal car phone mount with strong grip and flexible viewing angles.'
      },
      {
        name: 'Pet Food Dispenser', price: "600000.00", categoryName: 'Pet Supplies',
        description: 'Automatic pet food dispenser with programmable feeding times.'
      },
      {
        name: 'Ergonomic Office Chair', price: "3000000.00", categoryName: 'Office Products',
        description: 'High-back ergonomic office chair for ultimate comfort and support.'
      },
      {
        name: 'Wireless Mouse', price: "300000.00", categoryName: 'Electronics',
        description: 'Precision wireless mouse for enhanced productivity.'
      },
      {
        name: 'Yoga Mat Eco', price: "500000.00", categoryName: 'Sports & Outdoors',
        description: 'Eco-friendly yoga mat with superior grip and cushioning.'
      },
      {
        name: 'Herbal Shampoo', price: "150000.00", categoryName: 'Health & Beauty',
        description: 'Natural herbal shampoo for healthy and shiny hair.'
      },
      {
        name: 'Board Game Classic', price: "400000.00", categoryName: 'Toys & Games',
        description: 'A timeless board game for family and friends.'
      },
    ];

    const newProducts = productsData.map(p => ({
      id: uuidv4(),
      name: p.name,
      price: p.price,
      image: cloudinaryImageUrl,
      description: p.description,
      categoryId: getCategoryId(p.categoryName)!, // Asserting non-null as we've checked categories
    }));
    await db.insert(products).values(newProducts);
    console.log(`✅ ${newProducts.length} Products inserted.`);

    // --- 6. Insert ProductsToCertifications (Join Table) ---
    console.log('Linking products to certifications...');

    // Helper to find certification ID by name
    const getCertId = (name: string) => newCertifications.find(c => c.name === name)?.id;
    // Helper to find product ID by name
    const getProductId = (name: string) => newProducts.find(p => p.name === name)?.id;

    const productsToCertificationsData = [
      // Electronics
      { productName: 'Smartphone X', certNames: ['CE Certified', 'RoHS Compliant'] },
      { productName: 'Smart TV 55"', certNames: ['CE Certified', 'Energy Star'] },
      { productName: 'Wireless Headphones', certNames: ['CE Certified'] },
      { productName: 'Laptop Pro', certNames: ['CE Certified', 'Energy Star'] },
      // Books
      { productName: 'The Great Novel', certNames: [] }, // Books might not have product certs
      { productName: 'Coding Handbook', certNames: [] },
      // Clothing
      { productName: 'Cotton T-Shirt', certNames: ['Organic', 'Fair Trade', 'Vegan Certified'] },
      { productName: 'Denim Jeans', certNames: ['Fair Trade'] },
      // Home Goods
      { productName: 'Smart Coffee Maker', certNames: ['CE Certified', 'Energy Star'] },
      { productName: 'Ergonomic Office Chair', certNames: ['ISO 9001'] },
      // Sports & Outdoors
      { productName: 'Running Shoes Pro', certNames: ['ISO 9001'] },
      { productName: 'Yoga Mat Eco', certNames: ['Organic', 'Vegan Certified'] },
      // Health & Beauty
      { productName: 'Organic Face Cream', certNames: ['Organic', 'Cruelty-Free'] },
      { productName: 'Herbal Shampoo', certNames: ['Organic', 'Cruelty-Free'] },
      // Toys & Games
      { productName: 'Building Blocks Set', certNames: ['CE Certified'] },
      { productName: 'Board Game Classic', certNames: [] },
      // Automotive
      { productName: 'Car Phone Mount', certNames: ['CE Certified'] },
      // Pet Supplies
      { productName: 'Pet Food Dispenser', certNames: ['CE Certified'] },
      // Office Products
      // Ergonomic Office Chair already linked
      { productName: 'Wireless Mouse', certNames: ['CE Certified'] },
    ];

    const newProductsToCertifications: { productId: string; certificationId: string }[] = [];
    for (const link of productsToCertificationsData) {
      const productId = getProductId(link.productName);
      if (!productId) {
        console.warn(`Product ID not found for "${link.productName}". Skipping linking.`);
        continue;
      }
      for (const certName of link.certNames) {
        const certificationId = getCertId(certName);
        if (certificationId) {
          newProductsToCertifications.push({ productId, certificationId });
        } else {
          console.warn(`Certification ID not found for "${certName}". Skipping linking for product "${link.productName}".`);
        }
      }
    }

    if (newProductsToCertifications.length > 0) {
      await db.insert(productsToCertifications).values(newProductsToCertifications);
      console.log(`✅ ${newProductsToCertifications.length} Product-Certification links inserted.`);
    } else {
      console.log('⚠️ No product-certification links to insert.');
    }

    console.log('🎉 Seeding complete!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1); // Exit with an error code
  } finally {
    process.exit(0); // Exit successfully
  }
}

seed();

