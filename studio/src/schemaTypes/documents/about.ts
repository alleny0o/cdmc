import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    // About Us
    defineField({
      name: 'aboutUs',
      title: 'About Us',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'About Us',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'imageCaption',
          title: 'Image Caption',
          type: 'string',
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

    // Our History
    defineField({
      name: 'history',
      title: 'Our History',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our History',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'imageCaption',
          title: 'Image Caption',
          type: 'string',
        }),
        defineField({
          name: 'foundersTitle',
          title: 'Founders Title',
          type: 'string',
          initialValue: 'Founding Members',
        }),
        defineField({
          name: 'founders',
          title: 'Founders',
          type: 'array',
          of: [{type: 'string'}],
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

    // Team Section
    defineField({
      name: 'team',
      title: 'Our Team',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Team',
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
    prepare() {
      return {title: 'About'}
    },
  },
})