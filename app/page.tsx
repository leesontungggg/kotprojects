"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const categories = ["All", "Footwear", "Apparel", "Accessories", "Objects"];

const CART_STORAGE_KEY = "kotprojects_cart";

const products = [
  {
    id: 1,
    name: "Mono Runner",
    category: "Footwear",
    price: "$240",
    priceValue: 240,
    tone: "from-[#0f0f0f] via-[#3c3c3c] to-[#bca99a]",
    image: "/image-1.webp",
    images: ["/image-1.webp", "/image-2.webp", "/image-3.webp"],
  },
  {
    id: 2,
    name: "Desert Low",
    category: "Footwear",
    price: "$210",
    priceValue: 210,
    tone: "from-[#1b1b1b] via-[#5c5249] to-[#c2b19e]",
    image: "/image-2.webp",
    images: ["/image-2.webp", "/image-3.webp", "/image-4.webp"],
  },
  {
    id: 3,
    name: "Archive Hoodie",
    category: "Apparel",
    price: "$180",
    priceValue: 180,
    tone: "from-[#1c1c1c] via-[#4f4b47] to-[#9d9288]",
    image: "/image-3.webp",
    images: ["/image-3.webp", "/image-4.webp", "/image-5.webp"],
  },
  {
    id: 4,
    name: "Studio Tee",
    category: "Apparel",
    price: "$95",
    priceValue: 95,
    tone: "from-[#0e0e0e] via-[#2f2f2f] to-[#c8c2bb]",
    image: "/image-4.webp",
    images: ["/image-4.webp", "/image-5.webp", "/image-6.webp"],
  },
  {
    id: 5,
    name: "Utility Cap",
    category: "Accessories",
    price: "$65",
    priceValue: 65,
    tone: "from-[#111111] via-[#3b3832] to-[#a59384]",
    image: "/image-5.webp",
    images: ["/image-5.webp", "/image-6.webp", "/image-7.webp"],
  },
  {
    id: 6,
    name: "Knit Scarf",
    category: "Accessories",
    price: "$88",
    priceValue: 88,
    tone: "from-[#0f0f0f] via-[#45423e] to-[#b7a99a]",
    image: "/image-6.webp",
    images: ["/image-6.webp", "/image-7.webp", "/image-8.webp"],
  },
  {
    id: 7,
    name: "Concrete Mug",
    category: "Objects",
    price: "$40",
    priceValue: 40,
    tone: "from-[#151515] via-[#494949] to-[#b4b1ac]",
    image: "/image-7.webp",
    images: ["/image-7.webp", "/image-8.webp", "/image-1.webp"],
  },
  {
    id: 8,
    name: "Studio Tote",
    category: "Objects",
    price: "$120",
    priceValue: 120,
    tone: "from-[#101010] via-[#403b36] to-[#a69586]",
    image: "/image-8.webp",
    images: ["/image-8.webp", "/image-1.webp", "/image-2.webp"],
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    Array<{
      id: number;
      name: string;
      price: string;
      priceValue: number;
      quantity: number;
    }>
  >([]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity * item.priceValue,
        0,
      ),
    [cartItems],
  );

  const openProduct = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setCarouselIndex(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: (typeof products)[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceValue: product.priceValue,
          quantity: 1,
        },
      ];
    });
  };

  const increaseCartItem = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseCartItem = (productId: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (!existing) {
        return prev;
      }

      if (existing.quantity <= 1) {
        return prev.filter((item) => item.id !== productId);
      }

      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const removeCartItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const showPreviousImage = () => {
    if (!selectedProduct) {
      return;
    }

    setCarouselIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1,
    );
  };

  const showNextImage = () => {
    if (!selectedProduct) {
      return;
    }

    setCarouselIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    if (!selectedProduct && !isCartOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isCartOpen) {
          setIsCartOpen(false);
          return;
        }

        if (selectedProduct) {
          closeProduct();
        }
      }

      if (!selectedProduct) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedProduct,
    isCartOpen,
    showPreviousImage,
    showNextImage,
    closeProduct,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setCartItems(parsed);
      }
    } catch {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="site-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-6 pt-10">
        <div className="fade-in-up">
          <Image
            src="/3.svg"
            alt="Minimal Goods Logo"
            width={320}
            height={320}
          />
          <h1 className="mt-4 text-4xl font-semibold uppercase tracking-[0.2em] text-[#12110f] sm:text-6xl font-grotesk">
            Kot Projects
            <br />
            Daily Rituals
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden flex-col items-end gap-3 text-right text-xs uppercase tracking-[0.3em] text-[#5d5a55] md:flex fade-in-up stagger-1">
            <span>Season 26</span>
            <span>Limited Issue</span>
          </div>
          <button
            type="button"
            className="cart-icon-button"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-2 pb-8 fade-in-up stagger-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`category-pill ${
                activeCategory === category
                  ? "category-pill-active"
                  : "category-pill-inactive"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => openProduct(product)}
              className={`product-card fade-in-up ${
                index % 4 === 0
                  ? "stagger-1"
                  : index % 4 === 1
                    ? "stagger-2"
                    : index % 4 === 2
                      ? "stagger-3"
                      : "stagger-4"
              } text-left`}
            >
              <div
                className={`product-media flex !justify-center ${product.tone}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <div className="!absolute bottom-0">
                  <span className="product-tag">NEW</span>
                  {/* <div className="product-mark">KOT</div> */}
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#7c756d]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#161412] font-grotesk">
                    {product.name}
                  </h3>
                </div>
                <span className="text-sm font-semibold text-[#161412]">
                  {product.price}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProduct}>
          <div
            className="modal-shell"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <button
                type="button"
                className="icon-button"
                onClick={closeProduct}
              >
                <X size={22} />
              </button>
              <button
                type="button"
                className="icon-button"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={22} />
              </button>
            </div>
            <div className="modal-body">
              <div className="carousel">
                <button
                  type="button"
                  className="carousel-nav carousel-left"
                  onClick={showPreviousImage}
                >
                  <ChevronLeft size={22} />
                </button>
                <div className="carousel-frame">
                  <Image
                    src={selectedProduct.images[carouselIndex]}
                    alt={selectedProduct.name}
                    width={420}
                    height={420}
                    className="carousel-image"
                  />
                </div>
                <button
                  type="button"
                  className="carousel-nav carousel-right"
                  onClick={showNextImage}
                >
                  <ChevronRight size={22} />
                </button>
              </div>
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <p className="modal-price">{selectedProduct.price}</p>
              <button
                type="button"
                className="add-cart-button"
                onClick={() => addToCart(selectedProduct)}
              >
                <Plus size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-modal-overlay">
          <div className="cart-modal-shell">
            <div className="cart-modal-header">
              <button
                type="button"
                className="icon-button"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={20} />
              </button>
              <div className="cart-modal-title">
                <span>Checkout</span>
              </div>
              <div className="cart-modal-actions">
                {/* <span className="cart-modal-wallet">YZY Wallet</span> */}
                <ShoppingCart size={18} />
              </div>
            </div>

            <div className="cart-modal-grid">
              <div className="cart-form">
                <div className="cart-section">
                  <p className="cart-section-title">Contact Information</p>
                  <label className="cart-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    className="cart-input"
                    type="email"
                    placeholder="you@email.com"
                  />
                  <label className="cart-checkbox">
                    <input type="checkbox" defaultChecked />
                    Subscribe to updates and notifications
                  </label>
                </div>

                <div className="cart-section">
                  <p className="cart-section-title">Billing Address</p>
                  <label className="cart-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    id="address"
                    className="cart-input"
                    type="text"
                    placeholder="Start typing your address..."
                  />
                  <label className="cart-label" htmlFor="address2">
                    Apartment, suite, unit, etc. (optional)
                  </label>
                  <input
                    id="address2"
                    className="cart-input"
                    type="text"
                    placeholder="Apartment, suite, unit, floor, etc."
                  />
                  <div className="cart-grid-2">
                    <div>
                      <label className="cart-label" htmlFor="city">
                        City
                      </label>
                      <input id="city" className="cart-input" type="text" />
                    </div>
                    <div>
                      <label className="cart-label" htmlFor="state">
                        State / Province
                      </label>
                      <input id="state" className="cart-input" type="text" />
                    </div>
                  </div>
                  <div className="cart-grid-2">
                    <div>
                      <label className="cart-label" htmlFor="zip">
                        Zip / Postal Code
                      </label>
                      <input id="zip" className="cart-input" type="text" />
                    </div>
                    <div>
                      <label className="cart-label" htmlFor="country">
                        Country
                      </label>
                      <select id="country" className="cart-input">
                        <option>Select country</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="cart-section">
                  <p className="cart-section-title">Payment Details</p>
                  <div className="cart-payment-box">
                    Please enter your information above to select a payment
                    method.
                  </div>
                  <div className="cart-payment-choice">
                    <span>Credit / Debit Card</span>
                    <span className="cart-muted">Visa, Mastercard, Amex</span>
                  </div>
                  <div className="cart-payment-choice">
                    <span>USDC (Crypto)</span>
                    <span className="cart-muted">Pay with USDC on Solana</span>
                  </div>
                </div>
              </div>

              <div className="cart-summary">
                <div className="cart-summary-header">
                  <span>Order Summary</span>
                </div>
                <div className="cart-items">
                  {cartItems.length === 0 ? (
                    <p className="text-sm uppercase tracking-[0.2em] text-[#6b645c]">
                      Your cart is empty.
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-[#8a847c]">
                            Item
                          </p>
                          <p className="text-base font-semibold text-[#171511]">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#6b645c]">
                            Qty {item.quantity}
                          </p>
                          <div className="cart-item-controls">
                            <button
                              type="button"
                              className="qty-button"
                              onClick={() => decreaseCartItem(item.id)}
                            >
                              <Minus size={16} />
                            </button>
                            <button
                              type="button"
                              className="qty-button"
                              onClick={() => increaseCartItem(item.id)}
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              type="button"
                              className="qty-button"
                              onClick={() => removeCartItem(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-[#171511]">
                          {item.price}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="cart-summary-totals">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(0)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div className="cart-summary-row cart-summary-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
