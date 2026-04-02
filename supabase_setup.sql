-- SQL para crear la tabla de mensajes de chat en Supabase (opcional)
-- Esta tabla permite guardar el historial de conversaciones de los usuarios.

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'bot')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo vean sus propios mensajes
CREATE POLICY "Los usuarios pueden ver sus propios mensajes"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id);

-- Política para que los usuarios solo puedan insertar sus propios mensajes
CREATE POLICY "Los usuarios pueden insertar sus propios mensajes"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);
