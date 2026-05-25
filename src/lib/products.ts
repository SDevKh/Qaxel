import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export interface Product {
  id: string | number;
  image: string;
  mainImage?: string;
  galleryImages?: string[];
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string;
  colors?: string[];
  size?: string[];
  reviewIds?: string[];
  slug: string;
}

export const STATIC_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'pakistani-add-product',
    image: '/img/pakistani (1).jpeg',
    galleryImages: [
      '/img/pakistani (1).jpeg',
      '/img/pakistani (3).jpeg',
      '/img/pakistani (4).jpeg',
      '/img/pakistani (5).jpeg',
      '/img/pakistani (6).jpeg'
    ],
    title: 'Heavy Cotton Pakistani Salwar Kameez Cream Embroidered With Imported Silk Chex Dupatta',
    price: 1949,
    originalPrice: 3099,
    colors: [''],
    size: ['Free Size'],
    description: 'Elegant Pakistani suit with stitched finishing and premium traditional detailing.',
    reviewIds: [],
    details: `Made from high-quality cotton and adorned with delicate embroidery, this cream salwar kameez from Pakistan is the epitome of elegance. The included imported silk chex dupatta adds a touch of luxury to this traditional ensemble.

Dress Type : Semi-Stitched ( Free Size ) , XL-XXL (Full Stitched)
Top Fabric : Heavy Cotton ( With Heavy Work Embroidery + Organza Foot Hill Work )
Bottom : Semi Lawn 
Dupatta : Imported Silk Chex ( With 2 Side Embroidery Work )
Top Length : 46 Inch Max.
Top Bust Size : 62 Inch Max.
Bottom Size : 2.25 MTR
Dupatta Size : 2.15 MTR
Dress Work : Multicolor Embroidery Work + Good Looking Full Dress Work + Organza Foot Hill Work
Wash : Only Dry Clean
`
  },
  {
    id: 2,
    slug: 'Spring-Summer-Muslin-Lawn',
    image: '/img/muslin lawn (2).jpeg',
    galleryImages: [
      '/img/muslin lawn (1).jpeg',
      '/img/muslin lawn (2).jpeg',
      '/img/muslin lawn (3).jpeg',
      '/img/muslin lawn (4).jpeg',
      '/img/muslin lawn (5).jpeg'
    ],
    title: 'Spring Summer Muslin Lawn',
    price: 1229,
    originalPrice: 1999,
    colors: [''],
    size: ['Free Size'],
    description: 'Spring Summer Muslin Lawn.',
    reviewIds: [],
    details: `Fabric:
Capturing the essence of Mughal paisley design, our paste-printed shirt effortlessly complements a color block dupatta and dyed pants, exuding a touch of inspired elegance.

Component Details (3 Piece) 	Measurement
Paste Printed Front On Lawn	1.15 Meters
Paste Printed Back On Lawn	1.15 Meters
Paste Printed Sleeves On Lawn	0.65 Meters
Embroidered Neck On Organza	 
Embroidered Border On Organza	1 Meter
Yarn Dyed Dupata	2.5 Meters
Dyed Cotton Pants	1.75 Meters
Size:
Unstitched Fabric / Unstitched Dress Material
Authenticity Guaranteed – 100% Original
`
  },
  {
    id: 3,
    slug: 'Ombre-starlet-summer-lawn-pakistani-suit',
    image: '/img/summerlawn (1).jpeg',
    galleryImages: [
      '/img/summerlawn (1).jpeg',
      '/img/summerlawn (2).jpeg',
      '/img/summerlawn (3).jpeg',
      '/img/summerlawn (4).jpeg',
    ],  
    title: 'Ombre starlet summer lawn pakistani suit',
    price: 1589,
    originalPrice: 2599,
    colors: [''],
    size: ['Free Size'],
    description: 'Ombre starlet summer lawn pakistani suit',
    reviewIds: [],
    details: `Main Fabric: Lawn

Dupatta Fabric: Chiffon

Summary: Exude elegance in this stunning black Pakistani suit from Jade, beautifully modeled by Dananeer. This festive outfit features an exquisitely detailed kameez crafted from premium summer lawn, making it both breathable and chic for warmer seasons. The shirt is adorned with intricate Chikankari and laser kari embroidery, offering a rich texture and luxurious feel. The deep black hue makes this Pakistani dress a versatile choice for evening events and formal gatherings. As an elegant piece of ethnic wear, it's perfect for making a statement at Eid celebrations or as sophisticated party wear.

Color: Black
Fabric:
3 MTRS EMBROIDERED CHIKANKARI & LASER KARI LAWN SHIRT
2.5 MTRS DIGITAL PRINTED BAMBER CHIFFON DUPATTA
2.5 MTRS DYED COTTTON TROUSER
1 YARD ORGANZA CHIKANKARI EMBROIDERED SLEEVES BORDER
1.7 YARDS ORGANZA CHIKANKARI EMBROIDERED FRONT & BACK DAMAN BORDER
Size:
Unstitched Fabric / Unstitched Dress Material
Authenticity Guaranteed – 100% Original
`
  },
  {
    id: 4,
    slug: 'Sea-blue-ombre-starlet-collection',
    image: '/img/seablue (4).jpeg',
    galleryImages: [
      '/img/seablue (1).jpeg',
      '/img/seablue (2).jpeg',
      '/img/seablue (3).jpeg',
      '/img/seablue (4).jpeg',
      '/img/seablue (5).jpeg'
    ],  
    title: 'Ombre starlet summer lawn pakistani suit',
    price: 1589,
    originalPrice: 2599,
    colors: [''],
    size: ['Free Size'],
    description: 'Ombre starlet summer lawn pakistani suit',
    reviewIds: [],
    details: `Type - Unstitched 

Fabric Details : 

Embroidered Chikankari Lawn Shirt - 3 meter 

Digital printed bamber chiffon duppatta - 2.5 meter 

Dyed cotton trouser - 2.5 meter 

Organza embroidered sleeves border - 1 yard 

Organza embroidered front and back Daman border - 1.7 yards
`
  },
  {
    id: 5,
    slug: 'Lime-lawn-pakistani-suit',
    image: '/img/lime (3).jpeg',
    galleryImages: [
      '/img/lime (1).jpeg',
      '/img/lime (2).jpeg',
      '/img/lime (3).jpeg'
    ],  
    title: 'Lime lawn pakistani suit',
    price: 1299,
    originalPrice: 2499,
    colors: [''],
    size: ['Free Size'],
    description: 'Lime lawn pakistani suit',
    reviewIds: [],
    details: `Color: Green
Shirt
Printed Lawn Shirt
Embroidered Neckline
Trouser
Dyed Cambric Trouser
Dupatta
Printed Chiffon Dupatta
Note: Dry Clean Only
`
  },
  {
    id: 6,
    slug: 'Embridered-english-colour-pakistani-suit',
    image: '/img/english (5).jpeg',
    galleryImages: [
      '/img/english (1).jpeg',
      '/img/english (2).jpeg',
      '/img/english (3).jpeg',
      '/img/english (4).jpeg',
      '/img/english (5).jpeg'
    ],  
    title: 'embridered english colour pakistani suit',
    price: 2079,
    originalPrice: 3999,
    colors: [''],
    size: ['Free Size'],
    description: 'embridered english colour pakistani suit',
    reviewIds: [],
    details: `op - Pure cotton with heavy self embroidery attached emb patches & Lazor cutwork

Bot - cotton solid

DUP-:Pure cotton mal mal with embroidery

DUP-:Chiffon print with embroidery
`
  },
  {
    id: 7,
    slug: 'Embriodered-pure-cotton-pakistani-suit',
    image: '/img/cotton (3).jpeg',
    galleryImages: [
      '/img/cotton (1).jpeg',
      '/img/cotton (2).jpeg',
      '/img/cotton (3).jpeg',
      '/img/cotton (4).jpeg',
      '/img/cotton (5).jpeg',
      '/img/cotton (6).jpeg',
      '/img/cotton (7).jpeg',
      '/img/cotton (8).jpeg',
      '/img/cotton (9).jpeg',
      '/img/cotton (10).jpeg'
    ],  
    title: 'Embriodered pure cotton pakistani suit',
    price: 1999,
    originalPrice: 3599,
    colors: [''],
    size: ['Free Size'],
    description: 'Embriodered pure cotton pakistani suit',
    reviewIds: [],
    details: `_👗Top :-CAMBRIC COTTON WITH HEAVY EMBROIDERY WORK

_🎗️Dupatta :-MASLIN COTTON WITH DIGITAL PRINT 

👖Bottom :- CAMBRIC COTTON      unstitched piece
`
  },
  {
    id: 8,
    slug: 'Women-tie-dye-cotton-straight-shape-kurta-pant-with-duppata',
    image: '/img/straight (5).jpeg',
    galleryImages: [
      '/img/staright (1).jpeg',
      '/img/staright (2).jpeg',
      '/img/staright (3).jpeg',
      '/img/staright (4).jpeg',
      '/img/staright (5).jpeg'
    ],  
    title: 'Women tie & dye cotton straight shape kurta pant with duppata ',
    price: 1499,
    originalPrice: 2490,
    colors: [''],
    size: ['M', 'L', 'XL', 'XXL' ,'3XL'],
    description: 'Women tie & dye cotton straight shape kurta pant with duppata',
    reviewIds: [],
    details: `Elevate your ethnic style with this Tie & Dye Cotton Straight Kurta Set. Featuring a V-neckline, pin tucks at the front, and delicate handwork detailing, this kurta is both elegant and comfortable. The 3/4th regular sleeves and calf-length straight silhouette make it perfect for everyday wear or festive occasions. Complete the look with matching pants and a coordinated dupatta for a stylish, put-together ensemble.
Features:
Fabric: 100% Cotton

Pattern: Tie & Dye

Neckline: V Neck

Sleeves: 3/4 Regular, 
Design: Front Pin Tucks & Handwork

Length: Calf Length

Fit: Straight Shape
Set Includes: Kurta, Pant & Dupatta

Occasion: Casual, Festive, or Office Wear
    `
  },
  {
    id: 9,
    slug: 'WOMAN-V-NECK-HAND-BRUSH-PAINTED-CORD-SET',
    image: '/img/vnech (2).jpeg',
    galleryImages: [
      '/img/vnech (1).jpeg',
      '/img/vnech (2).jpeg',
      '/img/vnech (3).jpeg',
      '/img/vnech (4).jpeg',
      '/img/vnech (5).jpeg',
      '/img/vnech (6).jpeg'
    ],  
    title: 'WOMAN V-NECK HAND BRUSH PAINTED CORD SET',
    price: 1590,
    originalPrice: 2490,
    colors: [''],
    size: ['M', 'L', 'XL', 'XXL' ,'3XL'],
    description: 'WOMAN V-NECK HAND BRUSH PAINTED CORD SET',
    reviewIds: [],
    details: `Designed in premium cotton shaded A-line fabric, this outfit blends comfort with artistic charm. The V-neckline with tassels adds a stylish touch, while the subtle brush-paint texture enhances its contemporary appeal. Paired with a straight-fit pant, this set is perfect for festive gatherings, casual outings, or day-to-day chic styling.

 

 Key Features
Premium Cotton Fabric – Soft, breathable, and perfect for all-day comfort.
Artistic Brush-Paint Texture – Hand-painted effect adds a unique.
Stylish V-Neckline with Tassels – Enhances the feminine and elegant look.
A-Line Kurta Design – Flattering silhouette suitable for all body shapes.
Straight-Fit Pants – Gives a clean and modern finish to the outfit.
Vibrant Orange Shade – Perfect for festive and casual occasions.
Lightweight & Easy to Wear – Ideal for everyday wear and travel.
Perfect Coordination – Designed as a complete cord set for ready-to-wear effortless style.
    `
  }
];

export const getLocalProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem('local_products');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

export const saveLocalProduct = (product: Product) => {
  try {
    const current = getLocalProducts();
    // Prevent duplicate ids
    const updated = current.filter(p => String(p.id) !== String(product.id));
    updated.push(product);
    localStorage.setItem('local_products', JSON.stringify(updated));
    window.dispatchEvent(new Event('products_changed'));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
};

export const deleteLocalProduct = (id: string | number) => {
  try {
    const current = getLocalProducts();
    const updated = current.filter(p => String(p.id) !== String(id));
    localStorage.setItem('local_products', JSON.stringify(updated));
    window.dispatchEvent(new Event('products_changed'));
  } catch (e) {
    console.error('Failed to delete from local storage', e);
  }
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Initial sync merge
    const local = getLocalProducts().filter(lp => lp && lp.slug && lp.id);
    return [...STATIC_PRODUCTS, ...local];
  });
  const [loading, setLoading] = useState(true);

  const fetchDynamicProducts = async () => {
    try {
      setLoading(true);
      const local = getLocalProducts();
      let firestoreProducts: Product[] = [];

      if (db && db.app) {
        // Firestore exists and initialized
        try {
          const colRef = collection(db, 'products');
          const querySnapshot = await getDocs(colRef);
          firestoreProducts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              image: data.image || '',
              mainImage: data.mainImage,
              galleryImages: data.galleryImages || [],
              title: data.title || data.name || '',
              price: Number(data.price || 0),
              originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
              description: data.description || '',
              details: data.details || '',
              colors: data.colors || [''],
              size: data.size || ['Free Size'],
              reviewIds: data.reviewIds || [],
              slug: data.slug || '',
            } as Product;
          });
        } catch (dbErr) {
          console.warn('Firestore products fetch failed. Falling back to local storage.', dbErr);
        }
      }

      // Merge by unique slug or id, priority to Firestore, then local storage, then static
      const allMerged = [...STATIC_PRODUCTS];
      
      // Add local products
      local.forEach(lp => {
        if (lp && lp.slug && !allMerged.some(p => p.slug === lp.slug || String(p.id) === String(lp.id))) {
          allMerged.push(lp);
        }
      });

      // Add Firestore products
      firestoreProducts.forEach(fp => {
        const index = allMerged.findIndex(p => p.slug === fp.slug || String(p.id) === String(fp.id));
        if (index !== -1) {
          // Replace with Firestore data
          allMerged[index] = fp;
        } else {
          allMerged.push(fp);
        }
      });

      setProducts(allMerged);
    } catch (e) {
      console.error('Error fetching products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicProducts();

    // Listen to local changes
    const handleLocalChange = () => {
      fetchDynamicProducts();
    };
    window.addEventListener('products_changed', handleLocalChange);
    return () => {
      window.removeEventListener('products_changed', handleLocalChange);
    };
  }, []);

  const addProduct = async (newProd: Omit<Product, 'id'>) => {
    const tempId = 'prod_' + Date.now();
    const productData: Product = {
      ...newProd,
      id: tempId
    };

    // Save to local storage first for instant feedback
    saveLocalProduct(productData);

    // Save to Firestore if available
    if (db && db.app) {
      try {
        const colRef = collection(db, 'products');
        const docRef = await addDoc(colRef, {
          image: productData.image,
          mainImage: productData.mainImage || productData.image,
          galleryImages: productData.galleryImages || [],
          title: productData.title,
          price: productData.price,
          originalPrice: productData.originalPrice || null,
          description: productData.description,
          details: productData.details,
          colors: productData.colors || [''],
          size: productData.size || ['Free Size'],
          reviewIds: productData.reviewIds || [],
          slug: productData.slug,
          createdAt: new Date().toISOString()
        });
        
        // Remove temp local storage version and replace with Firestore ID
        deleteLocalProduct(tempId);
        const finalProd: Product = { ...productData, id: docRef.id };
        saveLocalProduct(finalProd);
      } catch (err) {
        console.error('Failed to add product to Firestore, kept in local storage', err);
      }
    }
    fetchDynamicProducts();
  };

  const deleteProduct = async (id: string | number) => {
    // Delete from LocalStorage
    deleteLocalProduct(id);

    // Delete from Firestore if it is a string doc ID
    if (db && db.app && typeof id === 'string' && !id.startsWith('prod_')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (err) {
        console.error('Failed to delete product from Firestore', err);
      }
    }
    fetchDynamicProducts();
  };

  return {
    products,
    loading,
    refresh: fetchDynamicProducts,
    addProduct,
    deleteProduct
  };
};
