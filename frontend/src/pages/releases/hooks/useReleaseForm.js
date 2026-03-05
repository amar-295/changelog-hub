import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const [errorVar, setError] = useState(null); // Local error state for validation errors

  const queryClient = useQueryClient();

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

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  // TanStack Query Mutation for saving/creating
  const saveMutation = useMutation({
    mutationFn: async ({ payload, isDraft: _isDraft }) => {
      if (isEdit && initialData?._id) {
        return releaseService.updateRelease(initialData._id, payload);
      } else {
        return releaseService.createRelease(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      onSuccess?.();
    },
    onError: (err) => {
      setError(
        err.response?.data?.message ||
          'Failed to process release. Please try again.'
      );
    },
    onSettled: (_, __, { isDraft }) => {
      // Only close if it's the main submit or a valid draft auto-save
      if (!isDraft) onClose();
    },
  });

  const handleCancel = useCallback(() => {
    const hasContent =
      form.title.trim() !== '' ||
      (form.content &&
        form.content !== '<p></p>' &&
        form.content.trim() !== '');

    if (hasContent) {
      const autoTitle = form.title.trim() || 'Untitled Release';
      const payload = { ...form, title: autoTitle, status: 'draft' };
      // Fire and forget auto-save draft
      saveMutation.mutate({ payload, isDraft: true });
      onClose(); // close immediately for snappy UX
    } else {
      onClose();
    }
  }, [form, onClose, saveMutation]);

  const handleSubmit = (publishNow = false) => {
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.content || form.content === '<p></p>') {
      setError('Content cannot be empty.');
      return;
    }

    const payload = {
      ...form,
      status: publishNow ? 'published' : form.status,
    };

    saveMutation.mutate({ payload, isDraft: false });
  };

  return {
    form,
    loading: saveMutation.isPending,
    error: errorVar,
    handleField,
    handleCancel,
    handleSubmit,
  };
}
