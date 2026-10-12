import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { subscriptionService } from '@/services/subscriptionService';

const EmailSubscription: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      await subscriptionService.subscribe(email);
      setStatus('success');
      setMessage(t('subscription.success'));
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(t('subscription.error'));
    }
  };

  return (
    <section className="bg-sda-blue py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Mail className="mx-auto h-12 w-12 text-sda-gold" />
        <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl md:text-4xl">
          {t('subscription.title')}
        </h2>
        <p className="mt-2 text-base text-white/70 sm:text-lg">
          {t('subscription.description')}
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('subscription.placeholder')}
            required
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 backdrop-blur-sm focus:border-sda-gold focus:outline-none focus:ring-2 focus:ring-sda-gold/30"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sda-gold px-6 py-3 text-sm font-bold text-sda-blue shadow-lg shadow-sda-gold/20 hover:shadow-xl hover:shadow-sda-gold/30 transition-all disabled:opacity-60"
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              t('subscription.subscribe')
            )}
          </button>
        </form>
        {status === 'success' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-green-300">
            <CheckCircle size={18} />
            <span className="text-sm font-bold">{message}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-300">
            <AlertCircle size={18} />
            <span className="text-sm font-bold">{message}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailSubscription;
