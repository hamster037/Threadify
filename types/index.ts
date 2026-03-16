export type UserRole = 'customer' | 'tailor';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  created_at: string;
}

export interface TailorProfile {
  id: string;
  bio: string | null;
  location: string | null;
  specialties: string[];
  portfolio_urls: string[];
  rating: number;
  review_count: number;
  completion_rate: number;
  tier: 'free' | 'pro';
  razorpay_linked_account_id: string | null;
  active_proposal_count: number;
  created_at: string;
}

export type RequestStatus =
  | 'open'
  | 'proposals_received'
  | 'tailor_selected'
  | 'in_production'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export interface Measurements {
  height?: number;
  weight?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  sleeve?: number;
}

export interface ClothingRequest {
  id: string;
  customer_id: string;
  outfit_type: string;
  reference_image_url: string;
  fabric_preference: string | null;
  color_preference: string | null;
  occasion: string[];
  notes: string | null;
  budget_min: number;
  budget_max: number;
  deadline: string;
  measurements: Measurements;
  status: RequestStatus;
  proposal_count: number;
  created_at: string;
}

export type ProposalStatus = 'pending' | 'accepted' | 'rejected';

export interface Proposal {
  id: string;
  request_id: string;
  tailor_id: string;
  quoted_price: number;
  estimated_delivery: string;
  note: string | null;
  sample_image_urls: string[];
  status: ProposalStatus;
  created_at: string;
  tailor?: User & { tailor_profile?: TailorProfile };
}

export type OrderStatus =
  | 'payment_pending'
  | 'confirmed'
  | 'fabric_sourced'
  | 'stitching'
  | 'quality_check'
  | 'shipped'
  | 'delivered'
  | 'approved'
  | 'alteration_requested'
  | 'completed';

export interface Order {
  id: string;
  request_id: string;
  proposal_id: string;
  customer_id: string;
  tailor_id: string;
  total_amount: number;
  platform_fee: number;
  tailor_payout: number;
  status: OrderStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_transfer_id: string | null;
  payout_released_at: string | null;
  auto_release_at: string | null;
  created_at: string;
  customer?: User;
  tailor?: User & { tailor_profile?: TailorProfile };
  request?: ClothingRequest;
}

export interface OrderUpdate {
  id: string;
  order_id: string;
  status: string;
  note: string | null;
  created_by: string;
  created_at: string;
}

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  order_id: string;
  customer_id: string;
  tailor_id: string;
  rating: number;
  stitching_quality: number | null;
  fabric_match: number | null;
  communication: number | null;
  on_time: number | null;
  comment: string | null;
  photo_urls: string[];
  created_at: string;
  customer?: User;
}
