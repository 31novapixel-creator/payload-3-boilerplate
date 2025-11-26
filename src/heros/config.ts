import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (Sous-titre Code)',
      defaultValue: '< DU CONCEPT AU PIXEL />',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        description: 'La phrase style "tech" qui apparaît sous le logo.',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
        admin: {
            placeholder: 'Votre titre principal et description ici...',
            hideGutter: true, 
        }
      }),
      label: false,
    },
    // --- NOUVEAU CHAMP : Features (Option 2) ---
    {
      name: 'features',
      type: 'array',
      label: 'Fonctionnalités (Cartes avec Icônes)',
      minRows: 1,
      maxRows: 6,
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        description: 'Ajoutez ici les cartes à afficher sous la description.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icône (Lucide)',
              required: true,
              defaultValue: 'Zap',
              options: [
                { label: '⚡ Éclair (Zap)', value: 'Zap' },
                { label: '🛡️ Bouclier (Shield)', value: 'Shield' },
                { label: '🚀 Fusée (Rocket)', value: 'Rocket' },
                { label: '📱 Smartphone (Smartphone)', value: 'Smartphone' },
                { label: '💻 Laptop (Laptop)', value: 'Laptop' },
                { label: '🎨 Pinceau (Palette)', value: 'Palette' },
                { label: '🌐 Globe (Globe)', value: 'Globe' },
                { label: '🔒 Cadenas (Lock)', value: 'Lock' },
                { label: '⚙️ Paramètres (Settings)', value: 'Settings' },
                { label: '👥 Utilisateurs (Users)', value: 'Users' },
                { label: '📝 Fichier (FileText)', value: 'FileText' },
                { label: '❤️ Cœur (Heart)', value: 'Heart' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titre de la carte',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description courte',
          required: false,
        },
      ],
    },
    // --------------------------------------------
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
  ],
  label: false,
}