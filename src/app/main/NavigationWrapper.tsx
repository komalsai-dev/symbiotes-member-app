"use client";

import Navigation from './Navigation';

interface NavigationWrapperProps {
  onClose?: () => void;
}

export default function NavigationWrapper({ onClose }: NavigationWrapperProps) {
  return <Navigation onClose={onClose} />;
}