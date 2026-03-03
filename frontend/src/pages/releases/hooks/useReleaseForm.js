import { useState, useEffect, useCallback } from 'react';
import { releaseService } from '../../../services/releaseService';

const INITIAL_FORM = {
  title: '',
  version: '',
  category: 'feature',
  status: 'draft',
  content: '',
};

export function useReleaseForm({ isOpen, onSuccess, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setError(null);
    }
  }, [isOpen]);

  const handleField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCancel = useCallback(async () => {
    const hasContent =
      form.title.trim() !== '' ||
      (form.content &&
        form.content !== '<p></p>' &&
        form.content.trim() !== '');

    if (hasContent) {
      try {
        setLoading(true);
        const autoTitle = form.title.trim() || 'Untitled Release';
        await releaseService.createRelease({
          ...form,
          title: autoTitle,
          status: 'draft',
        });
        onSuccess?.();
      } catch (err) {
        console.error('Auto-draft failed', err);
      } finally {
        setLoading(false);
        onClose();
      }
    } else {
      onClose();
    }
  }, [form, onSuccess, onClose]);

  const handleSubmit = async (publishNow = false) => {
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.content || form.content === '<p></p>') {
      setError('Content cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const payload = {
        ...form,
        status: publishNow ? 'published' : form.status,
      };
      await releaseService.createRelease(payload);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to create release. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, error, handleField, handleCancel, handleSubmit };
}
