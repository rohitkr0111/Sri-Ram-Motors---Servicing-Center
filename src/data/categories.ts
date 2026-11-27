import { Category } from '../types';

export const defaultCategories: Category[] = [
  {
    id: 'engine-mechanical',
    name: 'Engine & Mechanical',
    slug: 'engine-mechanical',
    description: 'Pistons, cylinder blocks, clutch plates, valves, crankshafts, camshafts, oil filters, and carburetors.',
    iconName: 'Cog',
    enabled: true
  },
  {
    id: 'brake-suspension',
    name: 'Brake & Suspension',
    slug: 'brake-suspension',
    description: 'Ceramic brake pads, brake shoes, hydraulic master cylinders, discs, front forks, and rear shock absorbers.',
    iconName: 'ShieldAlert',
    enabled: true
  },
  {
    id: 'electrical',
    name: 'Electrical Components',
    slug: 'electrical',
    description: 'Heavy duty batteries, headlights, LED indicators, CDI units, ignition coils, and wiring harnesses.',
    iconName: 'Zap',
    enabled: true
  },
  {
    id: 'body-exterior',
    name: 'Body & Exterior',
    slug: 'body-exterior',
    description: 'Visors, side panels, fuel tanks, mudguards, rear view mirrors, seat covers, and crash guards.',
    iconName: 'Layers',
    enabled: true
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'DOT certified helmets, waterproof phone holders, dual-tone horns, all-weather covers, and riding gloves.',
    iconName: 'PackageCheck',
    enabled: true
  },
  {
    id: 'scooty-activa',
    name: 'Scooty & Activa Parts',
    slug: 'scooty-activa',
    description: 'Reinforced CVT drive belts, variator rollers, automatic clutch assemblies, and scooter brake shoes.',
    iconName: 'Gauge',
    enabled: true
  }
];
