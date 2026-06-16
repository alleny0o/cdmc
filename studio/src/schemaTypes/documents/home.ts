import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'overlayOpacity',
          title: 'Overlay Opacity',
          type: 'number',
          description: '0 = no overlay, 100 = fully black',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Leave blank to use church name from settings',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          description: 'Leave blank to use tagline from settings',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Join Us',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
        }),
      ],
    }),

    // Who We Are Section
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Who We Are',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'blockContent',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
        }),
      ],
    }),

    // Feature Section
    defineField({
      name: 'feature',
      title: 'Feature',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'Small uppercase text on the right',
          initialValue: 'Mustard Seed Faith',
        }),
        defineField({
          name: 'reference',
          title: 'Reference',
          type: 'string',
          description: 'e.g. Matthew 17:20',
          initialValue: 'Matthew 17:20',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
        }),
      ],
    }),

    // Service Times Section
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Come As You Are',
        }),
        defineField({
          name: 'ctaText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Join Us',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'hero.headline',
    },
    prepare() {
      return {title: 'Home Page'}
    },
  },
})