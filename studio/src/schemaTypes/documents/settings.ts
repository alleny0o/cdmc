import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // Church Info
    defineField({
      name: 'churchName',
      title: 'Church Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. Fall in Love, Again and Again',
    }),
    defineField({
      name: 'verseOfTheYear',
      title: 'Verse of the Year',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Verse Text',
          type: 'text',
        }),
        defineField({
          name: 'reference',
          title: 'Reference',
          type: 'string',
          description: 'e.g. Matthew 17:20',
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    // Contact
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    // Theme
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      description: 'Main accent color — buttons, highlights',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
    }),
    defineField({
      name: 'buttonRadius',
      title: 'Button Border Radius',
      type: 'number',
      description: '0 = sharp corners, 20 = fully rounded',
      validation: (Rule) => Rule.min(0).max(20),
    }),

    // SEO
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Appears in browser tab and search results',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Used for search engine meta description',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when sharing on social media (1200x630px recommended)',
    }),
  ],
  preview: {
    select: {
      title: 'churchName',
      media: 'logo',
    },
  },
})