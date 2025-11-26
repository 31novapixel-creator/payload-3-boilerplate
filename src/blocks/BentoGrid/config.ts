import { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const BentoGrid: Block = {
  slug: 'bentoGrid',
  labels: {
    singular: 'Bento Grid (Services)',
    plural: 'Bento Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
      required: true,
      defaultValue: 'Nos Expertises',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction courte',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cartes (Tuiles)',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icône',
              required: true,
              defaultValue: 'Zap',
              options: [
                { label: '⚡ Éclair (Zap)', value: 'Zap' },
                { label: '💻 Laptop (Laptop)', value: 'Laptop' },
                { label: '📱 Mobile (Smartphone)', value: 'Smartphone' },
                { label: '🚀 Fusée (Rocket)', value: 'Rocket' },
                { label: '🎨 Palette (Palette)', value: 'Palette' },
                { label: '🛡️ Sécurité (Shield)', value: 'Shield' },
                { label: '🌐 Globe (Globe)', value: 'Globe' },
                { label: '⚙️ Settings (Settings)', value: 'Settings' },
                { label: '🔍 Recherche (Search)', value: 'Search' },
                { label: '📊 Graphique (BarChart)', value: 'BarChart' },
                { label: '☁️ Cloud (Cloud)', value: 'Cloud' },
                { label: '🤖 Bot (Bot)', value: 'Bot' },
              ],
            },
            {
              name: 'span',
              type: 'select',
              label: 'Largeur de la tuile',
              defaultValue: '1',
              options: [
                { label: 'Normale (1 colonne)', value: '1' },
                { label: 'Large (2 colonnes)', value: '2' },
                { label: 'Pleine largeur (3 colonnes)', value: '3' },
              ],
              admin: {
                width: '50%',
                description: 'Sur une grille de 3 colonnes au total.',
              },
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titre de la carte',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        linkGroup({
          overrides: {
            maxRows: 1,
            label: 'Lien (Optionnel)',
          },
        }),
      ],
    },
  ],
}