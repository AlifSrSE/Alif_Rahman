import { useState } from 'react';
import { addMessage } from '../firebase';

const inputStyle = {
  padding: '16px 20px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: 15,
  outline: 'none',
  fontFamily: 'inherit',
};

const buttonStyle = {
  padding: '18px 32px',
  background: '#fff',
  color: '#0f172a',
  borderRadius: 14,
  fontWeight: 900,
  fontSize: 14,
  cursor: 'pointer',
  border: 'none',
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const valid =
    form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!valid) {
      setError('Please add your name, a valid email, and a message.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await addMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setError("Couldn't send right now — please email me directly.");
    }
  };

  if (status === 'sent') {
    return (
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 48, textAlign: 'center', maxWidth: 560, margin: '0 auto', width: '100%' }}>
        <div style={{ fontSize: 40 }}>✅</div>
        <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginTop: 12 }}>Message sent!</h3>
        <p style={{ color: '#94a3b8', marginTop: 8 }}>Thanks for reaching out — I'll get back to you soon.</p>
        <button type="button" onClick={() => setStatus('idle')} style={{ ...buttonStyle, marginTop: 20 }}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560, margin: '0 auto', width: '100%' }}>
      <input name="name" value={form.name} onChange={onChange} placeholder="Your name" style={inputStyle} />
      <input name="email" value={form.email} onChange={onChange} placeholder="Your email" style={inputStyle} />
      <textarea name="message" value={form.message} onChange={onChange} placeholder="Your message" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
      {status === 'error' && (
        <p style={{ color: '#fca5a5', fontSize: 13 }}>
          {error}{' '}
          <a href="mailto:alif.rahman.c@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>alif.rahman.c@gmail.com</a>
        </p>
      )}
      <button type="submit" disabled={status === 'sending'} style={{ ...buttonStyle, opacity: status === 'sending' ? 0.6 : 1 }}>
        {status === 'sending' ? 'Sending…' : 'SEND MESSAGE ↗'}
      </button>
    </form>
  );
}
