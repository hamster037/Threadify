// Supabase Edge Function — Create Razorpay Order
// Deploy: supabase functions deploy create-razorpay-order

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID')!;
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  try {
    const { proposal_id, request_id } = await req.json();

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get proposal details
    const { data: proposal, error } = await supabase
      .from('proposals')
      .select('*, request:requests(*)')
      .eq('id', proposal_id)
      .single();

    if (error || !proposal) {
      return new Response(JSON.stringify({ error: 'Proposal not found' }), { status: 404 });
    }

    // Create Razorpay order
    const amount = Math.round(proposal.quoted_price * 100); // paise
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt: `order_${proposal_id.slice(0, 8)}`,
        notes: {
          proposal_id,
          request_id,
          tailor_id: proposal.tailor_id,
        },
      }),
    });

    const razorpayOrder = await razorpayResponse.json();

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        request_id,
        proposal_id,
        customer_id: proposal.request.customer_id,
        tailor_id: proposal.tailor_id,
        total_amount: proposal.quoted_price,
        razorpay_order_id: razorpayOrder.id,
      })
      .select()
      .single();

    if (orderError) {
      return new Response(JSON.stringify({ error: orderError.message }), { status: 500 });
    }

    // Update proposal status
    await supabase.from('proposals').update({ status: 'accepted' }).eq('id', proposal_id);

    // Update request status
    await supabase.from('requests').update({ status: 'tailor_selected' }).eq('id', request_id);

    return new Response(
      JSON.stringify({ order, razorpay_order_id: razorpayOrder.id, amount }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
