'use client';

import { ConfirmationModal } from '@/components/ConfirmationModal';
import { MultiSelectCreatable } from '@/components/MultiSelectCreatable';
import { mockArtists, mockGenres, mockRecommenders, mockTags } from '@/data/mockData';
import { itemSchema, ItemFormData } from '@/schemas/itemSchema';
import { FIXED_LISTS, IItem, ITEM_TYPES, ItemType } from '@/types/item';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface ItemFormModalProps {
  isOpen: boolean;
  editItem?: IItem | null;
  onClose: () => void;
  onSubmit: (item: IItem) => void;
  initialData?: Partial<IItem>;
}

const defaultValues: ItemFormData = {
  title: '',
  artists: [],
  type: 'Álbum',
  coverUrl: '',
  recommendedBy: [],
  genres: [],
  tags: [],
  lists: [],
};

export function ItemFormModal({ isOpen, editItem, onClose, onSubmit, initialData }: ItemFormModalProps) {
  const isEditing = !!editItem;

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<ItemFormData | null>(null);

  // Dynamic option lists
  const [artistOptions, setArtistOptions] = useState(mockArtists);
  const [genreOptions, setGenreOptions] = useState(mockGenres);
  const [tagOptions, setTagOptions] = useState(mockTags);
  const [recommenderOptions, setRecommenderOptions] = useState(mockRecommenders);
  const [listOptions] = useState([...FIXED_LISTS]);

  // Reset form when modal opens / changes context
  useEffect(() => {
    if (!isOpen) return;
    if (editItem) {
      reset({
        title: editItem.title,
        artists: editItem.artists,
        type: editItem.type,
        coverUrl: editItem.coverUrl || '',
        recommendedBy: editItem.recommendedBy || [],
        genres: editItem.genres,
        tags: editItem.tags,
        lists: editItem.lists,
      });
    } else if (initialData) {
      reset({ ...defaultValues, ...initialData });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, editItem, initialData, reset]);

  const onValid = (data: ItemFormData) => {
    if (isEditing) {
      setPendingData(data);
      setShowSubmitConfirm(true);
    } else {
      onSubmit({
        ...data,
        id: uuidv4(),
        type: data.type as ItemType,
      });
      onClose();
    }
  };

  const handleConfirmSubmit = () => {
    if (pendingData && editItem) {
      onSubmit({
        ...pendingData,
        id: editItem.id,
        type: pendingData.type as ItemType,
      });
    }
    setShowSubmitConfirm(false);
    setPendingData(null);
    onClose();
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={handleCancelClick}
      >
        <div
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-in bg-white border border-border shadow-[0_1.5625rem_5rem] shadow-black/15"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 sticky top-0 z-10 bg-white border-b border-border">
            <h2 className="text-lg font-bold text-text-primary">
              {isEditing ? 'Editar Item' : 'Adicionar Item'}
            </h2>
            <button
              id="form-modal-close-btn"
              type="button"
              onClick={handleCancelClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 text-lg text-text-muted bg-transparent hover:bg-bg-surface"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onValid)}>
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-text-primary">
                  Título <span className="text-danger">*</span>
                </label>
                <input
                  id="form-title"
                  type="text"
                  className={`w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all bg-white border ${errors.title ? 'border-danger' : 'border-border focus:border-accent-light'} text-text-primary`}
                  placeholder="Nome do álbum, single, etc."
                  {...register('title')}
                />
                {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
              </div>

              {/* Artists */}
              <div>
                <Controller
                  name="artists"
                  control={control}
                  render={({ field }) => (
                    <MultiSelectCreatable
                      id="form-artists"
                      label="Artistas *"
                      options={artistOptions}
                      value={field.value}
                      onChange={field.onChange}
                      onOptionsChange={setArtistOptions}
                      placeholder="Selecionar artistas..."
                    />
                  )}
                />
                {errors.artists && <p className="text-xs text-danger mt-1">{errors.artists.message}</p>}
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs text-text-primary font-semibold mb-1.5">
                  Tipo
                </label>
                <select
                  id="form-type"
                  className="w-full rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none transition-all cursor-pointer bg-white border border-border focus:border-accent-light appearance-none"
                  {...register('type')}
                >
                  {ITEM_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Cover URL */}
              <div>
                <label className="block text-xs text-text-primary font-semibold mb-1.5">
                  Capa / Arte (URL, opcional)
                </label>
                <input
                  id="form-cover"
                  type="url"
                  className={`w-full rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none transition-all bg-white border ${errors.coverUrl ? 'border-danger' : 'border-border focus:border-accent-light'}`}
                  placeholder="https://..."
                  {...register('coverUrl')}
                />
                {errors.coverUrl && <p className="text-xs text-danger mt-1">{errors.coverUrl.message}</p>}
              </div>

              {/* Genres */}
              <div>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                    <MultiSelectCreatable
                      id="form-genres"
                      label="Gêneros *"
                      options={genreOptions}
                      value={field.value}
                      onChange={field.onChange}
                      onOptionsChange={setGenreOptions}
                      placeholder="Selecionar gêneros..."
                    />
                  )}
                />
                {errors.genres && <p className="text-xs text-danger mt-1">{errors.genres.message}</p>}
              </div>

              {/* Tags */}
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <MultiSelectCreatable
                    id="form-tags"
                    label="Tags"
                    options={tagOptions}
                    value={field.value}
                    onChange={field.onChange}
                    onOptionsChange={setTagOptions}
                    placeholder="Selecionar tags..."
                  />
                )}
              />

              {/* Recommended by */}
              <Controller
                name="recommendedBy"
                control={control}
                render={({ field }) => (
                  <MultiSelectCreatable
                    id="form-recommended-by"
                    label="Recomendado por (opcional)"
                    options={recommenderOptions}
                    value={field.value || []}
                    onChange={field.onChange}
                    onOptionsChange={setRecommenderOptions}
                    placeholder="Quem recomendou?"
                  />
                )}
              />

              {/* Lists */}
              <Controller
                name="lists"
                control={control}
                render={({ field }) => (
                  <MultiSelectCreatable
                    id="form-lists"
                    label="Listas"
                    options={listOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Adicionar às listas..."
                  />
                )}
              />
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 sticky bottom-0 bg-white border-t border-border">
              <button
                id="form-modal-cancel-btn"
                type="button"
                className="flex-1 py-2.5 rounded-xl text-sm text-text-secondary font-semibold transition-all duration-200 hover:opacity-80 bg-transparent border border-border"
                onClick={handleCancelClick}
              >
                Cancelar
              </button>
              <button
                id="form-modal-submit-btn"
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 bg-accent shadow-[0_.25rem_.9375rem] shadow-accent/30"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirm cancel */}
      <ConfirmationModal
        isOpen={showCancelConfirm}
        title="Deseja cancelar?"
        message="As alterações não salvas serão descartadas."
        confirmLabel="Sim, cancelar"
        cancelLabel="Voltar"
        danger={false}
        onConfirm={() => { setShowCancelConfirm(false); onClose(); }}
        onCancel={() => setShowCancelConfirm(false)}
      />

      {/* Confirm edit submit */}
      <ConfirmationModal
        isOpen={showSubmitConfirm}
        title="Confirmar edição?"
        message="A alteração não poderá ser desfeita."
        confirmLabel="Confirmar"
        cancelLabel="Voltar"
        danger={true}
        onConfirm={handleConfirmSubmit}
        onCancel={() => { setShowSubmitConfirm(false); setPendingData(null); }}
      />
    </>
  );
}
