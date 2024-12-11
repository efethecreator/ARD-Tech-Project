// frontend-victim/src/components/ApplicationForm.js
import React, { useState } from 'react';
import applicationApi from '../api/applicationApi';
import useApplicationStore from '../store/applicationStore';

const ApplicationForm = () => {
  const [form, setForm] = useState({ name: '', description: '' });
  const addApplication = useApplicationStore((state) => state.addApplication);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await applicationApi.create(form);
      addApplication(response.data);
      setForm({ name: '', description: '' });
    } catch (error) {
      console.error('Başvuru eklenirken hata oluştu:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Başlık"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Açıklama"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">Gönder</button>
    </form>
  );
};

export default ApplicationForm;
