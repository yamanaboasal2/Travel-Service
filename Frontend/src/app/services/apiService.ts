// API Service Configuration
// Base URL is built from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

console.log('═══════════════════════════════════════════');
console.log('[API Service] Initialized');
console.log('[API Service] Base URL:', API_BASE_URL);
console.log('[API Service] Backend Expected at: http://localhost:5000');
console.log('[API Service] Frontend Running at: localhost:5174');
console.log('═══════════════════════════════════════════');

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  token?: string;
  user?: any;
}

export interface SystemHealth {
  message: string;
  timestamp: string;
  environment: string;
  database?: {
    status: "connected" | "connecting" | "disconnected" | "disconnecting";
    healthy: boolean;
  };
  apiResponseMs?: number;
}

// Generic request helper with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`[API] ${options.method || 'GET'} ${url}`);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    console.log(`[API] Adding Authorization header with token`);
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include credentials for CORS
    });

    console.log(`[API] Response status: ${response.status}`);

    if (!response.ok) {
      let error: any = {};
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        try {
          error = await response.json();
        } catch (parseError) {
          error = { error: response.statusText || `HTTP ${response.status}` };
        }
      } else {
        error = { error: response.statusText || `HTTP ${response.status}` };
      }
      
      const errorMessage = error.error || error.message || `API error: ${response.status}`;
      console.error(`[API Error] ${endpoint}:`, {
        status: response.status,
        message: errorMessage,
        fullError: error
      });
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(`[API] Success:`, data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      const networkErrorMsg = `❌ Network Error: Failed to reach backend at ${API_BASE_URL}
      
Make sure:
1. Backend is running: npm run dev (in Backend folder)
2. Backend listening on: http://localhost:5000
3. CORS allows frontend port 5174
4. MongoDB is connected`;
      console.error(networkErrorMsg, error.message);
      throw new Error(networkErrorMsg);
    }
    throw error;
  }
}

// ============ AUTH ENDPOINTS ============

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    console.log("🔐 Registering user:", { name, email });
    
    const response = await apiRequest<{
      token: string;
      message: string;
      user: { id: string; name: string; email: string; role: string };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (response.token) {
      console.log("✅ Registration successful, storing token");
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log("🔐 Logging in user:", { email });
    
    const response = await apiRequest<{
      token: string;
      message: string;
      user: { id: string; name: string; email: string; role: string };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      console.log("✅ Login successful, storing token");
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  return apiRequest<{
    user: { id: string; name: string; email: string; role: string };
  }>('/auth/me', {
    method: 'GET',
  });
}

export async function requestPasswordReset(email: string) {
  return apiRequest<{
    message: string;
    resetToken: string;
  }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, password: string) {
  const response = await apiRequest<{
    message: string;
    token: string;
    user: { id: string; name: string; email: string; role: string; status?: string };
  }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });

  if (response.token) {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

export function logoutUser() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

// ============ USERS ENDPOINTS ============

export interface AdminUserRecord {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  status?: 'active' | 'blocked';
  lastLoginAt?: string | null;
  createdAt?: string;
}

export async function getAllUsers() {
  const response = await apiRequest<{
    data: AdminUserRecord[];
    count: number;
    message: string;
  }>('/users', { method: 'GET' });

  return response.data || [];
}

export async function updateUser(id: string, payload: Partial<AdminUserRecord> & { password?: string }) {
  const response = await apiRequest<{
    data: AdminUserRecord;
    message: string;
  }>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteUser(id: string) {
  return apiRequest<{ message: string }>(`/users/${id}`, { method: 'DELETE' });
}

// ============ SERVICES ENDPOINTS ============

export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  duration?: string;
  features?: string[];
  color?: string;
}

export async function getAllServices() {
  const response = await apiRequest<{
    data: Service[];
    count: number;
    message: string;
  }>('/services', { method: 'GET' });

  return response.data || [];
}

export async function getServiceById(id: string) {
  const response = await apiRequest<{
    data: Service;
    message: string;
  }>(`/services/${id}`, { method: 'GET' });

  return response.data;
}

export async function createService(payload: Partial<Service>) {
  const response = await apiRequest<{ data: Service; message: string }>('/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateService(id: string, payload: Partial<Service>) {
  const response = await apiRequest<{ data: Service; message: string }>(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteService(id: string) {
  return apiRequest<{ message: string }>(`/services/${id}`, { method: 'DELETE' });
}

// ============ OFFERS ENDPOINTS ============

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discount: number;
  price?: number;
  originalPrice?: number;
  country?: string;
  duration?: string;
  rating?: number;
  image?: string;
  video?: string;
  mediaType?: 'image' | 'video';
  includes?: string[];
  highlights?: string[];
  serviceId?: string;
  expiryDate?: string;
}

export async function getAllOffers() {
  const response = await apiRequest<{
    data: Offer[];
    count: number;
    message: string;
  }>('/offers', { method: 'GET' });

  return response.data || [];
}

export async function getOfferById(id: string) {
  const response = await apiRequest<{
    data: Offer;
    message: string;
  }>(`/offers/${id}`, { method: 'GET' });

  return response.data;
}

export async function createOffer(payload: Partial<Offer>) {
  const response = await apiRequest<{ data: Offer; message: string }>('/offers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateOffer(id: string, payload: Partial<Offer>) {
  const response = await apiRequest<{ data: Offer; message: string }>(`/offers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteOffer(id: string) {
  return apiRequest<{ message: string }>(`/offers/${id}`, { method: 'DELETE' });
}

// ============ DESTINATIONS ENDPOINTS ============

export interface Destination {
  _id: string;
  name: string;
  country: string;
  description: string;
  image?: string;
  price?: number;
  rating?: number;
  duration?: string;
  highlights?: string[];
}

export async function getAllDestinations() {
  const response = await apiRequest<{
    data: Destination[];
    count: number;
    message: string;
  }>('/destinations', { method: 'GET' });

  return response.data || [];
}

export async function createDestination(payload: Partial<Destination>) {
  const response = await apiRequest<{ data: Destination; message: string }>('/destinations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateDestination(id: string, payload: Partial<Destination>) {
  const response = await apiRequest<{ data: Destination; message: string }>(`/destinations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteDestination(id: string) {
  return apiRequest<{ message: string }>(`/destinations/${id}`, { method: 'DELETE' });
}

// ============ BOOKINGS ENDPOINTS ============

export interface Booking {
  _id: string;
  userId?: string;
  serviceId?: string;
  packageId?: string;
  customer?: { name?: string; email?: string; phone?: string; nationality?: string; passportType?: string };
  selectedServices?: string[];
  destination?: string;
  tripType?: string;
  paymentMethod?: string;
  notes?: string;
  bookingDate: string;
  travelers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
}

export interface BookingPayload {
  serviceId?: string;
  packageId?: string;
  bookingDate: string;
  travelers: number;
  specialRequests?: string;
  customer?: Booking['customer'];
  selectedServices?: string[];
  destination?: string;
  tripType?: string;
  paymentMethod?: string;
  totalPrice?: number;
  notes?: string;
}

export async function getAllBookings() {
  const response = await apiRequest<{
    data: Booking[];
    count: number;
    message: string;
  }>('/bookings', { method: 'GET' });

  return response.data || [];
}

export async function getUserBookings() {
  const response = await apiRequest<{
    data: Booking[];
    count: number;
    message: string;
  }>('/bookings/user/my-bookings', { method: 'GET' });

  return response.data || [];
}

export async function getBookingById(id: string) {
  const response = await apiRequest<{
    data: Booking;
    message: string;
  }>(`/bookings/${id}`, { method: 'GET' });

  return response.data;
}

export async function createBooking(
  serviceId: string,
  bookingDate: string,
  travelers: number,
  specialRequests?: string
) {
  const response = await apiRequest<{
    data: Booking;
    message: string;
  }>('/bookings', {
    method: 'POST',
    body: JSON.stringify({
      serviceId,
      bookingDate,
      travelers,
      specialRequests,
    }),
  });

  return response.data;
}

export async function createBookingRequest(payload: BookingPayload) {
  const response = await apiRequest<{
    data: Booking;
    message: string;
  }>('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateBooking(id: string, payload: Partial<Booking>) {
  const response = await apiRequest<{
    data: Booking;
    message: string;
  }>(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteBooking(id: string) {
  return apiRequest<{ message: string }>(`/bookings/${id}`, { method: 'DELETE' });
}

export async function cancelBooking(id: string) {
  const response = await apiRequest<{
    data: Booking;
    message: string;
  }>(`/bookings/${id}/cancel`, { method: 'PATCH' });

  return response.data;
}

// ============ CONTACT ENDPOINTS ============

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export async function sendContactMessage(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const response = await apiRequest<{
    data: ContactMessage;
    message: string;
  }>('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, subject, message }),
  });

  return response;
}

export async function getAllMessages() {
  const response = await apiRequest<{
    data: ContactMessage[];
    count: number;
    message: string;
  }>('/contact', { method: 'GET' });

  return response.data || [];
}

export async function deleteContactMessage(id: string) {
  return apiRequest<{ message: string }>(`/contact/${id}`, { method: 'DELETE' });
}

export async function updateContactMessageStatus(id: string, status: ContactMessage['status']) {
  const response = await apiRequest<{
    data: ContactMessage;
    message: string;
  }>(`/contact/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

  return response.data;
}

// ============ COMMENTS ENDPOINTS ============

export interface CustomerComment {
  _id: string;
  name: string;
  city: string;
  phone?: string;
  comment: string;
  status: 'pending' | 'approved' | 'hidden';
  color?: string;
  createdAt: string;
}

export async function getAllComments() {
  const response = await apiRequest<{
    data: CustomerComment[];
    count: number;
    message: string;
  }>('/comments', { method: 'GET' });

  return response.data || [];
}

export async function getAdminComments() {
  const response = await apiRequest<{
    data: CustomerComment[];
    count: number;
    message: string;
  }>('/comments/admin/all', { method: 'GET' });

  return response.data || [];
}

export async function createComment(payload: Pick<CustomerComment, 'name' | 'city' | 'comment'> & { phone?: string }) {
  const response = await apiRequest<{
    data: CustomerComment;
    message: string;
  }>('/comments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateComment(id: string, payload: Partial<CustomerComment>) {
  const response = await apiRequest<{
    data: CustomerComment;
    message: string;
  }>(`/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteComment(id: string) {
  return apiRequest<{ message: string }>(`/comments/${id}`, { method: 'DELETE' });
}

export async function getSystemHealth() {
  const startedAt = performance.now();
  const response = await apiRequest<SystemHealth>('/health', { method: 'GET' });
  const apiResponseMs = Math.round(performance.now() - startedAt);

  return {
    ...response,
    apiResponseMs,
  };
}

// ============ UTILITY FUNCTIONS ============

export function getStoredAuthToken() {
  return localStorage.getItem('authToken');
}

export function getStoredUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!getStoredAuthToken();
}
