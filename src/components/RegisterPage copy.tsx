import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

export function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'influencer'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'client') {
      navigate('/register/merchant');
    } else {
      // TODO: Implement influencer registration
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez notre communauté"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Je suis...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-4 text-center rounded-lg border ${
                role === 'client'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setRole('client')}
            >
              <Building className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Une marque</span>
            </button>
            <button
              type="button"
              className={`p-4 text-center rounded-lg border ${
                role === 'influencer'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setRole('influencer')}
            >
              <User className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Un influenceur</span>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {role === 'client' ? 'Nom de l\'entreprise' : 'Nom complet'}
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-primary hover-gradient-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer un compte
          </button>
        </div>

        <div className="text-center">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Déjà un compte? <span className="text-indigo-600 font-medium">Se connecter</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}