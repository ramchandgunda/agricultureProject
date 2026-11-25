import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Hybrid Vegetable Seeds",
    category: "Seeds",
    price: 240,
    unit: "pack",
    icon: "🌱",
    description: "Quality vegetable seeds for farms."
  },
  {
    id: 2,
    name: "Organic Vermicompost",
    category: "Fertilizers",
    price: 380,
    unit: "25 kg bag",
    icon: "♻️",
    description: "Organic soil amendment."
  },
  {
    id: 3,
    name: "Knapsack Sprayer",
    category: "Equipment",
    price: 1850,
    unit: "piece",
    icon: "🧴",
    description: "Manual sprayer for farm applications."
  },
  {
    id: 4,
    name: "Drip Irrigation Kit",
    category: "Irrigation",
    price: 2490,
    unit: "kit",
    icon: "💧",
    description: "Starter kit for efficient water delivery."
  },
  {
    id: 5,
    name: "Soil pH Testing Kit",
    category: "Equipment",
    price: 690,
    unit: "kit",
    icon: "🧪",
    description: "Basic soil pH testing supplies."
  },
  {
    id: 6,
    name: "Garden Hand Tool Set",
    category: "Tools",
    price: 550,
    unit: "set",
    icon: "🛠️",
    description: "Useful hand tools for routine farm work."
  }
];

export default function FarmStore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("farmCart") || "[]")
  );

  const categories = [
    "All",
    ...new Set(products.map(p => p.category))
  ];

  const filtered = useMemo(
    () =>
      products.filter(
        p =>
          (category === "All" || p.category === category) &&
          `${p.name} ${p.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [query, category]
  );

  function add(product) {
    const next = [...cart, product];

    setCart(next);

    localStorage.setItem(
      "farmCart",
      JSON.stringify(next)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <main className="feature-page">
      <div className="feature-heading">
        <span className="eyebrow">
          FARM CONNECT MARKETPLACE
        </span>

        <h1>Farm Store</h1>

        <p>
          Explore useful farming inputs, tools and
          irrigation products.
        </p>
      </div>

      <div className="store-toolbar">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products..."
        />

        <div className="store-categories">
          {categories.map(c => (
            <button
              className={category === c ? "active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <strong>
          🛒 {cart.length} items · ₹
          {total.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="product-grid">
        {filtered.map(p => (
          <article className="store-card" key={p.id}>
            <div className="store-product-art">
              {p.icon}
            </div>

            <span className="store-category">
              {p.category}
            </span>

            <h3>{p.name}</h3>
            <p>{p.description}</p>

            <div className="store-card-bottom">
              <strong>
                ₹{p.price.toLocaleString("en-IN")}
                <small> / {p.unit}</small>
              </strong>

              <button onClick={() => add(p)}>
                Add to cart +
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="store-disclaimer">
        Demo catalogue. Prices are illustrative.
        Checkout and payments are not enabled.
      </p>

      <Link className="feature-back" to="/user">
        ← Back to dashboard
      </Link>
    </main>
  );
}