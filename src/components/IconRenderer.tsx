import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export default function IconRenderer({ name, className = '', size = 24 }: IconRendererProps) {
  // Safe lookup of icons
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Return standard fallback icon
    return <LucideIcons.Book className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
