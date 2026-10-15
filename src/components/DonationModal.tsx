import React, { useState, useEffect } from 'react';
import { useApp } from '../store';
import { Donation, DONOR_TIERS } from '../types';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100, 500];
const CURRENCIES = ['USD', 'KRW', 'JPY', 'EUR', 'GBP', 'BRL'];
const ORGANIZATIONS = [
  '🌍 Global Relief Fund',
  '🏫 Education for All',
  '🏥 Medical Aid International',
  '🌱 Environmental Protection',
  '🤝 Community Development'
];

export default function DonationModal() {
  const { showDonation, setShowDonation, currentUser, addDonation, donations, translate } = useApp();
  const [tab, setTab] = useState<'donate' | 'success' | 'history' | 'tiers'>('donate');
  
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState('USD');
  const [recipientOrg, setRecipientOrg] = useState(ORGANIZATIONS[0]);
  const [message, setMessage] = useState('');

  // Reset tab when reopened
  useEffect(() => {
    if (showDonation) {
      setTab('donate');
      setAmount(25);
      setCustomAmount('');
    }
  }, [showDonation]);

  if (!showDonation) return null;

  const handleClose = () => setShowDonation(false);
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const actualAmount = customAmount ? parseFloat(customAmount) || 0 : amount;
  const platformFee = actualAmount * 0.03;
  const processingFee = actualAmount * 0.02;
  const totalFee = platformFee + processingFee;
  const netDonation = actualAmount - totalFee;

  const handleDonate = () => {
    if (actualAmount <= 0) return;
    
    addDonation({
      donorId: currentUser?.id || 'anon',
      donorName: currentUser?.name || 'Anonymous',
      amount: actualAmount,
      currency,
      platformFee,
      processingFee,
      totalFee,
      netDonation,
      recipientOrg,
      message
    });
    
    setTab('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 relative">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-xl">
            ✕
          </button>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            💝 {translate('offering_donation') || 'Offering / Donation'}
          </h2>
          <p className="text-emerald-100 mt-1">Your generosity makes a difference</p>
          
          <div className="flex gap-4 mt-6">
            <button 
              className={`pb-2 border-b-2 font-medium text-sm ${tab === 'donate' ? 'border-white text-white' : 'border-transparent text-emerald-200 hover:text-white'}`}
              onClick={() => setTab('donate')}
            >
              헌금하기 (Donate)
            </button>
            <button 
              className={`pb-2 border-b-2 font-medium text-sm ${tab === 'tiers' ? 'border-white text-white' : 'border-transparent text-emerald-200 hover:text-white'}`}
              onClick={() => setTab('tiers')}
            >
              👑 회원 등급 & 혜택
            </button>
            <button 
              className={`pb-2 border-b-2 font-medium text-sm ${tab === 'history' ? 'border-white text-white' : 'border-transparent text-emerald-200 hover:text-white'}`}
              onClick={() => setTab('history')}
            >
              헌금 내역
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {tab === 'donate' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {PRESET_AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setAmount(amt); setCustomAmount(''); }}
                      className={`py-3 rounded-xl border-2 font-bold text-lg transition-all ${
                        amount === amt && !customAmount
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-gray-50'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-1/3 border border-gray-300 rounded-xl p-3 bg-gray-50 font-medium focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                    className="w-2/3 border border-gray-300 rounded-xl p-3 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Organization</label>
                <select 
                  value={recipientOrg}
                  onChange={(e) => setRecipientOrg(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  {ORGANIZATIONS.map(org => <option key={org} value={org}>{org}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                  placeholder="Leave a message of hope..."
                />
              </div>

              {/* Fee Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm">
                <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Donation Breakdown</h4>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Donation Amount</span>
                  <span className="font-medium">${actualAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-500">
                  <span>Platform Fee (3%)</span>
                  <span>-${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3 text-gray-500">
                  <span>Processing Fee (2%)</span>
                  <span>-${processingFee.toFixed(2)}</span>
                </div>
                
                {/* Visual Bar */}
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-gray-200 mb-3">
                  <div className="bg-emerald-500 h-full" style={{ width: '95%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '3%' }}></div>
                  <div className="bg-rose-400 h-full" style={{ width: '2%' }}></div>
                </div>
                
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Net Donation</span>
                  <span className="text-emerald-600">${netDonation.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleClose} className="w-1/3 py-4 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleDonate}
                  disabled={actualAmount <= 0}
                  className="w-2/3 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Donate Now
                </button>
              </div>
            </div>
          )}

          {tab === 'success' && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-5xl mb-6">
                ✅
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-8 max-w-sm">
                Your donation of <span className="font-bold">${actualAmount.toFixed(2)} {currency}</span> to <span className="font-semibold">{recipientOrg}</span> has been processed successfully.
              </p>
              
              <button 
                onClick={handleClose}
                className="w-full max-w-xs py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {tab === 'tiers' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              {/* User Current Tier Summary Card */}
              <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                    내 현재 후원 등급
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl">
                      {currentUser?.tier ? DONOR_TIERS[currentUser.tier].badge : '🌱'}
                    </span>
                    <h3 className="text-xl font-extrabold">
                      {currentUser?.tier ? DONOR_TIERS[currentUser.tier].name : DONOR_TIERS.bronze.name}
                    </h3>
                  </div>
                  <p className="text-xs text-amber-100 mt-1">
                    누적 헌금액: <span className="font-bold text-white">${currentUser?.totalDonation || 0} USD</span>
                  </p>
                </div>
              </div>

              {/* Tier Hierarchy Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  등급별 기준 & 특화 기능
                </h4>

                {Object.values(DONOR_TIERS).map(t => {
                  const isCurrent = (currentUser?.tier || 'bronze') === t.tier;

                  return (
                    <div
                      key={t.tier}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-50/70 ring-2 ring-amber-300 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{t.badge}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-gray-900 text-sm">{t.name}</h5>
                              {isCurrent && (
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-semibold text-emerald-600">
                              기준: ${t.minAmount} USD 이상 헌금
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-2">{t.description}</p>

                      <div className="mt-3 pt-2.5 border-t border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          특화 기능 & 특권
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {t.perks.map((p, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium"
                            >
                              ✓ {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setTab('donate')}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-98"
                >
                  지금 헌금하고 등급 업그레이드하기 💝
                </button>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              {donations.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4 opacity-50">📝</div>
                  <p>You haven't made any donations yet.</p>
                </div>
              ) : (
                <>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 mb-6 flex justify-between items-center">
                    <span className="font-medium text-emerald-800">Total Donated</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${donations.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {donations.map(don => (
                      <div key={don.id} className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-bold text-gray-900">{don.recipientOrg}</div>
                            <div className="text-xs text-gray-500">{new Date(don.timestamp).toLocaleDateString()}</div>
                          </div>
                          <div className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                            ${don.amount.toFixed(2)} {don.currency}
                          </div>
                        </div>
                        {don.message && (
                          <div className="text-sm text-gray-600 mt-2 italic border-l-2 border-gray-200 pl-2">
                            "{don.message}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
