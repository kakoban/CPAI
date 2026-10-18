import React, { useEffect } from 'react';
import { Language } from '../types/cpmai';

interface ContentProtectionShieldProps {
  lang: Language;
  isAdmin?: boolean;
}

/**
 * ContentProtectionShield (Disabled / Safe Pass-Through)
 * Screen blackout, blur, focus-loss interception, and tab-switch guards
 * have been completely removed to prevent white screens and disruptions.
 */
export const ContentProtectionShield: React.FC<ContentProtectionShieldProps> = () => {
  useEffect(() => {
    // Ensure document.body is completely clean of any lingering protection classes
    document.body.classList.remove('screen-protected');
    return () => {
      document.body.classList.remove('screen-protected');
    };
  }, []);

  return null;
};
