const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Удаляем mysql-подключение, используем только Supabase

console.log('Connected to Supabase');

// API Routes

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const { data, error } = await supabase
n      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new message
app.post('/api/messages', async (req, res) => {
  const { content, user } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ content, user }])
      .select();
    
    if (error) throw error;
    
    // Return the created message
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new donation
app.post('/api/donations', async (req, res) => {
  const { amount, bank, message, name } = req.body;
  const created_at = new Date().toISOString();
  
  try {
    const { data, error } = await supabase
      .from('donations')
      .insert([{ amount, bank, message, name, created_at }])
      .select();
    
    if (error) throw error;
    
    // Return the created donation
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error('Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});