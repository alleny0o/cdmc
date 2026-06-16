import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
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
    defineField({
      name: 'crossColor',
      title: 'Cross Color',
      type: 'color',
      description: 'Color of the decorative cross background element',
    }),
    defineField({
      name: 'featuredLink',
      title: 'Featured Link',
      type: 'object',
      description: 'Optional — a book, resource, or anything worth highlighting',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'Small uppercase heading e.g. "Our Book"',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Optional — if provided, shows as the clickable link',
          options: {hotspot: true},
        }),
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          description: 'Fallback text if no image is provided',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Footer'}
    },
  },
})