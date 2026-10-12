import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { subscriptionService } from '@/services/subscriptionService';

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ open, onClose }) => {
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

  const handleClose = () => {
    setStatus('idle');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-sda-gold" />
              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                {t('subscription.modalTitle')}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t('subscription.modalDescription')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('subscription.placeholder')}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sda-gold focus:outline-none focus:ring-2 focus:ring-sda-gold/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sda-gold px-6 py-3 text-sm font-bold text-sda-blue shadow-lg shadow-sda-gold/20 hover:shadow-xl transition-all disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  t('subscription.subscribe')
                )}
              </button>
            </form>

            {status === 'success' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle size={18} />
                <span className="text-sm font-bold">{message}</span>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle size={18} />
                <span className="text-sm font-bold">{message}</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;
