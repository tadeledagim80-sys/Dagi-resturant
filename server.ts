import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import { MENU_ITEMS } from "./src/data/menu.js";
import { Order, ContactMessage } from "./src/types.js";

// Setup __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // In-memory "database"
  const orders: Record<string, Order> = {};
  const contactMessages: ContactMessage[] = [];

  // API Routes
  
  // 1. Get all menu items
  app.get("/api/menu", (req, res) => {
    res.json(MENU_ITEMS);
  });

  // 2. Submit order
  app.post("/api/orders", (req, res) => {
    try {
      const { customerName, phone, email, address, items, total, location } = req.body;

      if (!customerName || !phone || !email || !address || !items || !items.length) {
        return res.status(400).json({ error: "Missing required order details" });
      }

      const orderId = `DAGI-${Math.floor(100000 + Math.random() * 900000)}`;
      const estimatedTime = `${25 + Math.floor(Math.random() * 20)} mins`;

      const newOrder: Order = {
        id: orderId,
        customerName,
        phone,
        email,
        address,
        items,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
        estimatedDeliveryTime: estimatedTime,
        location,
      };

      orders[orderId] = newOrder;
      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to place order" });
    }
  });

  // 3. Get order by ID
  app.get("/api/orders/:id", (req, res) => {
    const orderId = req.params.id;
    const order = orders[orderId];
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  });

  // 4. Submit contact form
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newMessage: ContactMessage = {
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };

      contactMessages.push(newMessage);
      res.status(201).json({ success: true, message: "Your message has been sent successfully." });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to submit message" });
    }
  });

  // 5. Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
