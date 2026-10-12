import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileSpreadsheet, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BulkExcelUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
}

const BulkExcelUpload: React.FC<BulkExcelUploadProps> = ({
  onUpload,
  accept = '.xlsx,.xls,.csv',
}) => {
  const { t } = useTranslation();
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('loading');
    try {
      await onUpload(file);
      setStatus('success');
      setMessage(t('bulkUpload.success'));
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : t('bulkUpload.error'));
    }
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setMessage('');
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      {status === 'success' ? (
        <div className="space-y-4">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <p className="text-sm font-bold text-green-600 dark:text-green-400">{message}</p>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-bold text-sda-blue hover:underline"
          >
            {t('bulkUpload.uploadAnother')}
          </button>
        </div>
      ) : (
        <>
          <FileSpreadsheet className="mx-auto h-12 w-12 text-slate-400" />
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              'mt-4 rounded-lg border-2 border-dashed p-6 transition-colors',
              dragOver
                ? 'border-sda-blue bg-sda-blue/5'
                : 'border-slate-200 dark:border-slate-700'
            )}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileSpreadsheet size={24} className="text-sda-gold" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full p-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t('bulkUpload.dragDrop')}
                </p>
                <p className="mt-2 text-xs text-slate-400">{t('bulkUpload.or')}</p>
                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-sda-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-sda-blue/90 transition-colors">
                  <Upload size={16} />
                  {t('bulkUpload.browse')}
                  <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>

          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle size={18} />
              <span className="text-sm font-bold">{message}</span>
            </div>
          )}

          {file && status !== 'loading' && (
            <button
              type="button"
              onClick={handleUpload}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sda-gold px-6 py-3 text-sm font-bold text-sda-blue shadow-lg shadow-sda-gold/20 hover:shadow-xl transition-all"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Upload size={18} />
                  {t('bulkUpload.upload')}
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BulkExcelUpload;
