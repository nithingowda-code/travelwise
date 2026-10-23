import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import NodeCache from 'node-cache';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Caches
// 15-minute cache for weather
const weatherCache = new NodeCache({ stdTTL: 900, checkperiod: 120 });
// 24-hour cache for places, photos, and water bodies
const placesCache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });
const waterCache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });
const photoCache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });

app.use(cors());
app.use(express.json());

// Health & Config Check
app.get('/api/health', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGoogleMapsKey: Boolean(apiKey && apiKey.trim().length > 0)
  });
});

// Google Places Search Proxy
app.get('/api/places/search', async (req, res) => {
  const query = req.query.query;
  const lat = req.query.lat;
  const lng = req.query.lng;
  const radius = req.query.radius || '25000';

  if (!query && (!lat || !lng)) {
    return res.status(400).json({ error: 'Missing query or lat/lng parameter' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'MISSING_API_KEY',
      message: 'Google Maps API key is not configured in .env'
    });
  }

  const cacheKey = `search_${query}_${lat}_${lng}_${radius}`;
  const cached = placesCache.get(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', results: cached });
  }

  try {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const params = {
      key: apiKey,
      query: query || 'tourist attractions',
    };
    if (lat && lng) {
      params.location = `${lat},${lng}`;
      params.radius = radius;
    }

    const response = await axios.get(url, { params, timeout: 8000 });
    const results = response.data.results || [];
    placesCache.set(cacheKey, results);
    return res.json({ source: 'live', results });
  } catch (err) {
    console.error('Error fetching places:', err.message);
    return res.status(500).json({
      error: 'PLACES_FETCH_FAILED',
      message: err.response?.data?.error_message || err.message
    });
  }
});

// Place Photo Proxy with 1:1 placeId caching
app.get('/api/places/photo', async (req, res) => {
  const { photo_reference, maxwidth = 800, place_id } = req.query;

  if (!photo_reference) {
    return res.status(400).json({ error: 'Missing photo_reference parameter' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'MISSING_API_KEY',
      message: 'Google Maps API key is not configured'
    });
  }

  const cacheKey = `photo_${place_id || photo_reference}_${maxwidth}`;
  const cachedUrl = photoCache.get(cacheKey);
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  try {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${photo_reference}&key=${apiKey}`;
    const headRes = await axios.get(photoUrl, {
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400
    });

    const finalLocation = headRes.headers.location || photoUrl;
    photoCache.set(cacheKey, finalLocation);
    return res.redirect(finalLocation);
  } catch (err) {
    if (err.response && (err.response.status === 302 || err.response.status === 301)) {
      const redirectUrl = err.response.headers.location;
      photoCache.set(cacheKey, redirectUrl);
      return res.redirect(redirectUrl);
    }
    console.error('Error proxying photo:', err.message);
    return res.status(500).json({ error: 'PHOTO_PROXY_FAILED', message: err.message });
  }
});

// Wikimedia / Wikipedia Fallback Image Fetcher
app.get('/api/places/fallback-photo', async (req, res) => {
  const { placeName } = req.query;
  if (!placeName) {
    return res.status(400).json({ error: 'Missing placeName parameter' });
  }

  const cacheKey = `wiki_${placeName.toLowerCase().trim()}`;
  const cached = photoCache.get(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', ...cached });
  }

  try {
    // Wikipedia API requires a descriptive User-Agent header according to Wikimedia Policy
    const headers = {
      'User-Agent': 'TouristPlannerApp/1.0 (https://github.com/tourist-recommendation; contact@example.com)'
    };

    let searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|info&inprop=url&piprop=original|thumbnail&pithumbsize=800&titles=${encodeURIComponent(placeName)}&origin=*`;
    let response = await axios.get(searchUrl, { headers, timeout: 6000 });
    let pages = response.data?.query?.pages || {};
    let pageId = Object.keys(pages)[0];

    // If direct title not found, perform search generator query
    if (!pageId || pageId === '-1') {
      const fallbackSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(placeName)}&gsrlimit=1&prop=pageimages|info&inprop=url&piprop=original|thumbnail&pithumbsize=800&origin=*`;
      response = await axios.get(fallbackSearchUrl, { headers, timeout: 6000 });
      pages = response.data?.query?.pages || {};
      pageId = Object.keys(pages)[0];
    }

    if (pageId && pageId !== '-1') {
      const page = pages[pageId];
      const imageUrl = page.thumbnail?.source || page.original?.source;
      if (imageUrl) {
        const result = {
          imageUrl,
          attribution: 'Wikimedia Commons / Wikipedia Contributors',
          licenseUrl: page.fullurl || 'https://en.wikipedia.org',
          title: page.title
        };
        photoCache.set(cacheKey, result);
        return res.json({ source: 'live', ...result });
      }
    }

    return res.status(404).json({ error: 'NO_WIKIPEDIA_IMAGE_FOUND' });
  } catch (err) {
    console.error('Wikipedia image lookup error:', err.message);
    return res.status(500).json({ error: 'WIKIPEDIA_LOOKUP_FAILED', message: err.message });
  }
});

// Open-Meteo 16-Day Weather Proxy
app.get('/api/weather', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameter' });
  }

  const cacheKey = `weather_${parseFloat(lat).toFixed(3)}_${parseFloat(lng).toFixed(3)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', data: cached, lastUpdated: cached.lastUpdated });
  }

  try {
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude: lat,
      longitude: lng,
      forecast_days: 16,
      timezone: 'auto',
      daily: [
        'weathercode',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'precipitation_sum',
        'precipitation_probability_max',
        'windspeed_10m_max',
        'uv_index_max',
        'sunrise',
        'sunset'
      ].join(','),
      hourly: [
        'temperature_2m',
        'precipitation_probability',
        'windspeed_10m',
        'weathercode'
      ].join(',')
    };

    const response = await axios.get(weatherUrl, { params, timeout: 8000 });
    const payload = {
      ...response.data,
      lastUpdated: new Date().toISOString()
    };
    weatherCache.set(cacheKey, payload);
    return res.json({ source: 'live', data: payload, lastUpdated: payload.lastUpdated });
  } catch (err) {
    console.error('Open-Meteo weather fetch error:', err.message);
    return res.status(500).json({ error: 'WEATHER_FETCH_FAILED', message: err.message });
  }
});

// Overpass API Water Bodies Proxy
app.get('/api/water-bodies', async (req, res) => {
  const { south, west, north, east } = req.query;
  if (!south || !west || !north || !east) {
    return res.status(400).json({ error: 'Missing bounding box (south, west, north, east)' });
  }

  const cacheKey = `water_${parseFloat(south).toFixed(2)}_${parseFloat(west).toFixed(2)}_${parseFloat(north).toFixed(2)}_${parseFloat(east).toFixed(2)}`;
  const cached = waterCache.get(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', elements: cached });
  }

  // Construct Overpass QL query
  const bbox = `${south},${west},${north},${east}`;
  const overpassQuery = `
    [out:json][timeout:25];
    (
      way["natural"="water"](${bbox});
      relation["natural"="water"](${bbox});
      way["natural"="bay"](${bbox});
      way["waterway"="river"](${bbox});
      way["waterway"="waterfall"](${bbox});
      node["waterway"="waterfall"](${bbox});
      way["natural"="coastline"](${bbox});
    );
    out geom tags;
  `;

  const overpassEndpoints = [
    'https://overpass.osm.ch/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass-api.de/api/interpreter'
  ];

  let lastError = null;
  const postData = new URLSearchParams({ data: overpassQuery }).toString();

  for (const endpoint of overpassEndpoints) {
    try {
      const response = await axios.post(
        endpoint,
        postData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'TouristPlannerApp/1.0 (contact@example.com)'
          },
          timeout: 15000
        }
      );

      const elements = response.data?.elements || [];
      waterCache.set(cacheKey, elements);
      return res.json({ source: 'live', elements });
    } catch (err) {
      lastError = err;
      console.warn(`Overpass error on ${endpoint}: ${err.message}. Trying next mirror...`);
    }
  }

  console.error('All Overpass mirrors failed:', lastError?.message);
  return res.status(500).json({ error: 'OVERPASS_FETCH_FAILED', message: lastError?.message });
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
});
