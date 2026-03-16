-- Threadify MVP — Database Functions & Triggers

-- Auto-increment proposal count on request when new proposal is created
CREATE OR REPLACE FUNCTION increment_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.requests
  SET proposal_count = proposal_count + 1,
      status = CASE WHEN status = 'open' THEN 'proposals_received' ELSE status END
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_proposal_created
  AFTER INSERT ON public.proposals
  FOR EACH ROW EXECUTE FUNCTION increment_proposal_count();

-- Auto-update tailor rating after review
CREATE OR REPLACE FUNCTION update_tailor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.tailor_profiles
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM public.reviews
    WHERE tailor_id = NEW.tailor_id
  ),
  review_count = (
    SELECT COUNT(*)
    FROM public.reviews
    WHERE tailor_id = NEW.tailor_id
  )
  WHERE id = NEW.tailor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_tailor_rating();

-- Calculate platform fee and tailor payout (15% commission)
CREATE OR REPLACE FUNCTION calculate_order_fees()
RETURNS TRIGGER AS $$
BEGIN
  NEW.platform_fee := ROUND(NEW.total_amount * 0.15, 2);
  NEW.tailor_payout := NEW.total_amount - NEW.platform_fee;
  NEW.auto_release_at := NOW() + INTERVAL '24 hours';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_order_insert
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION calculate_order_fees();
