-- Threadify MVP — Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tailor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- USERS
CREATE POLICY "Users can read any profile"
  ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- TAILOR PROFILES
CREATE POLICY "Anyone can read tailor profiles"
  ON public.tailor_profiles FOR SELECT USING (true);

CREATE POLICY "Tailors can update own profile"
  ON public.tailor_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Tailors can insert own profile"
  ON public.tailor_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- REQUESTS
CREATE POLICY "Anyone can read open requests"
  ON public.requests FOR SELECT USING (
    status = 'open' OR customer_id = auth.uid()
  );

CREATE POLICY "Customers can create requests"
  ON public.requests FOR INSERT WITH CHECK (
    auth.uid() = customer_id AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'customer')
  );

CREATE POLICY "Customers can update own requests"
  ON public.requests FOR UPDATE USING (auth.uid() = customer_id);

-- PROPOSALS
CREATE POLICY "Stakeholders can view proposals"
  ON public.proposals FOR SELECT USING (
    tailor_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.requests WHERE id = request_id AND customer_id = auth.uid())
  );

CREATE POLICY "Tailors can create proposals"
  ON public.proposals FOR INSERT WITH CHECK (
    auth.uid() = tailor_id AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'tailor')
  );

CREATE POLICY "Tailors can update own proposals"
  ON public.proposals FOR UPDATE USING (auth.uid() = tailor_id);

-- ORDERS
CREATE POLICY "Order participants can view"
  ON public.orders FOR SELECT USING (
    customer_id = auth.uid() OR tailor_id = auth.uid()
  );

CREATE POLICY "System can create orders"
  ON public.orders FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Participants can update orders"
  ON public.orders FOR UPDATE USING (
    customer_id = auth.uid() OR tailor_id = auth.uid()
  );

-- ORDER UPDATES
CREATE POLICY "Order participants can view updates"
  ON public.order_updates FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND (customer_id = auth.uid() OR tailor_id = auth.uid()))
  );

CREATE POLICY "Order participants can create updates"
  ON public.order_updates FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND (customer_id = auth.uid() OR tailor_id = auth.uid()))
  );

-- MESSAGES
CREATE POLICY "Order participants can view messages"
  ON public.messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND (customer_id = auth.uid() OR tailor_id = auth.uid()))
  );

CREATE POLICY "Order participants can send messages"
  ON public.messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND (customer_id = auth.uid() OR tailor_id = auth.uid()))
  );

-- REVIEWS
CREATE POLICY "Anyone can read reviews"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews"
  ON public.reviews FOR INSERT WITH CHECK (
    auth.uid() = customer_id AND
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid() AND status = 'delivered')
  );
