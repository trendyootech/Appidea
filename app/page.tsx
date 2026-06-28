'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Lightbulb, Send, Sparkles } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type FormData = {
  name: string;
  contact: string;
  idea_title: string;
  problem: string;
  target_users: string;
  usage_frequency: string;
  features: string;
  similar_app: string;
  will_use: string;
  extra_details: string;
};

const initialForm: FormData = {
  name: '',
  contact: '',
  idea_title: '',
  problem: '',
  target_users: '',
  usage_frequency: '',
  features: '',
  similar_app: '',
  will_use: '',
  extra_details: '',
};

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submitIdea(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.from('app_ideas').insert([form]);

    setLoading(false);

    if (error) {
      setError('Submission failed. Please check Supabase setup and try again.');
      return;
    }

    setSuccess(true);
    setForm(initialForm);
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Thank you!</h1>
          <p className="text-slate-600 mt-3">Your app idea has been submitted successfully.</p>
          <button onClick={() => setSuccess(false)} className="mt-6 w-full rounded-xl bg-slate-900 text-white py-3 font-semibold">
            Submit another idea
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <section className="max-w-2xl mx-auto">
        <div className="text-center mb-7">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
            <Lightbulb className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Suggest an App Idea</h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Share a useful app idea that can solve a real-life problem.
          </p>
        </div>

        <form onSubmit={submitIdea} className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 space-y-5">
          <Input label="Your name" value={form.name} onChange={(v) => updateField('name', v)} placeholder="Optional" />
          <Input label="Contact number or email" value={form.contact} onChange={(v) => updateField('contact', v)} placeholder="Optional" />
          <Input label="App idea title" value={form.idea_title} onChange={(v) => updateField('idea_title', v)} placeholder="Example: Smart parking finder" required />
          <TextArea label="What problem does it solve?" value={form.problem} onChange={(v) => updateField('problem', v)} placeholder="Explain the real problem clearly" required />
          <TextArea label="Who will use this app?" value={form.target_users} onChange={(v) => updateField('target_users', v)} placeholder="Example: students, hotels, drivers, shop owners" required />

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">How often will people use it?</label>
            <select required value={form.usage_frequency} onChange={(e) => updateField('usage_frequency', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Only when needed">Only when needed</option>
            </select>
          </div>

          <TextArea label="Must-have features" value={form.features} onChange={(v) => updateField('features', v)} placeholder="List important features" required />
          <Input label="Similar app, if any" value={form.similar_app} onChange={(v) => updateField('similar_app', v)} placeholder="Optional" />

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">Will you personally use this app?</label>
            <select required value={form.will_use} onChange={(e) => updateField('will_use', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe</option>
            </select>
          </div>

          <TextArea label="Extra details" value={form.extra_details} onChange={(v) => updateField('extra_details', v)} placeholder="Optional" />

          {error && <p className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-slate-900 text-white py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-60">
            <Send className="w-5 h-5" />
            {loading ? 'Submitting...' : 'Submit Idea'}
          </button>
        </form>
      </section>
    </main>
  );
}

function Input({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800 mb-2">{label}</label>
      <input required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900" />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800 mb-2">{label}</label>
      <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 resize-none" />
    </div>
  );
}
