
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ChevronRight, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../App';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      // Finalize order
      clearCart();
      setStep(4);
    }
  };

  if (cart.length === 0 && step < 4) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/catalog')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Back to Shop</button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black">ORDER CONFIRMED!</h2>
          <p className="text-gray-500 text-lg">Thank you for your purchase. We've sent a confirmation email to your inbox.</p>
        </div>
        <div className="bg-gray-100 p-8 rounded-[2rem] max-w-md mx-auto space-y-2">
          <p className="font-bold">Order ID: #RES-{Math.floor(Math.random()*100000)}</p>
          <p className="text-sm text-gray-500">Expect delivery in 3-5 business days.</p>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-600/20"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-12">
          {/* Progress Bar */}
          <div className="flex items-center justify-between max-w-lg mx-auto md:mx-0">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= i ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400'}`}>
                  {i}
                </div>
                {i < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > i ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Truck size={24} /></div>
                  <h2 className="text-3xl font-black">SHIPPING DETAILS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-500">EMAIL ADDRESS</label>
                    <input required type="email" placeholder="you@example.com" className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">FIRST NAME</label>
                    <input required type="text" className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">LAST NAME</label>
                    <input required type="text" className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-500">ADDRESS</label>
                    <input required type="text" className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">CITY</label>
                    <input required type="text" className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">ZIP CODE</label>
                    <input required type="text" className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><CreditCard size={24} /></div>
                  <h2 className="text-3xl font-black">PAYMENT METHOD</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/30 space-y-8">
                    <div className="flex justify-between items-start">
                      <CreditCard size={40} />
                      <span className="text-xl font-black italic tracking-wider">VISA</span>
                    </div>
                    <div className="space-y-4">
                      <input required placeholder="0000 0000 0000 0000" className="bg-transparent text-2xl font-bold border-none w-full placeholder-blue-300 focus:ring-0" />
                      <div className="flex justify-between">
                        <input required placeholder="MM/YY" className="bg-transparent font-medium border-none w-20 placeholder-blue-300 focus:ring-0" />
                        <input required placeholder="CVV" className="bg-transparent font-medium border-none w-16 placeholder-blue-300 focus:ring-0 text-right" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center font-bold italic text-blue-800">Paypal</div>
                      <span className="font-bold">PayPal Checkout</span>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ShieldCheck size={24} /></div>
                  <h2 className="text-3xl font-black">REVIEW ORDER</h2>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-gray-400">SHIPPING TO</h4>
                      <p className="font-bold">John Doe</p>
                      <p className="text-gray-500 text-sm">123 Street Ave, New York, NY 10001</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-gray-400">PAYING WITH</h4>
                      <p className="font-bold">Visa Ending in 4242</p>
                      <p className="text-gray-500 text-sm">Exp: 12/26</p>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-gray-100">
                    <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase">Items</h4>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="font-medium">{item.name} (x{item.quantity})</span>
                          <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="px-10 py-5 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition">
                  Go Back
                </button>
              )}
              <button type="submit" className="flex-1 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 flex items-center justify-center group">
                {step === 3 ? 'Confirm Purchase' : 'Continue'}
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-28 space-y-8">
            <h3 className="text-2xl font-black">ORDER SUMMARY</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Tax</span>
                <span className="text-gray-900 font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-2xl font-black">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-green-600" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">SSL SECURE PAYMENT</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase leading-relaxed font-medium">
                Your data is encrypted and secure. We do not store full credit card details on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
