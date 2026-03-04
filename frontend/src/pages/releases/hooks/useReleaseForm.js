import { useState, useEffect, useCallback } from 'react';
import { releaseService } from '../../../services/releaseService';

const INITIAL_FORM = {
  title: '',
  version: '',
  category: 'feature',
  status: 'draft',
  content: '',
};

export function useReleaseForm({
  isOpen,
  onSuccess,
  onClose,
  initialData,
  isEdit,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          title: initialData.title || '',
          version: initialData.version || '',
          category: initialData.category || 'feature',
          status: initialData.status || 'draft',
          content: initialData.content || '',
        });
      } else {
        setForm(INITIAL_FORM);
      }
      setError(null);
    }
  }, [isOpen, initialData]);

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
        const payload = { ...form, title: autoTitle, status: 'draft' };

        if (isEdit && initialData?._id) {
          await releaseService.updateRelease(initialData._id, payload);
        } else {
          await releaseService.createRelease(payload);
        }
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
  }, [form, onSuccess, onClose, isEdit, initialData]);

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

      if (isEdit && initialData?._id) {
        await releaseService.updateRelease(initialData._id, payload);
      } else {
        await releaseService.createRelease(payload);
      }
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
