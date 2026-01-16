/*
  # Seed Sample Data for SuaraShop

  ## Purpose
  Populate the database with sample categories and products for testing and demonstration.

  ## Data Included
  - 4 main categories (Groceries, Health, Home, Medicine)
  - 20+ sample products with realistic Malaysian pricing
*/

-- Insert categories
INSERT INTO categories (id, name_en, name_ms, description_en, description_ms, icon, image_url, sort_order)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Groceries', 'Barang Dapur', 'Daily groceries and food items', 'Barang dapur dan makanan harian', 'shopping_basket', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVyZ3udiVaOI1_whb4vi69Mo59bhcZauNqvUuxYRFF4wMdu10oZjYGGpig6Ua5ni0AvbBWhCqveKuJ9cdrpmky62okqn-b2JJmG8rEplRZvdww2iyj3koGg0k9QCn5g5D8RUik5brhlIuhomgMumot6lBJCxQvq41muHMcxZXGnjZvX3idHdX7XvrCRxt633ytpvY3GenUCVN0klFO6wPzR5UgFFjLFLyZRUzwt_v_HHuse7Klog2sTIPZZrzHUNOwoGKmfAPVPQ', 1),
  ('22222222-2222-2222-2222-222222222222', 'Health', 'Kesihatan', 'Health supplements and vitamins', 'Suplemen kesihatan dan vitamin', 'favorite', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKBO9XcA7wfx2yYHnrDeLgySmu28cNglqoADVZm2aMb_F7Zvi5P0538J6wkXINpJIXTA14Mf7WAdlPcufvuoDYOcgtv_5jUcLmY1Ld0Y71w9-IoeP1uSPFHn8rAx62QzJgbZRQUsS9fGQ19d5SyHb4xtx98mmhpzIL9ynjliSpnolgZXG547OGxXyba3m8uKNgyIfX1MvHc4RqJ5Dqk7hu46TK4B5Sm5_jhDQpoLqv1ozLHpdRxJohe50GoNtpWNVoFNnJyAzixQ', 2),
  ('33333333-3333-3333-3333-333333333333', 'Home', 'Rumah', 'Home essentials and cleaning products', 'Keperluan rumah dan produk pembersihan', 'home', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnKOU9PebTI5xUomP7ogrEFQ9TnMbZMqh6B62ikJu1DB4y-FWQbGZrEXriGDZauOWgzADj9DRXlFijgfnh94YSyJ_nyqPYMStrsiWG2HuBWbUG0Op_MdOx9ql29qbiRSbkbqsHIaspjqAbvnrgm3QjMeUn8RoZ0d1XOuVDEhJawhpjXlptyLXEicegXfcAYse10LvWHT-hPHeQPITdInnYpjL5Pwa0YsOlPysvhqic3yr-_Gk3nQl6OQ4gE-OcYxKSE3XIJ8cr1g', 3),
  ('44444444-4444-4444-4444-444444444444', 'Medicine', 'Ubat-ubatan', 'Over-the-counter medicines', 'Ubat-ubatan tanpa preskripsi', 'medication', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAtb4Jl5e5DhSg3HmLhy95UfjNo5aK0S5cKGXDZBev45Z6UXk_sIPOKrEok3_t9D9NZgZsWVMqavnDpXz2bG3c_-1cnQQEQHhqNvOx6BR_7Em_d7qAE8kjOxllOfzdVYwJPp9wvkekZpKeviE3x-1MrIppOf6Tuvx0cNHiv3B90NgByH3B5jSRXOVM-OHxfMXK0sO3QOOKtoPaGlwNs1ObuaLTugUEhawwOeEMlHZQfsEcqQSMRR69NutxsBeCt6TVS1nSgrb3Mw', 4)
ON CONFLICT (id) DO NOTHING;

-- Insert groceries
INSERT INTO products (category_id, name_en, name_ms, description_en, description_ms, price, discount_price, brand, stock_quantity, images, rating, review_count)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Fragrant Rice 10kg', 'Beras Wangi 10kg', 'Premium fragrant rice perfect for daily meals', 'Beras wangi premium untuk hidangan harian', 45.00, 38.00, 'Cap Rambutan', 50, ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuACweRPWRMrvqmY4mzG9BeriF0FEyNTT6o_LOccgc9FOVl6nxEQ4Rz98gaRjeNRn58QQteAUOTwgTA1oEROsnio11VtPLOO9Wsl8pvDlcuxO3B4gac4TBWhCMqX6dzhW3D-tWkHAtXob9kdRYO0a8cd-snXfA2ExdP0RufZ0P0_0MuDhFnG6w_wfhLbpJoiQlQayxvOJz24JCCFhAzU_fWkLvb2hIBV6pJ5gMm_8LeLkuxYgh0HDav0KPPWgMUa8maKEoabTM5qWw'], 4.8, 125),
  ('11111111-1111-1111-1111-111111111111', 'Cooking Oil 5kg', 'Minyak Masak Saji 5kg', 'Pure cooking oil in large bottle', 'Minyak masak tulen dalam botol besar', 35.00, 29.50, 'Saji', 40, ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuDoKNTJpMmGUaesQBX-fKlpnXwlifJ0KJxlrWZYoDL7Mp5RTZnFLaeC2UqS5DSo6FQFmRvKbqaax9MkIE5Z_4v523Wqyf3lyTpmFo1r5FA6aJg0ZY67M_wtYZlk3ZK8WnNe-jXQ6QywN4_tHTZeHHXcwIQqZ2J95Mz8ybTlqI6MU5XhL58-8h6ekJC9Qysx1OJXOzEq6FFvZRih0MonNdMbVBjo0tsD4nvJumvoCdqlUyHDbjUD4ZJNRo8qQAqMOluWCGnXl3uDkA'], 4.6, 89),
  ('11111111-1111-1111-1111-111111111111', 'White Sugar 2kg', 'Gula Putih 2kg', 'Fine white sugar for cooking and beverages', 'Gula putih halus untuk memasak dan minuman', 8.50, NULL, 'Gula Prai', 100, ARRAY['https://images.unsplash.com/photo-1571935780-65db82f06bc4?w=400'], 4.7, 54),
  ('11111111-1111-1111-1111-111111111111', 'Fresh Eggs 30pcs', 'Telur Segar 30 biji', 'Grade A fresh eggs', 'Telur segar gred A', 15.90, 14.90, 'Lecker', 80, ARRAY['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'], 4.9, 210),
  ('11111111-1111-1111-1111-111111111111', 'Instant Noodles 5pack', 'Mee Segera 5 pek', 'Popular instant noodles curry flavor', 'Mee segera popular perisa kari', 5.50, NULL, 'Maggi', 150, ARRAY['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400'], 4.5, 180),
  ('11111111-1111-1111-1111-111111111111', 'Flour 1kg', 'Tepung Gandum 1kg', 'Multi-purpose wheat flour', 'Tepung gandum serba guna', 6.00, NULL, 'Prima', 60, ARRAY['https://images.unsplash.com/photo-1628202926206-c63a34b1618f?w=400'], 4.4, 45)
ON CONFLICT DO NOTHING;

-- Insert health products
INSERT INTO products (category_id, name_en, name_ms, description_en, description_ms, price, discount_price, brand, stock_quantity, images, rating, review_count)
VALUES
  ('22222222-2222-2222-2222-222222222222', 'Vitamin C 1000mg', 'Vitamin C 1000mg', 'High strength vitamin C for immunity. 60 tablets', 'Vitamin C kekuatan tinggi untuk imuniti. 60 biji', 55.00, 45.90, 'Blackmores', 30, ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuAlpeZHJ3e_S18EaF5JzVSHEcMf97tUG3g2lMd3ic77pLTWxV5h6ov4lOmTeBOLwkAAe0EqTSHU9X4t8tGKeX0QPnVb74dAx1i9_Z05SrLw4kXf4-jdUSYIkWi-nbGBMqYml4g38wZwNqaWlk1yUd0g-8V1kpeMHn9oLp_q6_6qmiM52mXcrWt8vUdu-AjFX54wEqyIZaaLQVF6hlmyGckeMHxLYkmFrHhVQ2h7kMi4amfAPnsUYjsvQ7-ckIHfrLhS8ezJ3lRhAw'], 4.8, 150),
  ('22222222-2222-2222-2222-222222222222', 'Omega-3 Fish Oil', 'Minyak Ikan Omega-3', 'Supports heart health and brain function. Easy to swallow softgels', 'Menyokong kesihatan jantung dan fungsi otak', 60.00, 45.00, 'Nordic Naturals', 25, ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuDdiAIx1odU5pN-599_bnVi2RN-cLgo4e23YF-ska8Q3D_hwhXo6yk_uWsadonQJXVHYS1AdriJwGEJ6Uiw1bAyPg5Sn3yGWQDe-iA_y9wnx7MKwE5nD2G_EQS34Ib4o7_NJUsk_WeV_yyb5El3MA0E33-tN3QoH-oAMEAiOaZCTsJCXOB3R7vOA-0rL6COmPk1DB2x7rwHNWgYVeFb2N6d3tWa6I4DniLnII72774hQQT71Mj1afKdBuNilm6ndqOnlZBEOaegnA'], 4.9, 230),
  ('22222222-2222-2222-2222-222222222222', 'Calcium Tablets', 'Tablet Kalsium', 'Strong bones and teeth. With Vitamin D3 for absorption', 'Tulang dan gigi kuat. Dengan Vitamin D3', 38.00, 32.50, 'Caltrate', 35, ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuBhsjq4-qchyzvuEaE7_WhxOPuhc7BjsM_fmTTDoBHPf5A0T1A1T1haedl4xRjWlfF3l6-fg0j3yyWeiR4OcCL3gCy9_0S-UmaKX3g3oOhsWd6oNvdk2FyusPficXKxHM3xMDQ-JzbNWH22wf8Zy9k6eoZDS37ebZeO0vTz0_CnHz0ar9ZTRSDzkLeMH24uONhh4H_mXI8_-JzZ1yri3eYnvX91Qbxbtot5DpJNBiarwqm6-MZGtk2FoF-8liACKeCVWyw9Tv0gWw'], 4.5, 85),
  ('22222222-2222-2222-2222-222222222222', 'Daily Multivitamin', 'Multivitamin Harian', 'Complete daily nutrition for seniors 50+. Includes Zinc and Iron', 'Nutrisi harian lengkap untuk warga emas 50+', 55.00, 48.00, 'Centrum', 40, ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuBsCf3h2P9xW6nIyl1Cov8j8FgBYaOx9suB4zKxZyqMNcAXWP1FWtMzaqTnNVNuTKh1wW10XsdqWDuqIj7xojp4UvkVtVkmwAyB_0xjHyb_9OmpE93iaRM15RESjT1sUKvw1ZTr5cq_sRPmdflRao2TQ4xO283FpAJTIhF0OGx_Ck2QIucZZ59CMTY81MI2iOU623mua7PL_6PeGEYJgHXt_SoG3iXIWmzpS5lj_SI_OzRmXXd3ODg1-P8BU-ElkQ2Yc8w0KDca9g'], 4.9, 230),
  ('22222222-2222-2222-2222-222222222222', 'Glucosamine 1500mg', 'Glucosamine 1500mg', 'Joint health support. Helps maintain cartilage health', 'Sokongan kesihatan sendi. Bantu kekalkan kesihatan rawan', 85.00, 75.00, 'Osteo Bi-Flex', 20, ARRAY['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'], 4.7, 95),
  ('22222222-2222-2222-2222-222222222222', 'Collagen Peptides', 'Peptida Kolagen', 'For healthy skin, hair, and nails. Easy to mix powder', 'Untuk kulit, rambut dan kuku sihat', 120.00, 99.00, 'Vital Proteins', 15, ARRAY['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400'], 4.6, 78)
ON CONFLICT DO NOTHING;

-- Insert home products
INSERT INTO products (category_id, name_en, name_ms, description_en, description_ms, price, discount_price, brand, stock_quantity, images, rating, review_count)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'Laundry Detergent 2kg', 'Serbuk Dobi 2kg', 'Powerful cleaning for all fabrics', 'Pembersihan kuat untuk semua fabrik', 18.90, 16.90, 'Breeze', 45, ARRAY['https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400'], 4.6, 120),
  ('33333333-3333-3333-3333-333333333333', 'Dishwashing Liquid 1L', 'Cecair Cuci Pinggan 1L', 'Cuts grease effectively. Lemon scent', 'Menghilangkan lemak dengan berkesan', 8.50, NULL, 'Sunlight', 60, ARRAY['https://images.unsplash.com/photo-1563431742-7cbd6492bb78?w=400'], 4.5, 85),
  ('33333333-3333-3333-3333-333333333333', 'Floor Cleaner 2L', 'Pembersih Lantai 2L', 'Leaves floors clean and fresh', 'Biarkan lantai bersih dan segar', 12.00, 10.50, 'Mr Muscle', 35, ARRAY['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400'], 4.4, 67),
  ('33333333-3333-3333-3333-333333333333', 'Toilet Paper 12 rolls', 'Tisu Tandas 12 gulung', 'Soft and strong 3-ply toilet tissue', 'Tisu tandas lembut dan kuat 3 lapis', 15.90, NULL, 'Kleenex', 70, ARRAY['https://images.unsplash.com/photo-1584736286279-4c0b2b4c0f5e?w=400'], 4.7, 145),
  ('33333333-3333-3333-3333-333333333333', 'Garbage Bags Large 20pcs', 'Beg Sampah Besar 20 keping', 'Extra strong garbage bags', 'Beg sampah ekstra kuat', 9.90, NULL, 'Glad', 55, ARRAY['https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400'], 4.3, 92)
ON CONFLICT DO NOTHING;

-- Insert medicine products
INSERT INTO products (category_id, name_en, name_ms, description_en, description_ms, price, discount_price, brand, stock_quantity, images, rating, review_count)
VALUES
  ('44444444-4444-4444-4444-444444444444', 'Paracetamol 500mg 20 tablets', 'Paracetamol 500mg 20 tablet', 'For fever and pain relief', 'Untuk demam dan melegakan kesakitan', 5.50, NULL, 'Panadol', 100, ARRAY['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'], 4.8, 340),
  ('44444444-4444-4444-4444-444444444444', 'Cough Syrup 100ml', 'Ubat Batuk 100ml', 'Relieves cough and soothes throat', 'Melegakan batuk dan menenangkan tekak', 12.90, NULL, 'Woods', 50, ARRAY['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'], 4.5, 125),
  ('44444444-4444-4444-4444-444444444444', 'Antacid Tablets 50pcs', 'Tablet Antasid 50 biji', 'Fast relief from heartburn and indigestion', 'Melegakan cepat pedih ulu hati', 18.00, 15.90, 'Gaviscon', 40, ARRAY['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'], 4.6, 88),
  ('44444444-4444-4444-4444-444444444444', 'Pain Relief Gel 50g', 'Gel Penahan Sakit 50g', 'Topical pain relief for muscles and joints', 'Melegakan kesakitan otot dan sendi', 22.00, 19.90, 'Yoko-Yoko', 30, ARRAY['https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400'], 4.7, 156),
  ('44444444-4444-4444-4444-444444444444', 'Throat Lozenges 24pcs', 'Gula-gula Tekak 24 biji', 'Soothes sore throat. Honey lemon flavor', 'Menenangkan sakit tekak. Perisa madu lemon', 8.90, NULL, 'Strepsils', 80, ARRAY['https://images.unsplash.com/photo-1550572017-4a96a97c9c0f?w=400'], 4.4, 92)
ON CONFLICT DO NOTHING;
