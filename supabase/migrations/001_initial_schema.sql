-- Threadify MVP — Initial Schema
-- Run this in Supabase SQL Editor

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('customer', 'tailor')) DEFAULT 'customer',
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tailor profiles
CREATE TABLE public.tailor_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  location TEXT,
  specialties TEXT[] DEFAULT '{}',
  portfolio_urls TEXT[] DEFAULT '{}',
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  completion_rate NUMERIC(4,1) DEFAULT 100,
  tier TEXT CHECK (tier IN ('free', 'pro')) DEFAULT 'free',
  razorpay_linked_account_id TEXT,
  active_proposal_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clothing requests
CREATE TABLE public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  outfit_type TEXT NOT NULL,
  reference_image_url TEXT NOT NULL,
  fabric_preference TEXT,
  color_preference TEXT,
  occasion TEXT[] DEFAULT '{}',
  notes TEXT,
  budget_min NUMERIC(10,2) DEFAULT 0,
  budget_max NUMERIC(10,2) DEFAULT 0,
  deadline DATE,
  measurements JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open','proposals_received','tailor_selected','in_production','shipped','delivered','completed','cancelled')),
  proposal_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proposals
CREATE TABLE public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  tailor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quoted_price NUMERIC(10,2) NOT NULL,
  estimated_delivery DATE NOT NULL,
  note TEXT,
  sample_image_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(request_id, tailor_id)
);

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.requests(id),
  proposal_id UUID NOT NULL REFERENCES public.proposals(id),
  customer_id UUID NOT NULL REFERENCES public.users(id),
  tailor_id UUID NOT NULL REFERENCES public.users(id),
  total_amount NUMERIC(10,2) NOT NULL,
  platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  tailor_payout NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'payment_pending'
    CHECK (status IN ('payment_pending','confirmed','fabric_sourced','stitching','quality_check','shipped','delivered','approved','alteration_requested','completed')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_transfer_id TEXT,
  payout_released_at TIMESTAMPTZ,
  auto_release_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order updates (timeline events)
CREATE TABLE public.order_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages (real-time chat)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id),
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.users(id),
  tailor_id UUID NOT NULL REFERENCES public.users(id),
  rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  stitching_quality NUMERIC(2,1),
  fabric_match NUMERIC(2,1),
  communication NUMERIC(2,1),
  on_time NUMERIC(2,1),
  comment TEXT,
  photo_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_requests_customer ON public.requests(customer_id);
CREATE INDEX idx_requests_status ON public.requests(status);
CREATE INDEX idx_proposals_request ON public.proposals(request_id);
CREATE INDEX idx_proposals_tailor ON public.proposals(tailor_id);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_tailor ON public.orders(tailor_id);
CREATE INDEX idx_messages_order ON public.messages(order_id);
CREATE INDEX idx_order_updates_order ON public.order_updates(order_id);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
